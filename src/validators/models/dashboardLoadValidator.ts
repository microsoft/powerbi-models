import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

export class DashboardLoadValidator extends ObjectValidator {
    public validate(input: any, path?: string, field?: string): IValidationError[] {
        if (input == null) {
            return null;
        }
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        const fields: IFieldValidatorsPair[] = [
            {
                field: "accessToken",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "id",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "groupId",
                validators: [Validators.stringValidator]
            },
            {
                field: "pageView",
                validators: [Validators.pageViewFieldValidator]
            },
            {
                field: "tokenType",
                validators: [Validators.tokenTypeValidator]
            },
            {
                field: "embedUrl",
                validators: [Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
