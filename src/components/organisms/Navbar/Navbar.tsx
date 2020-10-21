import React, { ReactElement, useContext, useState } from 'react';
import BsNavbar from 'react-bootstrap/Navbar';
import { AppContext } from '../../../utils/app-context/AppContext';
import { Image } from '../../primitives/Image/Image';
import styles from './Navbar.module.scss';
import { i18n } from '../../../../symbio.config.json';
import { Link } from '../../primitives/Link/Link';
import { MainMenu } from '../MainMenu/MainMenu';

const Navbar = (): ReactElement<null, 'div'> | null => {
    const { locales } = i18n;
    const { locale, mainMenu, logo, homepage } = useContext(AppContext);

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    return (
        <BsNavbar>
            {logo && logo.responsiveImage && (
                <div className={styles.logo}>
                    <Link plain page={homepage || undefined}>
                        <Image data={logo.responsiveImage} />
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
        </BsNavbar>
    );
};

Navbar.whyDidYouRender = true;

export { Navbar };
