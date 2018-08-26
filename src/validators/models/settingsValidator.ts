import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class SettingsValidator extends ObjectValidator {
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
        field: "filterPaneEnabled",
        validators: [Validators.booleanValidator]
      },
      {
        field: "navContentPaneEnabled",
        validators: [Validators.booleanValidator]
      },
      {
        field: "bookmarksPaneEnabled",
        validators: [Validators.booleanValidator]
      },
      {
        field: "useCustomSaveAsDialog",
        validators: [Validators.booleanValidator]
      },
      {
        field: "extensions",
        validators: [Validators.extentionArrayValidator]
      },
      {
        field: "layoutType",
        validators: [Validators.layoutTypeValidator]
      },
      {
        field: "customLayout",
        validators: [Validators.customLayoutValidator]
      },
      {
        field: "background",
        validators: [Validators.backgroundValidator]
      },
      {
        field: "visualSettings",
        validators: [Validators.visualSettingsValidator]
      },
      {
        field: "hideErrors",
        validators: [Validators.booleanValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}
