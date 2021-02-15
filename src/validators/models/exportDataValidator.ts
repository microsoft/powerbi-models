import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { EnumValidator, NumberValidator, ObjectValidator } from '../core/typeValidator';
import { IValidationError } from '../core/validator';

export class ExportDataRequestValidator extends ObjectValidator {
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
                field: "rows",
                validators: [new NumberValidator()]
            },
            {
                field: "exportDataType",
                validators: [new EnumValidator([0, 1])]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
