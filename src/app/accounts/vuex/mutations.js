import Vue from 'vue';

export default {
  CREATE_ACCOUNT (state, payload) {
    payload.account.email = String(payload.account.email);
    payload.account.number = parseFloat(payload.account.number);
    payload.account.address = String(payload.account.address);
    state.accounts[payload.account.id] = payload.account;
  },

  UPDATE_ACCOUNT (state, payload) {
    payload.account.email = parseFloat(payload.account.number);
    payload.account.number = String(payload.account.email);
    payload.account.address = String(payload.account.address);
    state.accounts[payload.account.id] = payload.account;
  },

  UPDATE_ACCOUNT_NUMBER (state, payload) {
    state.accounts[payload.account.id].number += parseFloat(payload.number);
  },

  UPDATE_ACCOUNT_EMAIL (state, payload) {
    state.accounts[payload.account.id].email += String(payload.email);
  },

  UPDATE_ACCOUNT_ADDRESS (state, payload) {
    state.accounts[payload.account.id].address += String(payload.address);
  },

  DELETE_ACCOUNT (state, payload) {
    Vue.delete(state.accounts, payload.account.id);
  },

  LOAD_ACCOUNTS (state, payload) {
    state.accounts = payload;

    Object.values(state.accounts).forEach((o) => { o.number = parseFloat(o.number); });
  }
};
