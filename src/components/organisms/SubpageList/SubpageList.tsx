import React, { ReactElement } from 'react';
import condCls from '../../../utils/conditionalClasses';
import styles from './SubpageList.module.scss';
import { PageBox } from '../PageBox/PageBox';
import { Pagination } from '../Pagination/Pagination';

export interface SubpageListProps {
    showImages: boolean;
    page: number;
    count: number;
    setPage: (page: number) => void;
    items: {
        __typename: 'PageRecord';
        id: string;
        title: string;
        url: string;
    }[];
    pages: boolean;
}

const SubpageList = ({ page, count, items, setPage, pages }: SubpageListProps): ReactElement => (
    <div className={styles.list}>
        {count > 0 && (
            <>
                {items.map((item, i) => (
                    <PageBox key={`SubpageListBox-${i}`} page={item} className={styles.box} />
                ))}
                {pages && (
                    <Pagination
                        className={condCls(styles.right, styles.pagination)}
                        page={page}
                        total={Math.ceil(count / 10)}
                        callback={(n) => {
                            setPage(n);
                            window.scrollTo({
                                top: 250,
                                behavior: 'smooth',
                            });
                        }}
                    />
                )}
            </>
        )}
    </div>
);

SubpageList.whyDidYouRender = true;

export { SubpageList };
