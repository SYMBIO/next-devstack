import React from 'react';
import styles from './Icon.module.scss';
import condCls from '../../../utils/conditionalClasses';

import Symbio from '../../../../public/svg/symbio.svg';
import Tick from '../../../../public/svg/tick.svg';

export type Icons = 'tick' | 'symbio';

interface IconI {
    name: Icons | null;
    className?: string;
}

const Icon = ({ name, className }: IconI): JSX.Element => {
    const renderIcon = (name: Icons): JSX.Element => {
        switch (name) {
            case 'tick':
                return <Tick />;
            case 'symbio':
                return <Symbio />;
            default:
                return <></>;
        }
    };
    return <div className={condCls(className, styles.wrapper)}>{name && renderIcon(name)}</div>;
};

Icon.whyDidYouRender = true;

export { Icon };
