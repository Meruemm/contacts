import { guid } from '../../../utils';
import { deleteAccount as deleteAccountFromAPI, saveAccount, fetchAccounts } from '../api';

export const createAccount = ({ commit }, data) => {
  let id = guid();
  let account = Object.assign({ id: id }, data);
  commit('CREATE_ACCOUNT', {account: account});
  saveAccount(account).then((value) => {
  });
};

export const updateAccount = ({ commit }, data) => {
  commit('UPDATE_ACCOUNT', {account: data});
  saveAccount(data);
};

export const deleteAccount = ({ commit }, data) => {
  commit('DELETE_ACCOUNT', { account: data });
  deleteAccountFromAPI(data);
};

export const loadAccounts = ({ state, commit }) => {
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    return fetchAccounts().then((res) => {
      commit('LOAD_ACCOUNTS', res);
    });
  }
};

export const updateAccountNumber = ({ commit, getters }, data) => {
  commit('UPDATE_ACCOUNT_NUMBER', data);
  saveAccount(getters.getAccountById(data.account.id));
};

export const updateAccountEmail = ({ commit, getters }, data) => {
  commit('UPDATE_ACCOUNT_EMAIL', data);
  saveAccount(getters.getAccountById(data.account.id));
};
