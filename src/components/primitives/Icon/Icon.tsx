import React from 'react';
import styles from './Icon.module.scss';

interface Props {
    name?: string | null;
    className?: string;
}

const Icon = ({ name, className }: Props): JSX.Element => {
    const renderIcon = (name: string | null | undefined): JSX.Element => {
        switch (name) {
            default:
                return <span />;
        }
    };

    const classes = [styles.wrapper];
    className && classes.push(className);

    return <div className={classes.join(' ')}>{renderIcon(name)}</div>;
};

Icon.whyDidYouRender = true;

export { Icon };
