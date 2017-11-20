'use strict';

const giveMeText = require('../client');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

function docpath(name) {
  return path.resolve(__dirname, name);
}

const documents = {
  word: fs.readFileSync(docpath('test-document.docx')),
  pdf: fs.readFileSync(docpath('test-document.pdf')),
  text: fs.readFileSync(docpath('test-document.txt'))
};

const types = {
  word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  text: 'text/plain'
};

function removeWhiteSpace(text) {
  return text.replace(/\s+/g, '');
}

const refText = removeWhiteSpace(documents.text.toString('utf8'));

describe('give-me-text', function() {
  describe('giveMeText(<word document>)', function() {
    it('should detect and extract the text from a word document', function() {
      return giveMeText(documents.word).then(result => {
        assert.strictEqual(result.type, types.word);
        assert.strictEqual(removeWhiteSpace(result.text), refText);
      });
    });
  });

  describe('giveMeText(<pdf document>)', function() {
    it('should detect and extract the text from a pdf document', function() {
      return giveMeText(documents.pdf).then(result => {
        assert.strictEqual(result.type, types.pdf);
        assert.strictEqual(removeWhiteSpace(result.text), refText);
      });
    });
  });

  describe('giveMeText(<text document>)', function() {
    it('should detect and extract the text from a text document', function() {
      return giveMeText(documents.text).then(result => {
        assert.strictEqual(result.type, types.text);
        assert.strictEqual(removeWhiteSpace(result.text), refText);
      });
    });
  });
});
