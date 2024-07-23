// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFieldValidatorsPair, MultipleFieldsValidator } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';
import { IValidationError, Validators } from '../core/validator';

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

export class FilterKeyColumnsTargetValidator extends FilterColumnTargetValidator {
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
                field: "keys",
                validators: [Validators.fieldRequiredValidator, Validators.stringArrayValidator]
            },
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

export class FilterKeyHierarchyTargetValidator extends FilterHierarchyTargetValidator {
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
                field: "keys",
                validators: [Validators.fieldRequiredValidator, Validators.stringArrayValidator]
            },
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

export class FilterDisplaySettingsValidator extends ObjectValidator {
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
                field: "isLockedInViewMode",
                validators: [Validators.booleanValidator]
            },
            {
                field: "isHiddenInViewMode",
                validators: [Validators.booleanValidator]
            },
            {
                field: "displayName",
                validators: [Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class FilterValidatorBase extends ObjectValidator {
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
                field: "$schema",
                validators: [Validators.stringValidator]
            },
            {
                field: "filterType",
                validators: [Validators.filterTypeValidator]
            },
            {
                field: "displaySettings",
                validators: [Validators.filterDisplaySettingsValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class BasicFilterValidator extends FilterValidatorBase {
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
            {
                field: "requireSingleSelection",
                validators: [Validators.booleanValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class AdvancedFilterValidator extends FilterValidatorBase {
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
                field: "logicalOperator",
                validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
            },
            {
                field: "conditions",
                validators: [Validators.filterConditionsValidator]
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

export class RelativeDateTimeFilterValidator extends FilterValidatorBase {
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
                field: "operator",
                validators: [Validators.fieldRequiredValidator, Validators.relativeDateFilterOperatorValidator]
            },
            {
                field: "timeUnitsCount",
                validators: [Validators.numberValidator]
            },
            {
                field: "timeUnitType",
                validators: [Validators.fieldRequiredValidator, Validators.relativeDateTimeFilterUnitTypeValidator]
            },
            {
                field: "filterType",
                validators: [Validators.relativeDateTimeFilterTypeValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class RelativeDateFilterValidator extends RelativeDateTimeFilterValidator {
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
                field: "includeToday",
                validators: [Validators.fieldRequiredValidator, Validators.booleanValidator]
            },
            {
                field: "timeUnitType",
                validators: [Validators.fieldRequiredValidator, Validators.relativeDateFilterTimeUnitTypeValidator]
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

export class RelativeTimeFilterValidator extends RelativeDateTimeFilterValidator {
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
                field: "timeUnitType",
                validators: [Validators.fieldRequiredValidator, Validators.relativeTimeFilterTimeUnitTypeValidator]
            },
            {
                field: "filterType",
                validators: [Validators.relativeTimeFilterTypeValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class TopNFilterValidator extends FilterValidatorBase {
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
            {
                field: "orderBy",
                validators: [Validators.fieldRequiredValidator, Validators.filterTargetValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class NotSupportedFilterValidator extends FilterValidatorBase {
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

export class IncludeExcludeFilterValidator extends FilterValidatorBase {
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
                field: "isExclude",
                validators: [Validators.fieldRequiredValidator, Validators.booleanValidator]
            },
            {
                field: "values",
                validators: [Validators.fieldRequiredValidator, Validators.includeExcludeFilterValuesValidator]
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

export class HierarchyFilterValidator extends FilterValidatorBase {
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
                field: "hierarchyData",
                validators: [Validators.fieldRequiredValidator, Validators.hierarchyFilterValuesValidator]
            },
            {
                field: "filterType",
                validators: [Validators.hierarchyFilterTypeValidator]
            },
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class HierarchyFilterNodeValidator extends ObjectValidator {
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
                validators: [Validators.anyValueValidator]
            },
            {
                field: "keyValues",
                validators: [Validators.anyArrayValidator]
            },
            {
                field: "children",
                validators: [Validators.hierarchyFilterValuesValidator]
            },
            {
                field: "operator",
                validators: [Validators.stringValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class IncludeExcludePointValueValidator extends ObjectValidator {
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
                field: "keyValues",
                validators: [Validators.anyArrayValidator]
            }
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
        const errors = super.validate(input, path, field);
        if (errors) {
            return errors;
        }

        return Validators.anyFilterValidator.validate(input, path, field);
    }
}

export class UpdateFiltersRequestValidator extends ObjectValidator {
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
                field: "filtersOperation",
                validators: [Validators.fieldRequiredValidator, Validators.filtersOperationsUpdateValidator]
            },
            {
                field: "filters",
                validators: [Validators.fieldRequiredValidator, Validators.filtersArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class RemoveFiltersRequestValidator extends ObjectValidator {
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
                field: "filtersOperation",
                validators: [Validators.fieldRequiredValidator, Validators.filtersOperationsRemoveAllValidator]
            },
            {
                field: "filters",
                validators: [Validators.fieldForbiddenValidator, Validators.filtersArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
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
                validators: [Validators.anyValueValidator]
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

export class OnLoadFiltersBaseValidator extends ObjectValidator {
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
                field: "operation",
                validators: [Validators.fieldRequiredValidator, Validators.filtersOperationsUpdateValidator]
            },
            {
                field: "filters",
                validators: [Validators.fieldRequiredValidator, Validators.filtersArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class OnLoadFiltersBaseRemoveOperationValidator extends ObjectValidator {
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
                field: "operation",
                validators: [Validators.fieldRequiredValidator, Validators.filtersOperationsRemoveAllValidator]
            },
            {
                field: "filters",
                validators: [Validators.fieldForbiddenValidator, Validators.filtersArrayValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}

export class OnLoadFiltersValidator extends ObjectValidator {
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
                field: "allPages",
                validators: [Validators.onLoadFiltersBaseValidator]
            },
            {
                field: "currentPage",
                validators: [Validators.onLoadFiltersBaseValidator]
            }
        ];

        const multipleFieldsValidator = new MultipleFieldsValidator(fields);
        return multipleFieldsValidator.validate(input, path, field);
    }
}
