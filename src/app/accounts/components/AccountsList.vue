<template>
  <div id="accounts-list-view">

    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Контакты</h1>
      </div>
      <div>
      <b-input-group size="md" class="mt-2">
      <b-form-input type="search" placeholder="Поиск"></b-form-input>
    </b-input-group>
    </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'createAccount' }" class="button is-primary">Добавить Контактов</router-link>
        </div>
      </div>
    </nav>

    <table class="table is-bordered">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Телефон номер</th>
          <th>Email</th>
          <th>Адрес</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="account, key in accounts"
          :class="{ 'is-delinquent': account.number < 0 }"
        >
          <td>
            <span class="subtitle is-5">{{ account.name }}</span>
          </td>
          <td><span class="subtitle is-5">+{{ account.number }}</span></td>
          <td><span class="subtitle is-5">{{ account.email }}</span></td>
          <td><span class="subtitle is-5">{{ account.address }}</span></td>
          <td>
            <router-link class="button is-primary" :to="{ name: 'updateAccount', params: { accountId: account.id } }">Редактировать</router-link>
            <a class="button is-danger" @click="confirmDeleteAccount(account)">Удалить</a>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'accounts-list-view',

  data () {
    return {
      search: ''
    };
  },

  mounted () {
    this.loadAccounts();
  },

  methods: {
    ...mapActions([
      'deleteAccount',
      'loadAccounts'
    ]),

    confirmDeleteAccount (account) {
      if (confirm(`Are you sure you want to delete ${account.name}?`)) {
        this.deleteAccount(account);
      }
    }
  },

  computed: {
    ...mapState({
      'accounts': state => state.accounts.accounts
    }),
    filteredList () {
      return this.account.filter(account => {
        return account.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style scoped lang='scss'>

</style>
