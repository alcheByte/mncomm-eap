/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import accounts from './modules/accounts'
import serviceProviders from './modules/eap-providers'
import identityTypes from './modules/identity-types'
import energyProviders from './modules/energy-providers'
import incomeSources from './modules/income-sources'
import vendorFuels from './modules/vendor-fuels'
import raceEthnicity from './modules/race-ethnicity'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = () => ({
  CurrentUser: null,
  CurrentAccount: null,
  CurrentApplication: null,
  UserIsAR: null,
  CallToAction: null,
  CanApplyThisYear: null,
  IsEligible: null,
  EligibilityMessage: null,
  ErrorMessage: null,
  MNCounties: [],
  CountySPs: [],
  ServiceProvider: null,
  RaceEthnicityGroups: null,
  IdentityTypes: [],
  IncomeSources: [],
  VendorFuels: []
})

export default new Vuex.Store({
  modules: {
    users,
    accounts,
    serviceProviders,
    raceEthnicity,
    identityTypes,
    energyProviders,
    vendorFuels,
    incomeSources
  },
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
