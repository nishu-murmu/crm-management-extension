import { config } from '../config/config';

export const api = {
  get: function (query, header = {}) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get((result) => {
        var opts = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...header,
          },
          credentials: 'omit',
        } as any;
        fetch(config.API_URL + query, opts)
          .then((response) => response.json())
          .then(function (data) {
            resolve(data);
          })
          .catch((error) => {
            let err = {
              resError: error,
              message: 'Server not responding!',
            };
            reject(err);
          });
      });
    });
  },
  post: function (url_path, body, header = {}) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get((result) => {
        var opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...header,
          },
          credentials: 'omit',
          body: JSON.stringify(body),
        } as any;
        fetch(config.API_URL + url_path, opts)
          .then((response) => response.json())
          .then(function (data) {
            resolve(data);
          })
          .catch((error) => {
            let err = {
              resError: error,
              message: 'Server not responding!',
            };
            reject(err);
          });
      });
    });
  },
};
