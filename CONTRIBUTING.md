# Contributing

## Setup

Clone the repository:

```bash
git clone https://github.com/Microsoft/powerbi-models
```

Navigate to the cloned directory

Install local dependencies:

```bash
npm install
```

Install gulp globally and create a local link to it:
```bash
npm install -g gulp
npm link gulp --no-bin-links
```

## Building

```bash
npm run build
```

Or if using VS Code: `Ctrl + Shift + B`

## Testing

```bash
npm test
```

By default the tests run using PhantomJS

There are various command line arguments that can be passed to the test command to facilitate debugging:

Run tests with Chrome

```bash
npm test -- --chrome
```

Enable  debug level logging for karma, and remove code coverage

```bash
npm test -- --debug
```

Disable single run to remain open for debugging

```bash
npm test -- --watch
```

These are often combined and typical command for debugging tests is:

```bash
npm test -- --chrome --debug --watch
```
