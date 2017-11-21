# give-me-text

A simple REST client for the [Give Me Text](http://givemetext.okfnlabs.org) service. This package exports a single function that returns a promise resolved with the detected type and extracted text of a document.

Version 1.0.3

## Installation

```
npm install --save give-me-text
```

## Usage

```javascript
const giveMeText = require('give-me-text');

giveMeText(myDocument).then(result => {
  console.log(result.type);
  console.log(result.text);
}).catch(err => {
  console.error(err);
});
```

## API

### `giveMeText(document)` or `giveMeText(document, hint)`

Given a document, it will detect the media type and extract the text. Returns a promise that is resolved with an object having two string properties: `type` and `text`. The `hint` parameter is optional. If specified, it can be a filename (this helps with media type detection) or an explicit media type (e.g., `application/pdf`). The `document` parameter can be a string or a Buffer.

```javascript
// Case 1: without a hint.
giveMeText(myDocument).then(result => {
  console.log(result.type);
  console.log(result.text);
});

// Case 2: with a filename hint.
client.detect(myDocument, 'my-document.pdf').then(result => {
  console.log(result.type);
  console.log(result.text);
});

// Case 3: with an explicit media type.
client.detect(myDocument, 'application/pdf').then(result => {
  console.log(result.type); // set to the value of the hint
  console.log(result.text);
});
```

In the first two cases, the media type of the document is detected by first submitting it to the `/detect/stream` service endpoint. In the last case, the `hint` is already a media type and the document is only submitted to the `/tika` service endpoint and the document type (the `hint`) is taken at face value.

## License

MIT License

Copyright (c) 2017 Buchanan & Edwards

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.