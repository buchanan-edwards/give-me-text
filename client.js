'use strict';

const request = require('request');

const BASE_URL = 'http://givemetext.okfnlabs.org/tika';

const MS_WORD =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function detect(document) {
  const options = {
    method: 'PUT',
    baseUrl: BASE_URL,
    uri: '/detect/stream',
    body: document,
    encoding: 'utf8',
    headers: {
      Accept: 'text/plain'
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) return reject(err);
      resolve(body);
    });
  });
}

function _extract(document, type) {
  const options = {
    method: 'PUT',
    baseUrl: BASE_URL,
    uri: '/tika',
    body: document,
    encoding: 'utf8',
    headers: {
      'Content-Type': type,
      Accept: 'text/plain'
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) return reject(err);
      if (type === MS_WORD) {
        body = body.replace(/\[bookmark: [^\]]+\]/g, '');
      }
      resolve(body);
    });
  });
}

function extract(document, type) {
  if (type) {
    return _extract(document, type);
  }
  return detect(document).then(type => {
    return _extract(document, type);
  });
}

module.exports = {
  detect,
  extract
};
