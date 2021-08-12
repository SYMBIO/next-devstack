import React, { ReactElement } from 'react';
import Logo from '../../../../public/svg/symbio.svg';
import symbio from '../../../../symbio.config.json';
import models from '../../../models.json';
import { Link } from '../Link/Link';
import styles from './PreviewToolbar.module.scss';

export interface PreviewToolbarProps {
    page: { id: string; title: string | null; _status: 'draft' | 'published' | 'updated' | '%future added value' };
    item?: {
        id: string;
        title: string;
        cmsTypeId: string;
        _status: 'draft' | 'published' | 'updated' | '%future added value';
    };
}

const Status = ({
    status,
}: {
    status: 'draft' | 'published' | 'updated' | '%future added value';
}): ReactElement | null =>
    status && status !== '%future added value' ? <span className={`${styles.status} ${styles[status]}`} /> : null;

export const PreviewToolbar = ({ page, item }: PreviewToolbarProps): ReactElement => {
    const { datocms } = symbio;
    return (
        <div className={styles.wrapper}>
            <span className={styles.logo}>
                <Link href={'https://' + datocms.domain + '/editor'} className={styles.logo}>
                    <Logo />
                </Link>
                PREVIEW
                <br />
                MODE
            </span>
            <div className={styles.group}>
                <Status status={page._status} />
                {page.title}
                <Link
                    href={`https://${datocms.domain}/editor/item_types/${models.page}/items/${page.id}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.edit}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
                        <path d="M77.926,94.924H8.217C6.441,94.924,5,93.484,5,91.706V21.997c0-1.777,1.441-3.217,3.217-3.217h34.854 c1.777,0,3.217,1.441,3.217,3.217s-1.441,3.217-3.217,3.217H11.435v63.275h63.274V56.851c0-1.777,1.441-3.217,3.217-3.217 c1.777,0,3.217,1.441,3.217,3.217v34.855C81.144,93.484,79.703,94.924,77.926,94.924z" />
                        <path d="M94.059,16.034L84.032,6.017c-1.255-1.255-3.292-1.255-4.547,0l-9.062,9.073L35.396,50.116 c-0.29,0.29-0.525,0.633-0.686,1.008l-7.496,17.513c-0.526,1.212-0.247,2.617,0.676,3.539c0.622,0.622,1.437,0.944,2.274,0.944 c0.429,0,0.858-0.086,1.276-0.257l17.513-7.496c0.375-0.161,0.719-0.397,1.008-0.686l35.026-35.026l9.073-9.062 C95.314,19.326,95.314,17.289,94.059,16.034z M36.286,63.79l2.928-6.821l3.893,3.893L36.286,63.79z M46.925,58.621l-5.469-5.469 L73.007,21.6l5.47,5.469L46.925,58.621z M81.511,24.034l-5.469-5.469l5.716-5.716l5.469,5.459L81.511,24.034z" />
                    </svg>{' '}
                    edit
                </Link>
            </div>
            {item && (
                <div className={styles.group}>
                    <Status status={item._status} />
                    {item.title}
                    <Link
                        href={`https://${datocms.domain}/editor/item_types/${item.cmsTypeId}/items/${item.id}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.edit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
                            <path d="M77.926,94.924H8.217C6.441,94.924,5,93.484,5,91.706V21.997c0-1.777,1.441-3.217,3.217-3.217h34.854 c1.777,0,3.217,1.441,3.217,3.217s-1.441,3.217-3.217,3.217H11.435v63.275h63.274V56.851c0-1.777,1.441-3.217,3.217-3.217 c1.777,0,3.217,1.441,3.217,3.217v34.855C81.144,93.484,79.703,94.924,77.926,94.924z" />
                            <path d="M94.059,16.034L84.032,6.017c-1.255-1.255-3.292-1.255-4.547,0l-9.062,9.073L35.396,50.116 c-0.29,0.29-0.525,0.633-0.686,1.008l-7.496,17.513c-0.526,1.212-0.247,2.617,0.676,3.539c0.622,0.622,1.437,0.944,2.274,0.944 c0.429,0,0.858-0.086,1.276-0.257l17.513-7.496c0.375-0.161,0.719-0.397,1.008-0.686l35.026-35.026l9.073-9.062 C95.314,19.326,95.314,17.289,94.059,16.034z M36.286,63.79l2.928-6.821l3.893,3.893L36.286,63.79z M46.925,58.621l-5.469-5.469 L73.007,21.6l5.47,5.469L46.925,58.621z M81.511,24.034l-5.469-5.469l5.716-5.716l5.469,5.459L81.511,24.034z" />
                        </svg>{' '}
                        edit
                    </Link>
                </div>
            )}
            <div className={styles.group}>
                <Link href={`/api/exit-preview`} className={styles.exit}>
                    <svg viewBox="0 0 1000 1000">
                        <g>
                            <path d="M637.9,745c-33.9,0-61.3,27.4-61.3,61.3v30.6c0,16.8-13.7,30.6-30.6,30.6H178.5c-16.8,0-30.6-13.7-30.6-30.6V163.1c0-16.8,13.7-30.6,30.6-30.6H546c16.9,0,30.6,13.7,30.6,30.6v34.5c0,33.9,27.4,61.3,61.3,61.3c33.9,0,61.3-27.4,61.3-61.3v-34.5C699.1,78.7,630.5,10,546,10H178.5C94.1,10,25.4,78.7,25.4,163.1v673.8c0,84.4,68.7,153.1,153.1,153.1H546c84.4,0,153.1-68.7,153.1-153.1v-30.6C699.1,772.4,671.8,745,637.9,745z" />
                            <path d="M974.4,503.8c0.3-5.3,0.3-10.5-0.8-15.8c0-0.2-0.1-0.3-0.1-0.4c-1-5-2.9-9.8-5.2-14.5c-0.6-1.1-1.2-2.2-1.8-3.4c-2.7-4.7-5.7-9.2-9.7-13L802.5,302.3c-23.9-23.9-62.7-23.9-86.7,0c-23.9,23.9-23.9,62.7,0,86.7l49.9,49.9H423.5c-33.9-0.1-61.3,27.3-61.3,61.2c0,33.9,27.4,61.3,61.3,61.3h342.1l-48.6,48.6c-23.9,23.9-23.9,62.7,0,86.7c11.9,11.9,27.6,18,43.3,18c15.6,0,31.4-6,43.3-18l153.1-153.1c1-1,1.6-2,2.4-2.9c0.9-1,1.8-2.1,2.7-3.2c3.3-4.2,6-8.6,8-13.4c0.1-0.1,0.2-0.2,0.2-0.3v-0.1c2.1-5.1,3.3-10.4,3.9-15.7C974.2,506.4,974.3,505.1,974.4,503.8z" />
                        </g>
                    </svg>
                    EXIT
                    <br />
                    PREVIEW
                </Link>
            </div>
        </div>
    );
};
