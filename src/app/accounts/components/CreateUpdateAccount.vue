<template>
  <div id="accounts-create-edit-view">

    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Добавить Контактов</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'accountsList' }" class="button">Посмотреть всех контактов &#8630;</router-link>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-6">
        <b-form class="form" @submit.prevent="processSave">
           <b-form-group id="input-group-2" label="Имя:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="selectedAccount.name"
          placeholder="Добавить Имя"
        ></b-form-input>
      </b-form-group>
         <b-form-group id="input-group-2" label=" Телефон номер:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="selectedAccount.number"
          placeholder="Добавить Телефон номер"
        ></b-form-input>
      </b-form-group>
         <b-form-group id="input-group-2" label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="selectedAccount.email"
          placeholder="Добавить Email"
        ></b-form-input>
      </b-form-group>
         <b-form-group id="input-group-2" label="Адрес:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="selectedAccount.address"
          placeholder="Добавить Адрес"
        ></b-form-input>
      </b-form-group>
          <div class="control is-grouped">
            <p class="control">
              <button class="button is-success">Подтвердить</button>
            </p>
            <p class="control">
              <router-link :to="{ name: 'accountsList' }"><button class="button is-link">Отменит</button></router-link>
            </p>
          </div>
        </b-form>
      </div>
    </div>


  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'accounts-create-edit-view',
  props: ['accountId'],

  data: () => {
    return {
      editing: false,
      selectedAccount: {}
    };
  },

  mounted () {
    if (this.accountId) {
      this.loadAccount();
    }
  },

  methods: {
    ...mapActions([
      'createAccount',
      'updateAccount',
      'loadAccounts'
    ]),

    resetAndGo () {
      this.selectedAccount = {};
      this.$router.push({ name: 'accountsList' });
    },

    saveNewAccount () {
      this.createAccount(this.selectedAccount).then(() => {
        this.resetAndGo();
      });
    },

    saveAccount () {
      this.updateAccount(this.selectedAccount).then(() => {
        this.resetAndGo();
      });
    },

    processSave () {
      this.editing ? this.saveAccount() : this.saveNewAccount();
    },

    loadAccount () {
      let vm = this;
      this.loadAccounts().then(() => {
        let selectedAccount = vm.getAccountById(vm.accountId);
        if (selectedAccount) {
          vm.editing = true;
          vm.selectedAccount = Object.assign({}, selectedAccount);
        }
      });
    }
  },

  computed: {
    ...mapGetters([
      'getAccountById'
    ])
  },

  watch: {
    accountId (newId) {
      if (newId) {
        this.loadAccount();
      }
      this.editing = false;
      this.selectedAccount = {};
    }
  }
};
</script>

<style scoped lang='scss'>
#accounts-create-edit-view {
}
</style>
