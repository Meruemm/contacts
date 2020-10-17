import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import localforage from 'localforage';
require('localforage-startswith');
import 'bulma/css/bulma.css';

import { App } from './app';
import router from './router';
import store from './store';

localforage.config({
  name: 'contacts'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
