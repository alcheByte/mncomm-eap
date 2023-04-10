export const getCounties = ({ commit, state }) => {
  commit('getCounties')
}
export const loadCountySPs = ({ commit, state }, county) => {
  commit('loadCountySPs', county)
}
export const selectServiceProvider = ({ commit, state }, sp) => {
  commit('selectServiceProvider', sp)
}
export const loadIncomeSources = ({ commit, state }) => {
  commit('loadIncomeSources')
}
export const signOn = ({ commit, state }, params) => {
  commit('signOn', params)
}
export const signOut = ({ commit, state }) => {
  commit('signOut')
}
export const setApplicationStep = ({ commit, state }, step) => {
  commit('setApplicationStep', step)
}
export const createAccount = ({ commit, state }, params) => {
  commit('createAccount', params)
}
export const createApplication = ({ commit, state }, params) => {
  commit('createApplication', params)
}
export const updateApplicant = ({ commit, state }, applicant) => {
  commit('updateApplicant', applicant)
}
export const updateAddresses = ({ commit, state }, addresses) => {
  commit('updateAddresses', addresses)
}
export const addResident = ({ commit, state }, resident) => {
  commit('addResident', resident)
}
export const saveResident = ({ commit, state }, resident) => {
  commit('saveResident', resident)
}
export const removeResident = ({ commit, state }, resident) => {
  commit('removeResident', resident)
}
export const finishResidents = ({ commit, state }) => {
  commit('finishResidents')
}
export const saveResidentIncome = ({ commit, state }, income) => {
  commit('saveResidentIncome', income)
}
export const finishResidentIncomes = ({ commit, state }) => {
  commit('finishResidentIncomes')
}
export const saveEnergyAccount = ({ commit, state }, account) => {
  commit('saveEnergyAccount', account)
}
export const removeEnergyAccount = ({ commit, state }, account) => {
  commit('removeEnergyAccount', account)
}
export const finishEnergyAccounts = ({ commit, state }) => {
  commit('finishEnergyAccounts')
}
export const saveEmergencies = ({ commit, state }, emergencies) => {
  commit('saveEmergencies', emergencies)
}
export const updateHeating = ({ commit, state }, primaryFuel) => {
  commit('updateHeating', primaryFuel)
}
export const saveHousing = ({ commit, state }, housing) => {
  commit('saveHousing', housing)
}
export const finishHousing = ({ commit, state }) => {
  commit('finishHousing')
}
export const updateMissingInfo = ({ commit, state }) => {
  commit('updateMissingInfo')
}
export const submitApplication = ({ commit, state }, consent) => {
  commit('submitApplication', consent)
}
export const gotoApplication = ({ commit, state }, app) => {
  commit('gotoApplication', app)
}
