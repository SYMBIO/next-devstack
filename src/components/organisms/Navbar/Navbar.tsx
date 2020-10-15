import React, { ReactElement, useContext, useState } from 'react';
import { AppContext } from '../../../utils/app-context/AppContext';
import styles from './Navbar.module.scss';
import { i18n } from '../../../../symbio.config.json';
import { Link } from '../../primitives/Link/Link';
import { Image } from '../../primitives/Image/Image';
import { MainMenu } from '../MainMenu/MainMenu';

const Navbar = (): ReactElement<null, 'div'> | null => {
    const { locales } = i18n;
    const { locale, mainMenu, logo, homepage } = useContext(AppContext);

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            {logo && (
                <div className={styles.logo}>
                    <Link plain page={homepage || undefined}>
                        <Image image={logo} />
                    </Link>
                </div>
            )}
            {mainMenu && <MainMenu menu={mainMenu} />}
            {locales.length > 1 ? (
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
