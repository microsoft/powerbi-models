# powerbi-models
[![Build Status](https://travis-ci.com/Microsoft/powerbi-models.svg?token=nXyWFYxRu6tVxUMJAuJr&branch=master)](https://travis-ci.com/Microsoft/powerbi-models)

Contains JavaScript &amp; TypeScript object models for Microsoft Power BI JavaScript SDK.

For each model there is a TypeScript interface, a json schema definitions, and a validation function to ensure a given object is a valid model.

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
