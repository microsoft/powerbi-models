import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class FilterColumnTargetValidator extends ObjectValidator {
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
        field: "table",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "column",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class FilterHierarchyTargetValidator extends ObjectValidator {
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
        field: "table",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "hierarchy",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "hierarchyLevel",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class FilterMeasureTargetValidator extends ObjectValidator {
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
        field: "table",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "measure",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class BasicFilterValidator extends ObjectValidator {
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
        field: "target",
        validators: [Validators.fieldRequiredValidator, Validators.filterTargetValidator]
      },
      {
        field: "operator",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "values",
        validators: [Validators.fieldRequiredValidator, Validators.anyArrayValidator]
      },
      {
        field: "filterType",
        validators: [Validators.basicFilterTypeValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class AdvancedFilterValidator extends ObjectValidator {
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
        field: "target",
        validators: [Validators.fieldRequiredValidator, Validators.filterTargetValidator]
      },
      {
        field: "logicalOperator",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "conditions",
        validators: [Validators.fieldRequiredValidator, Validators.filterConditionsValidator]
      },
      {
        field: "filterType",
        validators: [Validators.advancedFilterTypeValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class RelativeDateFilterValidator extends ObjectValidator {
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
        field: "target",
        validators: [Validators.fieldRequiredValidator, Validators.filterTargetValidator]
      },
      {
        field: "operator",
        validators: [Validators.fieldRequiredValidator, Validators.relativeDateFilterOperatorValidator]
      },
      {
        field: "timeUnitsCount",
        validators: [Validators.fieldRequiredValidator, Validators.numberValidator]
      },
      {
        field: "timeUnitType",
        validators: [Validators.fieldRequiredValidator, Validators.relativeDateFilterTimeUnitTypeValidator]
      },
      {
        field: "includeToday",
        validators: [Validators.fieldRequiredValidator, Validators.booleanValidator]
      },
      {
        field: "filterType",
        validators: [Validators.relativeDateFilterTypeValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class TopNFilterValidator extends ObjectValidator {
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
        field: "target",
        validators: [Validators.fieldRequiredValidator, Validators.filterTargetValidator]
      },
      {
        field: "operator",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "itemCount",
        validators: [Validators.fieldRequiredValidator, Validators.numberValidator]
      },
      {
        field: "filterType",
        validators: [Validators.topNFilterTypeValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class NotSupportedFilterValidator extends ObjectValidator {
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
        field: "target",
        validators: [Validators.filterTargetValidator]
      },
      {
        field: "message",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "notSupportedTypeName",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "filterType",
        validators: [Validators.notSupportedFilterTypeValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class IncludeExcludeFilterValidator extends ObjectValidator {
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
        field: "target",
        validators: [Validators.fieldRequiredValidator, Validators.filterTargetValidator]
      },
      {
        field: "isExclude",
        validators: [Validators.fieldRequiredValidator, Validators.booleanValidator]
      },
      {
        field: "values",
        validators: [Validators.fieldRequiredValidator, Validators.anyArrayValidator]
      },
      {
        field: "filterType",
        validators: [Validators.includeExludeFilterTypeValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class FilterValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    return Validators.anyFilterValidator.validate(input, path, field);
  }
}

export class ConditionItemValidator extends ObjectValidator {
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
        field: "value",
        validators: [Validators.fieldRequiredValidator, Validators.anyValueValidator]
      },
      {
        field: "operator",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}
