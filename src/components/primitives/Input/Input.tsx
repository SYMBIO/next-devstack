import React, { ReactElement, useState } from 'react';
import { FieldProps } from 'formik';
import { Icon } from '..';
import condCls from '../../../utils/conditionalClasses';
import styles from './Input.module.scss';

interface Props extends FieldProps {
    readonly label?: string | React.ReactNode;
    readonly icon?: string;
    readonly type: string;
    readonly id?: string;
    readonly name?: string;
    readonly checked?: boolean;
    readonly width?: 'narrow' | 'normal' | 'wide';
}

const Input = ({
    field,
    form: { errors, touched },
    label,
    icon,
    type,
    id,
    checked,
    width,
    ...props
}: Props): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const hasIcon = !!(icon && icon.length > 0);
    const hasError = !!(errors[field.name] && touched[field.name]);
    const isPassword = type === 'password';

    return (
        <div
            className={condCls(
                styles.container,
                type === 'radio' && styles.isRadio,
                type === 'checkbox' && styles.isCheckbox,
                hasIcon && styles.hasIcon,
                hasError && styles.hasError,
                (width === 'narrow' && styles.narrow) || (width === 'wide' && styles.wide),
                !checked || styles.isActive,
                field.value && field.value.length === 0 && styles.isEmpty,
            )}
        >
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {type === 'checkbox' && <Icon name="check" className={styles.checkboxIcon} />}
                    {label}
                </label>
            )}
            {icon && <Icon name={icon} />}
            {isPassword && (
                <button
                    className={styles.showPasswordIcon}
                    onClick={(): void => setShowPassword(!showPassword)}
                    type="button"
                >
                    <Icon name={showPassword ? 'hide' : 'view'} className={styles.iconCommon} />
                </button>
            )}
            <input
                className={styles.input}
                {...field}
                {...props}
                type={isPassword ? (showPassword ? 'text' : type) : type}
                checked={checked}
                id={id}
            />
            {hasError && <p className={styles.error}>{errors[field.name]}</p>}
        </div>
    );
};

Input.whyDidYouRender = true;

export { Input };
