import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { Logger } from '../../services';
import { BlockType } from '../../types/block';
import { Providers } from '../../types/provider';
import symbio from '../../../symbio.config.json';
import { getBlocksProps } from './getBlocksProps';

/**
 * Returns normalized (array-ized) slug.
 * If slug is empty, it means it's homepage.
 * If first item of slug array equalscurrent locale, remove it.
 * @param {GetStaticPropsContext} context
 * @returns {string[]}
 */
function getNormalizedSlug(context: GetStaticPropsContext): string[] {
    const slug = context.params?.slug;
    if (Array.isArray(slug)) {
        return slug;
    }
    if (slug) {
        return [slug];
    }
    return ['homepage'];
}

/**
 * Get static props for current page and it's blocks
 * @param {GetStaticPropsContext} context
 * @param {Providers} providers
 * @param {Record<string, BlockType>} blocks
 * @returns {Promise<GetStaticPropsResult<{[p: string]: unknown}>>}
 */
export const getPageStaticProps = async (
    context: GetStaticPropsContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
    const { ssg } = symbio;
    const provider = providers.page;
    const locale = context.locale || context.defaultLocale;
    const props = await provider.getPageBySlug(locale, getNormalizedSlug(context));

    if (!props) {
        return {
            props: {
                locale,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            notFound: true,
        };
    }

    const notFound = !props.page || undefined;
    const slug = context.params?.slug;

    if (props.redirect && props.redirect.to && typeof props.redirect.permanent === 'boolean') {
        Logger.info('Matched redirect ' + props.redirect.from + ' -> ' + props.redirect.to);
        return {
            props: {
                ...props,
                locale,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            redirect: {
                destination: props.redirect.to,
                permanent: props.redirect.permanent,
            },
        };
    }

    try {
        const blocksProps = await Promise.all(
            getBlocksProps(providers, blocks, context, props.page?.content, props.page, locale),
        );
        notFound && Logger.warn('Forwarding to 404');
        return {
            props: {
                ...props,
                locale,
                blocksProps,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            ...((slug && slug.length === 1 && slug[0] === '404') || !!props.page ? {} : { notFound }),
        };
    } catch (e) {
        if (e.code === 'ENOENT') {
            Logger.warn('Forwarding to 404');
            return {
                props: {
                    ...props,
                    locale,
                    blocksProps: [],
                    preview: !!context.preview,
                },
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                ...(slug && slug.length === 1 && slug[0] === '404' ? {} : { notFound: true }),
            };
        } else {
            throw e;
        }
    }
};
