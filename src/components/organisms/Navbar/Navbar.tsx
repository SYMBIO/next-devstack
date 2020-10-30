import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useState } from 'react';
import { AppContext } from '../../../contexts/app-context/AppContext';
import styles from './Navbar.module.scss';
import { Link } from '../../primitives/Link/Link';
import { Image } from '../../primitives/Image/Image';
import { MainMenu } from '../MainMenu/MainMenu';

const Navbar = (): ReactElement<null, 'div'> | null => {
    const { mainMenu, logo, homepage } = useContext(AppContext);
    const { locale, locales } = useRouter();

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            {logo && logo.responsiveImage && (
                <div className={styles.logo}>
                    <Link plain page={homepage || undefined}>
                        <Image data={logo.responsiveImage} />
                    </Link>
                </div>
            )}
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
