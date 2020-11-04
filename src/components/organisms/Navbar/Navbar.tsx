import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useState } from 'react';
import { AppContext } from '../../../contexts/app-context/AppContext';
import { webSettingQueryResponse } from '../../../relay/__generated__/webSettingQuery.graphql';
import { Image } from '../../primitives/Image/Image';
import styles from './Navbar.module.scss';
import { Link } from '../../primitives/Link/Link';
import { MainMenu } from '../MainMenu/MainMenu';

const Logo = ({
    logo,
    svg,
    homepage,
    className,
}: {
    logo: NonNullable<webSettingQueryResponse['item']>['logo'] | undefined;
    svg?: string;
    homepage?: {
        readonly title: string | null;
        readonly url: string | null;
    } | null;
    className?: string;
}): ReactElement | null => {
    if (!logo) {
        return null;
    }

    let result = null;
    if (svg) {
        result = <span dangerouslySetInnerHTML={{ __html: svg }}></span>;
    } else if (logo.width && logo.height) {
        result = <Image image={logo} />;
    }

    if (homepage) {
        return (
            <Link page={homepage} className={className}>
                {result}
            </Link>
        );
    }

    return <span className={className}>{result}</span>;
};

const Navbar = (): ReactElement<null, 'div'> | null => {
    const { mainMenu, logo, homepage, svgLogo } = useContext(AppContext);
    const { locale, locales } = useRouter();

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            <Logo logo={logo} svg={svgLogo} homepage={homepage} className={styles.logo} />
            {mainMenu && <MainMenu menu={mainMenu} />}
            {Array.isArray(locales) && locales.length > 1 ? (
                <div className={styles.languageSelector}>
                    {locale}
                    <span
                        className={styles.opener}
                        onClick={(): void => setLanguageSelectorOpen(!languageSelectorOpen)}
                    />
                    {languageSelectorOpen && (
                        <ul className={styles.list}>
                            {locales.map(
                                (loc: string, i: number) =>
                                    loc !== locale && (
                                        <li key={`LanguageSelector_${i}`}>
                                            <Link href={`/${loc}`}>{loc}</Link>
                                        </li>
                                    ),
                            )}
                        </ul>
                    )}
                </div>
            ) : (
                <span />
            )}
        </div>
    );
};

Navbar.whyDidYouRender = true;

export { Navbar };
