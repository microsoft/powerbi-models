import { IValidator, IValidationError } from './validator';

export class ObjectValidator implements IValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    if (typeof input !== "object" || Array.isArray(input)) {
      return [{
        path: path,
        keyword: "type"
      }];
    }
    return null;
  }
}

export class ArrayValidator implements IValidator {
  constructor(private itemValidators: IValidator[]) {
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    if (!(Array.isArray(input))) {
      return [{
        message: field + " property is invalid",
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }

    for (let i = 0; i < input.length; i++) {
      const fieldsPath = (path ? path + "." : "") + field + "." + i;
      for (let validator of this.itemValidators) {
        let errors = validator.validate(input[i], fieldsPath, field);
        if (errors) {
          return errors;
        }
      }
    }

    return null;
  }
}

export class TypeValidator implements IValidator {
  constructor(private expectedType: string) {
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    if (!(typeof input === this.expectedType)) {
      return [{
        message: field + " must be a " + this.expectedType,
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }
    return null;
  }
}

export class StringValidator extends TypeValidator {
  constructor() {
    super("string");
  }
}

export class BooleanValidator extends TypeValidator {
  constructor() {
    super("boolean");
  }
}

export class NumberValidator extends TypeValidator {
  constructor() {
    super("number");
  }
}

export class ValueValidator implements IValidator {
  public constructor(private possibleValues: number[]) {}

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    if (this.possibleValues.indexOf(input) < 0) {
      return [{
        message: field + " property is invalid",
        path: (path ? path + "." : "") + field,
        keyword: "invalid"
      }];
    }
    return null;
  }
}

export class EnumValidator extends NumberValidator {
  public constructor(private possibleValues: number[]) {
    super();
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const valueValidator = new ValueValidator(this.possibleValues);
    return valueValidator.validate(input, path, field);
  }
}

export class StringArrayValidator extends ArrayValidator {
  constructor() {
    super([new StringValidator()]);
  }
}

export class BooleanArrayValidator extends ArrayValidator {
  constructor() {
    super([new BooleanValidator()]);
  }
}

export class NumberArrayValidator extends ArrayValidator {
  constructor() {
    super([new NumberValidator()]);
  }
}
