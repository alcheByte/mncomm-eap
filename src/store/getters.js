// getters
export const CountySPs = state => state.CountySPs
export const MNCounties = state => state.MNCounties
export const ServiceProvider = state => state.ServiceProvider
export const RaceEthnicityGroups = state => state.raceEthnicity.RaceEthnicityGroups
export const IdentityTypes = state => state.IdentityTypes
export const IncomeSources = state => state.IncomeSources
export const VendorFuels = state => state.vendorFuels.All
export const CurrentUser = state => state.CurrentUser
export const CurrentAccount = state => state.CurrentAccount
export const CurrentApplication = state => state.CurrentApplication
export const CallToAction = state => state.CallToAction
export const CanApplyThisYear = state => state.CanApplyThisYear
export const IsEligible = state => state.IsEligible
export const EligibilityMessage = state => state.EligibilityMessage
export const ErrorMessage = state => state.ErrorMessage

export const UserIsAuthenticated = state => {
  return state.CurrentUser !== null && state.CurrentUser !== undefined
}

export const SPEnergyProviders = (state) => {
  if (state.ServiceProvider) {
    var spEnergy = state.energyProviders.All.filter(p => p.sp_id === state.ServiceProvider.sp_id)
    var withFuels = spEnergy.filter(v => state.vendorFuels.All.filter(vf => vf.vendor_id === v.vendor_id).length > 0)
    return withFuels
  }
  return null
}

export const HasError = state => {
  return state.ErrorMessage && state.ErrorMessage !== ''
}

export const LastThreeMonths = state => {
  return 'June 2021, July 2021 and/or August 2021'
}
