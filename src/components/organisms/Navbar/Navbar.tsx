import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useState } from 'react';
import { AppContext } from '../../../contexts/app-context/AppContext';
import { Image } from '../../primitives/Image/Image';
import styles from './Navbar.module.scss';
import { Link } from '../../primitives/Link/Link';
import { MainMenu } from '../MainMenu/MainMenu';

const Navbar = (): ReactElement<null, 'div'> | null => {
    const { mainMenu, logo, homepage, page } = useContext(AppContext);
    const { locale, locales } = useRouter();

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            {logo && logo.width && logo.height && (
                <Link page={homepage || undefined} className={styles.logo}>
                    <Image image={logo} sizes={'3rem'} />
                </Link>
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
                                            <Link
                                                page={page || homepage || { url: '' }}
                                                locale={loc}
                                                onClick={() => setLanguageSelectorOpen(false)}
                                            >
                                                {loc}
                                            </Link>
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
