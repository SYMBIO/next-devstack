import React, { ReactElement, useState } from 'react';
import { FieldProps } from 'formik';
import { Icon, Icons } from '../Icon/Icon';
import condCls from '../../../utils/conditionalClasses';
import styles from './Input.module.scss';
export type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export interface InputProps extends FieldProps {
    readonly label?: string | React.ReactNode;
    readonly icon?: Icons;
    readonly type: InputType;
    readonly id?: string;
    readonly name?: string;
    readonly checked?: boolean;
}

const Input = ({
    field,
    label,
    icon,
    type,
    id,
    checked,
    form: { errors, touched },
    ...props
}: InputProps): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const hasIcon = !!(icon && icon.length > 0);
    const hasError = !!(errors && errors.field && errors[field.name] && touched[field.name]);
    const isPassword = type === 'password';

    return (
        <div
            className={condCls(
                styles.container,
                type === 'radio' && styles.isRadio,
                type === 'checkbox' && styles.isCheckbox,
                hasIcon && styles.hasIcon,
                hasError && styles.hasError,
                !checked || styles.isActive,
                field && field.value && field.value.length === 0 && styles.isEmpty,
            )}
        >
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {type === 'checkbox' && <Icon name="tick" className={styles.checkboxIcon} />}
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
                    <Icon name={showPassword ? 'tick' : 'tick'} className={styles.iconCommon} />
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
            {hasError && <p className={styles.error}>{errors.field && errors[field.name]}</p>}
        </div>
    );
};

Input.whyDidYouRender = true;

export { Input };
