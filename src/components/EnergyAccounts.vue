<template>
  <div id="energy-accounts">
    <EnergyAccount v-if="getFirstAccount" :account="account" :onComplete="finishFirstAccount" />
    <b-row class="pb-3"
      align-h="center"
      v-for="_account in CurrentApplication.energyAccounts"
      :key="_account.id"
    >
      <EnergyAccountTemplate :account="_account" :editAccount="editAccount"/>
    </b-row>
    <b-row v-if="!getFirstAccount" class="justify-content-center">
      <b-button @click="newAccount" variant="success"><b-icon icon="plus-circle" style="margin-right: 9px;"/>{{ labelAddButton }}</b-button>
    </b-row>
    <b-modal id="modal-account-edit" v-model="showEditor" title="Energy Account" hide-footer>
      <div class="sheet">
        <EnergyAccount :account="account" :onComplete="finishEdit" />
      </div>
    </b-modal>
    <b-modal id="modal-service-provider" title="EAP Service Provider" hide-footer size="sm">
      <b-container class="py-2">
        <b-row class="justify-content-center">
          <ServiceProvider v-if="ServiceProvider" />
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<style scoped>
.btn-vendor {
  min-width: 365px;
  min-height: 61px;
}
@media only screen and (max-width: 500px) {
  .btn-vendor {
      width: 100%;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import ServiceProvider from '../components/ServiceProvider'
import EnergyAccount from './EnergyAccount.vue'
import EnergyAccountTemplate from './EnergyAccountTemplate'

export default {
  name: 'EnergyCompanies',
  props: {
    editId: null
  },
  components: { ServiceProvider, EnergyAccount, EnergyAccountTemplate },
  computed: {
    ...mapGetters([
      'CurrentApplication',
      'ServiceProvider',
      'SPEnergyProviders'
    ]),
    labelAddButton () {
      if (this.getFirstAccount === false && this.needsElectricityAccount) return 'Add Electric Company'
      return 'Add Another Energy Company'
    }
  },
  created () {
    if (this.CurrentApplication.energyAccounts) {
      this.getFirstAccount = false
      this.checkElectric()
      if (this.editId) {
        var toEdit = this.CurrentApplication.energyAccounts.find(r => r.id === this.editId)
        if (toEdit) {
          this.editAccount(toEdit)
        }
      }
    }
  },
  methods: {
    finishFirstAccount () {
      this.getFirstAccount = false
      this.checkElectric()
    },
    newAccount () {
      this.account = null
      this.showEditor = true
    },
    editAccount (account) {
      this.account = {...account}
      this.showEditor = true
    },
    finishEdit () {
      this.showEditor = false
      this.checkElectric()
    },
    checkElectric () {
      var fuels = this.CurrentApplication.energyAccounts.flatMap(ea => ea.fuels)
      var elect = fuels.find(f => f === 'Electricity')
      this.needsElectricityAccount = !elect
    }
  },
  data () {
    return {
      showEditor: false,
      getFirstAccount: true,
      needsElectricityAccount: false,
      account: null
    }
  }
}
</script>
