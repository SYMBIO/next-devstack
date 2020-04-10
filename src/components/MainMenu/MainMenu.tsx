import React, { ReactElement } from 'react';
import { MainMenu as MainMenuType } from '../../types/app';
import { Link } from '../Link/Link';
import styles from './MainMenu.module.scss';

interface MainMenuProps {
    menu: MainMenuType;
}

function renderMenu(menu: MainMenuType, level = 1): ReactElement {
    return (
        <ul className={styles['menu' + level]}>
            {menu?.links.map((link, i: number) => (
                <li key={`Mainmenu_${i}`}>
                    {link.__typename === 'PageRecord' && <Link page={link} />}
                    {link.__typename === 'MenuRecord' && renderMenu(link, level + 1)}
                </li>
            ))}
        </ul>
    );
}

export const MainMenu = ({ menu }: MainMenuProps): ReactElement => renderMenu(menu, 1);
