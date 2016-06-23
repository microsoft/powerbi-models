# powerbi-models

Collection of functions to validate PowerBI messages using json schema.  Also contains shared interfaces for all messages to ensure host and iframe agree.

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
  console.warn(errors) 
}

...

```