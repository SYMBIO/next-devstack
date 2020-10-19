import React, { ReactElement, TextareaHTMLAttributes } from 'react';
import { FieldProps } from 'formik';
import condCls from '../../../utils/conditionalClasses';
import styles from './Textarea.module.scss';
import { Icon, Icons } from '../Icon/Icon';

interface Props extends FieldProps {
    readonly label?: string;
    readonly icon?: Icons;
    readonly id?: string;
    readonly name?: string;
}

const Textarea = ({
    field,
    form: { errors, touched },
    label,
    icon,
    id,
    ...props
}: Props): ReactElement<TextareaHTMLAttributes<HTMLTextAreaElement>, 'textarea'> => {
    const isIcon = !!(icon && icon.length > 0);
    const isError = !!(errors[field.name] && touched[field.name]);
    const ref = React.useRef<HTMLTextAreaElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        if (e.target) {
            e.target.style.height = e.target.scrollHeight + 1 + 'px';
        }
        field.onChange(e);
    }

    return (
        <div className={styles.container}>
            {label && (
                <label
                    className={condCls(
                        styles.label,
                        field.value && field.value.length === 0 && styles.emptyLabel,
                        isIcon && styles.iconLabel,
                        isError && styles.errorLabel,
                    )}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            {icon && <Icon name={icon} />}
            <textarea
                className={condCls(styles.textarea, isIcon && styles.iconTextarea, isError && styles.errorTextarea)}
                ref={ref}
                {...field}
                {...props}
                id={id}
                onChange={handleChange}
            />
            {isError && <p className={styles.error}>{errors[field.name]}</p>}
        </div>
    );
};

Textarea.whyDidYouRender = true;

export { Textarea };
