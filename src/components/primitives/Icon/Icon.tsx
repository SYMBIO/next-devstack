import React, { useEffect } from 'react';
import styles from './Icon.module.scss';
import condCls from '../../../utils/conditionalClasses';

import Symbio from '../../../../public/svg/symbio.svg';
import Tick from '../../../../public/svg/tick.svg';

export type Icons = 'tick' | 'symbio';

interface Props {
    name: Icons | null;
    className?: string;
}

const Icon = ({ name, className }: Props): JSX.Element => {
    useEffect(() => {
        console.log(styles);
    }, []);
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

export { Icon };
