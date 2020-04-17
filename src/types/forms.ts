export interface FormErrors {
    readonly emailInvalid: string | null;
    readonly generalError: string | null;
    readonly required: string | null;
}

export enum FormErrorsTypes {
    REQUIRED = 'required',
    EMAIL_FORMAT = 'emailInvalid',
    GENERAL_ERROR = 'generalError',
}
