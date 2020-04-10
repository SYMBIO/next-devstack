import React, { ReactElement, useContext, useState } from 'react';
import { SiteLocale } from '../../types/graphql';
import { AppContext } from '../../utils/app-context/AppContext';
import { Link } from '../Link/Link';
import { MainMenu } from '../MainMenu/MainMenu';
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
            {mainMenu && <MainMenu menu={mainMenu} />}
            {locales.length > 1 && (
                <div className={styles.languageSelector}>
                    {locale}
                    <span
                        className={styles.opener}
                        onClick={(): void => setLanguageSelectorOpen(!languageSelectorOpen)}
                    />
                    {languageSelectorOpen && (
                        <ul className={styles.list}>
                            {locales.map((locale, i) => (
                                <li key={`LanguageSelector_${i}`}>
                                    <Link href={`/${locale}`}>{locale}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};
