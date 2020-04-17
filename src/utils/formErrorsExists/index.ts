import { FormErrors, FormErrorsTypes } from '../../types/forms';

export const formErrorsExists = (formErrors: FormErrors | null, name: string): string => {
    if (formErrors) {
        switch (name) {
            case FormErrorsTypes.EMAIL_FORMAT:
                return formErrors.emailInvalid || FormErrorsTypes.EMAIL_FORMAT;
            case FormErrorsTypes.REQUIRED:
                return formErrors.required || FormErrorsTypes.REQUIRED;
            case FormErrorsTypes.GENERAL_ERROR:
                return formErrors.generalError || FormErrorsTypes.GENERAL_ERROR;
            default:
                return '';
        }
    } else {
        return '';
    }
};
