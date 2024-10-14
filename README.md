# powerbi-models

[![Build Status](https://img.shields.io/travis/Microsoft/powerbi-models.svg)](https://travis-ci.org/Microsoft/powerbi-models)
[![NPM Version](https://img.shields.io/npm/v/powerbi-models.svg)](https://www.npmjs.com/package/powerbi-models)
[![NPM Total Downloads](https://img.shields.io/npm/dt/powerbi-models.svg)](https://www.npmjs.com/package/powerbi-models)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/powerbi-models.svg)](https://www.npmjs.com/package/powerbi-models)
[![GitHub tag](https://img.shields.io/github/tag/microsoft/powerbi-models.svg)](https://github.com/Microsoft/powerbi-models/tags)

Contains JavaScript &amp; TypeScript object models for Microsoft Power BI JavaScript SDK.

For each model there is a TypeScript interface, a json schema definitions, and a validation function to ensure a given object is a valid model.

## Documentation

### [https://microsoft.github.io/powerbi-models](https://microsoft.github.io/powerbi-models)

## Getting Started

Install

```bash
npm install --save powerbi-models
```

Import

```typescript
import * as models from 'powerbi-models';
```

Usage

Validation:

```typescript
let testObject = { x: 1 };

const errors = models.validateLoad(testObject);

if(errors) {
  console.warn(errors);
}

```

Would output to the console:

```typescript
[
  {
    message: 'accessToken is required'
  }
]
```

Creating filters:

```typescript
const basicFilter: models.IBasicFilter = {
  target: {
    table: "Products",
    column: "Version"
  },
  operator: "In",
  values: [
    1,
    2,
    3,
    4
  ]
};

const advancedFilter: models.IAdvancedFilter = {
  target: {
    table: "Products",
    column: "Name"
  },
  logicalOperator: "Or",
  conditions: [
    {
      operator: "Contains",
      value: "Power"
    },
    {
      operator: "Contains",
      value: "Microsoft"
    }
  ]
};
```

Or use the constructor methods:

```typescript
const advancedFilter = new models.AdvancedFilter(
  {
    table: "Products",
    column: "Name"
  },
  "Or",
  {
    operator: "Contains",
    value: "Power"
  },
  {
    operator: "Contains",
    value: "Microsoft"
  }
);
```

## Date Formatting

Dates should be formated using [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. Example: `2016-09-08T00:15:46.861Z`

This is how dates are naturally serialized to JSON:

```typescript
new Date().toJSON(); //=> 2016-09-08T00:15:46.861Z
```

An example filter using this Date format would look like the following:

```JSON
{
  "$schema": "http://powerbi.com/product/schema#advanced",
  "target": {
    "table": "Time",
    "column": "Date"
  },
  "logicalOperator": "And",
  "conditions": [
    {
      "operator": "GreaterThan",
      "value": "2014-06-01T07:00:00.000Z"
    }
  ]
}
```

## Support

- **Feature Requests:** Submit your ideas and suggestions to the [Fabric Ideas Portal](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fideas.fabric.microsoft.com%2F&data=05%7C02%7COr.Shemesh%40microsoft.com%7C72ccde64806a4ff4237b08dce610afa7%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C638638206567959909%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=f8%2Blboxk11RF0P4KelMaE7FEUfStuxgUkTc8HiuBxr0%3D&reserved=0), where you can also vote on ideas from other developers.
- **Bug Reports and Technical Assistance:** Visit the [Fabric Developer Community Forum](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fcommunity.fabric.microsoft.com%2Ft5%2FDeveloper%2Fbd-p%2FDeveloper&data=05%7C02%7COr.Shemesh%40microsoft.com%7C66158ccfa9d0420897b808dce93e491f%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C638641700929578580%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=niYdcy8yLbG2X11WQhy3lkUgfboyYdT3oowYYfbtaDc%3D&reserved=0). Our team and community experts are ready to assist you.
- **Additional Support:** Contact your account manager or reach out to the [Fabric Support Team](https://support.fabric.microsoft.com/en-us/support/).
