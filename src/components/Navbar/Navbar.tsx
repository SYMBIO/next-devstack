import React, { ReactElement, useContext, useState } from 'react';
import { PageRecord, SiteLocale } from '../../types/graphql';
import { AppContext } from '../../utils/app-context/AppContext';
import { Link } from '../Link/Link';
import styles from './Navbar.module.scss';

export const Navbar = (): ReactElement<null, 'div'> | null => {
    const locales = [];
    for (const locale in SiteLocale) {
        if (Object.prototype.hasOwnProperty.call(SiteLocale, locale)) {
            locales.push(locale);
        }
    }

    const { locale, mainMenu } = useContext(AppContext);

    const [languageSelectorOpen, setLanguageSelectorOpen] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <svg>Logo</svg>
            </div>
            {/*<ul className={styles.menu}>
                {mainMenu?.links.map((link: PageRecord, i: number) => (
                    <li key={`Mainmenu_${i}`}>
                        <Link page={link} />
                    </li>
                ))}
            </ul>*/}
            <div className={styles.languageSelector}>
                {locale}
                <span className={styles.opener} onClick={(): void => setLanguageSelectorOpen(!languageSelectorOpen)} />
                {languageSelectorOpen && (
                    <ul className={styles.list}>
                        {locales.map((locale, i) => (
                            <li key={`LanguageSelector_${i}`}>{locale}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
