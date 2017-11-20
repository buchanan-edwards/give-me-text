//==============================================================================
// A simple REST client for the Give Me Text (http://givemetext.okfnlabs.org)
// service. This package exports a single function that returns a promise
// resolved with the detected type and extracted text of a document.
//==============================================================================
// Copyright (c) 2017 Buchanan & Edwards
//
// Licensed under the MITLicense. Please see the LICENSE file for details.
//==============================================================================
// Author: Frank Hellwig <frank.hellwig@buchanan-edwards.com>
//==============================================================================

'use strict';

//------------------------------------------------------------------------------
// Dependencies
//------------------------------------------------------------------------------

const request = require('request');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const BASE_URL = 'http://givemetext.okfnlabs.org/tika';

const MS_WORD = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const TOP_LEVEL_TYPES = [
  'application',
  'audio',
  'example',
  'font',
  'image',
  'message',
  'model',
  'multipart',
  'text',
  'video'
];

//------------------------------------------------------------------------------
// Utilities
//------------------------------------------------------------------------------

function _isMediaType(hint) {
  return TOP_LEVEL_TYPES.some(type => {
    return hint.startsWith(type + '/');
  });
}

function _detect(document, filename) {
  const headers = {
    Accept: 'text/plain'
  };
  if (typeof hint === 'string') {
    headers['Content-Disposition'] = `attachment; filename="${filename}"`;
  }
  const options = {
    method: 'PUT',
    baseUrl: BASE_URL,
    uri: '/detect/stream',
    body: document,
    encoding: 'utf8',
    headers: headers
  };
  return _request(options);
}

function _extract(document, type) {
  const options = {
    method: 'PUT',
    baseUrl: BASE_URL,
    uri: '/tika',
    body: document,
    encoding: 'utf8',
    headers: {
      Accept: 'text/plain',
      'Content-Type': type
    }
  };
  return _request(options).then(body => {
    if (type === MS_WORD) {
      body = body.replace(/\[bookmark: [^\]]+\]/g, '');
    }
    return {
      type: type,
      text: body
    };
  });
}

function _request(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        let msg = `${response.statusCode} (${response.statusMessage})`;
        let err = new Error(msg);
        err.code = response.statusCode;
        err.body = body;
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

function giveMeText(document, hint) {
  if (typeof hint === 'string') {
    if (_isMediaType(hint)) {
      return _extract(document, hint);
    }
    return _detect(document, hint).then(type => {
      return _extract(document, type);
    });
  }
  return _detect(document).then(type => {
    return _extract(document, type);
  });
}

module.exports = giveMeText;
