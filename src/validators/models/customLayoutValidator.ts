import { IValidationError } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator, EnumValidator, NumberValidator } from '../core/typeValidator';

export class PageSizeValidator extends ObjectValidator {

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "type",
        validators: [new EnumValidator([0, 1, 2, 3, 4, 5])]
      },
      {
        field: "width",
        validators: [new NumberValidator()]
      },
      {
        field: "height",
        validators: [new NumberValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}

export class CustomLayoutValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "pageSize",
        validators: [new PageSizeValidator()]
      },
      {
        field: "displayOption",
        validators: [new EnumValidator([0, 1, 2])]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}
