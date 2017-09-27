import { IValidationError } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { BooleanValidator, ObjectValidator, ArrayValidator } from '../core/typeValidator';
import { CustomLayoutValidator } from './customLayoutValidator';
import { ExtensionValidator } from './extensionsValidator';

export class SettingsValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "filterPaneEnabled",
        validators: [ new BooleanValidator()]
      },
      {
        field: "navContentPaneEnabled",
        validators: [new BooleanValidator()]
      },
      {
        field: "useCustomSaveAsDialog",
        validators: [new BooleanValidator()]
      },
      {
        field: "extensions",
        validators: [new ArrayValidator([new ExtensionValidator()])]
      },
      {
        field: "customLayout",
        validators: [new CustomLayoutValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}
