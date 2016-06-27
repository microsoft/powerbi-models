# powerbi-models

Contains JavaScript &amp; TypeScript object models for Microsoft Power BI JavaScript SDK.

For each model there is a TypeScript interface, a json schema definitions, and a validation function to ensure a given object is a valid model.

## Getting Started

Install
```
npm install --save powerbi-models
```

Import
```
import * as models from 'powerbi-models';
```

Usage
```
let testObject = { x: 1 };

const errors = models.validateLoad(testObject);

if(errors) {
  console.warn(errors);
}

```
Would output to the console:
```
[
  {
    message: 'accessToken is required'
  }
]
```