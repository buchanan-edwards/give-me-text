# give-me-text

A simple REST client for the [Give Me Text](http://givemetext.okfnlabs.org) service. This package provides functions that detect the MIME type of a document and extract the text from a document.

## Installation

```
npm install --save give-me-text
```

## Usage

```javascript
const client = require('give-me-text');

client.extract(wordDocument).then(text => {
  console.log(text);
})
```

## API

```javascript
client.detect(document)
```

Determines the MIME type of the document. Returns a promise that is resolved with the type (e.g., `application/pdf`). The `document` parameter can be a string or a Buffer.

```javascript
client.extract(document [, type])
```

Extracts the text from the document. Returns a promise that is resolved with the text. If the type is not specified, the `detect` function is called first to determine the type. The `document` parameter can be a string or a Buffer.

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