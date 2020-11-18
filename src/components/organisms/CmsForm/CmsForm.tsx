import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import { MixedSchema, Ref, Schema } from 'yup';
import * as yup from 'yup';
import { CmsFormBlock_content } from '../../../blocks/CmsFormBlock/__generated__/CmsFormBlock_content.graphql';
import styles from './CmsForm.module.scss';
import trans from '../../../strings';
import { Input } from '../../primitives/Input/Input';
import { Paragraph } from '../../primitives/Paragraph/Paragraph';
import { RichText } from '../../primitives/RichText/RichText';
import { Textarea } from '../../primitives/Textarea/Textarea';
import { Heading } from '../../primitives/Heading/Heading';
import { Button } from '../../primitives/Button/Button';

interface FormValues extends Record<string, undefined | string | number | string[] | number[]> {
    formId: string;
    locale: string | undefined;
}

interface SingleLineInput {
    readonly __typename: 'SingleLineInputRecord';
    readonly id: unknown;
    readonly label: string | null;
    readonly placeholder: string | null;
    readonly required: unknown | null;
    readonly hint: string | null;
    readonly variant: string | null;
}

interface Textarea {
    readonly __typename: 'TextareaRecord';
    readonly id: unknown;
    readonly label: string | null;
    readonly required: unknown | null;
}

interface Fieldset {
    readonly __typename: 'FieldsetRecord';
    readonly id: unknown;
    readonly legend: string | null;
}

interface Checkbox {
    readonly __typename: 'CheckboxRecord';
    readonly id: unknown;
    readonly label: string | null;
    readonly required: unknown | null;
}

interface Choice {
    readonly __typename: 'ChoiceRecord';
    readonly id: unknown;
    readonly label: string | null;
    readonly required: unknown | null;
    readonly choices: unknown | null;
}

type FormField = SingleLineInput | Textarea | Fieldset | Checkbox | Choice | { readonly __typename: '%other' } | null;
type RealField = SingleLineInput | Textarea | Checkbox | Choice;

const CmsForm = ({ form }: CmsFormBlock_content): ReactElement => {
    const { locale } = useRouter();
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!form) {
        return <></>;
    }

    function renderForm(props: FormikProps<FormValues>): (ReactElement | boolean)[] | undefined {
        // eslint-disable-next-line react/prop-types
        const { values, setFieldValue } = props;
        return form?.content
            ?.map((field: FormField) => {
                if (field) {
                    switch (field.__typename) {
                        case 'SingleLineInputRecord': {
                            return (
                                <div
                                    className={styles.fieldWrapper}
                                    key={`Field_${field.id}`}
                                    width={
                                        field.variant === 'krátké' ? 'sm' : field.variant === 'střední' ? 'md' : 'lg'
                                    }
                                >
                                    <Field
                                        type="text"
                                        name={field.id}
                                        component={Input}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                    />
                                    {field.hint && (
                                        <Paragraph>
                                            <RichText content={field.hint} />
                                        </Paragraph>
                                    )}
                                </div>
                            );
                        }

                        case 'CheckboxRecord': {
                            return (
                                <div className={styles.fieldWrapper} key={`Field_${field.id}`} width={'lg'}>
                                    <Field
                                        id={field.id}
                                        type="checkbox"
                                        name={field.id}
                                        component={Input}
                                        value={'1'}
                                        label={<RichText content={String(field.label)} />}
                                        checked={values[String(field.id)] === '1'}
                                        onChange={(): void =>
                                            setFieldValue(
                                                String(field.id),
                                                values[String(field.id)] === '1' ? '0' : '1',
                                            )
                                        }
                                    />
                                </div>
                            );
                        }

                        case 'TextareaRecord': {
                            return (
                                <div className={styles.fieldWrapper} key={`Field_${field.id}`} width={'lg'}>
                                    <Field type="text" name={field.id} component={Textarea} label={field.label} />
                                </div>
                            );
                        }

                        case 'FieldsetRecord': {
                            return (
                                <Heading key={`Field_${field.id}`} tag={'h3'}>
                                    {field.legend}
                                </Heading>
                            );
                        }
                    }
                }
                return false;
            })
            .filter((a) => a);
    }

    const required =
        form.content?.reduce<RealField[]>((acc, field: FormField) => {
            if (field) {
                switch (field.__typename) {
                    case 'SingleLineInputRecord':
                    case 'TextareaRecord':
                    case 'CheckboxRecord':
                    case 'ChoiceRecord':
                        if (field.required) {
                            acc.push(field);
                        }
                }
            }
            return acc;
        }, []) || [];

    if (isSubmitted) {
        return (
            <div className={styles.success}>
                <RichText content={String(form.successMessage)} />
            </div>
        );
    }

    return (
        <Formik
            initialValues={{
                formId: String(form.id),
                locale,
            }}
            onSubmit={async (values: FormValues, actions: FormikHelpers<FormValues>): Promise<void> => {
                actions.setSubmitting(true);
                try {
                    const formData = new FormData();
                    Object.keys(values).forEach((key) => {
                        formData.append(key, String(values[key]));
                    });
                    const { data } = await axios.post('/api/saveForm', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true,
                    });
                    if (data.status === 'OK') {
                        setIsSubmitted(true);
                    } else {
                        setGlobalError('Formulář se nepodařilo odeslat');
                    }
                } catch (e) {
                    setGlobalError('Formulář se nepodařilo odeslat');
                } finally {
                    actions.setSubmitting(false);
                }
            }}
            validationSchema={yup.object().shape(
                required.reduce<
                    Record<
                        string,
                        Ref | Schema<unknown, Record<string, unknown>> | MixedSchema<unknown, Record<string, unknown>>
                    >
                >((acc, field) => {
                    acc[String(field?.id)] = yup.string().required(trans('form.required'));
                    return acc;
                }, {}),
            )}
        >
            {(helpers: FormikProps<FormValues>): JSX.Element => (
                <Form action={'/api/saveForm'} method={'post'}>
                    {globalError && (
                        <div className={styles.globalError}>
                            {/* <Icon className={styles.alertIcon} name="alert" /> */}
                            <p>{globalError}</p>
                        </div>
                    )}
                    {renderForm(helpers)}

                    <Button
                        type="submit"
                        onClick={(e): void => {
                            e.preventDefault();
                            if (!helpers.isSubmitting) {
                                helpers.submitForm();
                            }
                        }}
                    >
                        {String(form?.submitLabel)}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

CmsForm.whyDidYouRender = true;

export { CmsForm };
