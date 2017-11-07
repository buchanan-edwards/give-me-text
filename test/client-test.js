'use strict';

const client = require('../client');
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
  word:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  text: 'text/plain'
};

function removeWhiteSpace(text) {
  return text.replace(/\s+/g, '');
}

const refText = removeWhiteSpace(documents.text.toString('utf8'));

describe('client module', function() {
  describe('detect function', function() {
    describe('detect(<word document>)', function() {
      it('should detect a word document', function() {
        return client.detect(documents.word).then(type => {
          assert.strictEqual(type, types.word);
        });
      });
    });

    describe('detect(<pdf document>)', function() {
      it('should detect a pdf document', function() {
        return client.detect(documents.pdf).then(type => {
          assert.strictEqual(type, types.pdf);
        });
      });
    });

    describe('detect(<text document>)', function() {
      it('should detect a text document', function() {
        return client.detect(documents.text).then(type => {
          assert.strictEqual(type, types.text);
        });
      });
    });
  });

  describe('extract function', function() {
    describe('extract(<word document>)', function() {
      it('should extract the text from a word document', function() {
        return client.extract(documents.word).then(text => {
          assert.strictEqual(removeWhiteSpace(text), refText);
        });
      });
    });

    describe('extract(<pdf document>)', function() {
      it('should extract the text from a pdf document', function() {
        return client.extract(documents.pdf).then(text => {
          assert.strictEqual(removeWhiteSpace(text), refText);
        });
      });
    });

    describe('extract(<text document>)', function() {
      it('should extract the text from a text document', function() {
        return client.extract(documents.text).then(text => {
          assert.strictEqual(removeWhiteSpace(text), refText);
        });
      });
    });
  });
});
