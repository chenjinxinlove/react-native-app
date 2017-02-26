/**
 * Created by chenjinxin on 2017/2/26.
 */
import Mock from 'mockjs';
import queryString from 'query-string';
import extend from 'lodash/extend';
import config from '../config';

let request = {}

request.get = function (url, params) {
  if(params) {
    url += '?' + queryString.stringify(params)
  }
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => Mock.mock(responseJson))
};

request.post = function (url, body) {
  let options = extend(config.header, {
    body: JSON.stringify(body)
  });
  return fetch(url, options)
    .then((response) => response.json())
    .then((responseJson) => Mock.mock(responseJson))
};


export default request;