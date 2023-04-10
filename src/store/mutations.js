import { v4 as uuidv4 } from 'uuid'

const resetLogin = (state) => {
  state.ServiceProvider = null
  state.CurrentUser = null
  state.CurrentAccount = null
  state.CurrentApplication = null
  state.EligibilityMessage = null
  state.ErrorMessage = null
  state.IsEligible = null
  state.CallToAction = null
  state.CanApplyThisYear = true
}

const last = (array) => {
  return array[array.length - 1]
}

const setCallToAction = (app) => {
  switch (app.status) {
    case 'Denied':
      return { text: app.dateCreated.getFullYear() + ' Application Denied', to: 'ApplicationSummary' }
    case 'Approved':
      return { text: app.dateCreated.getFullYear() + ' Application Approved', to: 'ApplicationSummary' }
    case 'Submitted':
      return { text: app.dateCreated.getFullYear() + ' Application Submitted', to: 'ApplicationSummary' }
    case 'In Progress':
      return { text: 'Continue ' + app.dateCreated.getFullYear() + ' Application', to: 'ApplyStep' + (app.stepsCompleted + 1) }
  }
}

export const getCounties = (state) => {
  if (state.MNCounties.length === 0) {
    var counties = state.serviceProviders.All.map(p => p.county).sort((a, b) => a.localeCompare(b))
    state.MNCounties = [...new Set(counties)]
  }
}

export const loadCountySPs = (state, county) => {
  state.ServiceProvider = null
  // console.log(spIds)
  var providers = state.serviceProviders.All.filter(sp => sp.county === county)
  // console.log(providers)
  state.CountySPs = providers.map(sp => ({ value: sp.sp_id, text: sp.organization }))
  if (state.CountySPs.length === 1) {
    selectServiceProvider(state, state.CountySPs[0].value)
  }
  // var merged = []
  // state.spCounties.All.forEach(spc => {
  //   var info = state.serviceProviders.All.find(sp => sp.sp_id === spc.sp_id)
  //   if (info) {
  //     merged.push({ id: spc.sp_id, county: spc.county, organization: spc.organization, city: info.city, contact: info.contact })
  //   } else {
  //     merged.push({ id: spc.sp_id, county: spc.county, organization: spc.organization, city: '', contact: '' })
  //   }
  // })
  // console.log(JSON.stringify(merged))
}

export const selectServiceProvider = (state, spId) => {
  state.ServiceProvider = state.serviceProviders.All.find(sp => sp.sp_id === spId)
}

export const loadIncomeSources = (state) => {
  if (state.IncomeSources.length === 0) {
    state.IncomeSources = state.incomeSources.All
  }
}

export const loadIdentityTypes = (state) => {
  if (state.IdentityTypes.length === 0) {
    state.IdentityTypes = state.identityTypes.All
  }
}

export const signOn = (state, params) => {
  resetLogin(state)
  var curYear = 2021
  var user = state.users.All.find(u => u.email === params.email)
  if (user) {
    state.CurrentUser = user
    var account = state.accounts.All.find(a => a.userid === user.userid)
    if (account) {
      state.CurrentAccount = account
      if (account.applications.length > 0) {
        var lastApp = last(account.applications)
        if (lastApp.addresses && lastApp.addresses.primary) {
          loadCountySPs(state, lastApp.addresses.primary.county)
        }
        state.CanApplyThisYear = lastApp.dateCreated.getFullYear() !== curYear
        if (state.CanApplyThisYear) {
          state.CallToAction = { text: 'Apply for ' + curYear, to: 'Apply' }
        } else {
          state.CallToAction = setCallToAction(lastApp)
        }
        state.CurrentApplication = lastApp
      } else {
        state.CallToAction = { text: 'Apply for ' + curYear, to: 'Apply' }
      }
    }
  } else {
    state.CurrentUser = null
    state.ErrorMessage = 'Unable to authenticate ' + params.email + ' with supplied password'
  }
  loadIdentityTypes(state)
  loadIncomeSources(state)
}

export const signOut = (state) => {
  resetLogin(state)
}

export const createAccount = (state, params) => {
  state.ErrorMessage = ''
  // create user
  var userid = uuidv4()
  var user = {
    email: params.email,
    password: params.password,
    userid: userid
  }
  state.users.All.push(user)
  state.CurrentUser = user
  // create account
  var account = {
    userid: state.CurrentUser.userid,
    dateCreated: Date.now(),
    eligible: state.IsEligible
  }
  state.accounts.All.push(account)
  state.CurrentAccount = account
  loadCountySPs(state, params.county)
  loadIdentityTypes(state)
  loadIncomeSources(state)
}

export const createApplication = (state, params) => {
  // update account contact
  state.CurrentAccount.contact = {
    firstname: params.applicant.firstname,
    lastname: params.applicant.lastname
  }
  // create initial application
  var application = {
    dateCreated: Date.now(),
    addresses: null,
    residents: [
      {
        ...params.applicant,
        isApplicant: true
      }
    ],
    energy: {
      usageElectric: null,
      usageBioFuels: null,
      usageFossilFuels: null,
      usageDistributed: null
    },
    stepsCompleted: 2
  }
  state.CurrentApplication = application
  state.CurrentAccount.applications = [ application ]
  state.UserIsAR = params.userIsAR
}

export const updateApplicant = (state, applicant) => {
  if (state.CurrentApplication) {
    var index = state.CurrentApplication.residents.findIndex(a => a.isApplicant)
    if (index !== -1) {
      state.CurrentApplication.residents[index] = applicant
    }
  }
}

export const updateAddresses = (state, addresses) => {
  if (state.CurrentApplication) {
    if (addresses.primary) {
      loadCountySPs(state, addresses.primary.county)
    }
    state.CurrentApplication.addresses = addresses
    state.CurrentApplication.stepsCompleted = Math.max(3, state.CurrentApplication.stepsCompleted)
  }
}

export const addResident = (state, resident) => {
  if (state.CurrentApplication) {
    resident.id = uuidv4()
    state.CurrentApplication.residents.push(resident)
  }
}

export const saveResident = (state, resident) => {
  if (state.CurrentApplication) {
    if (resident.id) {
      var index = state.CurrentApplication.residents.findIndex(r => r.id === resident.id)
      if (index !== -1) {
        state.CurrentApplication.residents[index] = resident
        return
      }
    } else {
      resident.id = uuidv4()
    }
    state.CurrentApplication.residents.push(resident)
  }
}

export const removeResident = (state, resident) => {
  if (state.CurrentApplication) {
    var index = state.CurrentApplication.residents.findIndex(a => a.id === resident.id)
    if (index !== -1) {
      state.CurrentApplication.residents.splice(index, 1)
    }
  }
}

export const finishResidents = (state) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.stepsCompleted = Math.max(4, state.CurrentApplication.stepsCompleted)
  }
}

export const saveResidentIncome = (state, params) => {
  if (state.CurrentApplication) {
    var resident = state.CurrentApplication.residents.find(a => a.id === params.resident.id)
    if (resident) {
      // params.income.total = params.income.wages.sum(w => w.amount) + params.income.wages.sum(w => w.amount)
      resident.income = {...params.income}
    }
  }
}

export const finishResidentIncomes = (state) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.stepsCompleted = Math.max(5, state.CurrentApplication.stepsCompleted)
  }
}

export const saveEnergyAccount = (state, account) => {
  if (state.CurrentApplication && state.CurrentApplication.energyAccounts) {
    if (!account.id) {
      account.id = uuidv4()
    }
    var index = state.CurrentApplication.energyAccounts.findIndex(a => a.id === account.id)
    if (index !== -1) {
      state.CurrentApplication.energyAccounts[index] = {...account}
    } else {
      state.CurrentApplication.energyAccounts.push({...account})
    }
  } else {
    account.id = uuidv4()
    state.CurrentApplication.energyAccounts = [ {...account} ]
  }
}

export const removeEnergyAccount = (state, account) => {
  if (state.CurrentApplication && state.CurrentApplication.energyAccounts) {
    var index = state.CurrentApplication.energyAccounts.findIndex(a => a.id === account.id)
    if (index !== -1) {
      state.CurrentApplication.energyAccounts.splice(index, 1)
    }
  }
}

export const finishEnergyAccounts = (state) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.stepsCompleted = Math.max(6, state.CurrentApplication.stepsCompleted)
  }
}

export const saveEmergencies = (state, emergencies) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.emergencies = {...emergencies}
    state.CurrentApplication.stepsCompleted = Math.max(7, state.CurrentApplication.stepsCompleted)
  }
}

export const updateHeating = (state, primaryFuel) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.primaryFuel = primaryFuel
    state.CurrentApplication.stepsCompleted = Math.max(8, state.CurrentApplication.stepsCompleted)
  }
}

export const saveHousing = (state, housing) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.housing = {...housing}
  }
}

export const finishHousing = (state) => {
  if (state.CurrentApplication) {
    state.CurrentApplication.stepsCompleted = Math.max(9, state.CurrentApplication.stepsCompleted)
  }
}

const sourceNeedsDoc = (state, _type) => {
  loadIncomeSources(state)
  var src = state.IncomeSources.find(i => i.type === _type)
  if (src) {
    return src.requiredDoc != null
  } else {
    return true
  }
}

const incomeSourceDescription = (state, _type) => {
  var src = state.IncomeSources.find(i => i.type === _type)
  if (src) {
    return src.desc
  } else {
    return _type
  }
}

const _newIssue = (id, desc, resID, section, needsDoc, type, isCritical) => {
  return { id: id, desc: desc, resId: resID, section: section, needsDoc: needsDoc, type: type, severity: isCritical ? 'critical' : 'required' }
}
const _residentFullName = (res) => {
  return res.firstname + ' ' + (res.middlename ? res.middlename + ' ' + res.lastname : res.lastname)
}

export const updateMissingInfo = (state) => {
  if (state.CurrentApplication) {
    var missingInfo = []
    state.CurrentApplication.residents.forEach(res => {
      // identity
      if (!res.idenType) {
        var info = 'A valid form of identity will be required for ' + res.firstname
        missingInfo.push(_newIssue(missingInfo.length, info, res.id, 'HOUSEHOLD', false, '', true))
      } else if (!res.idenNumber) {
        var info2 = res.idenType + (res.idenType !== 'SSN' ? ' ID number' : '') + ' will be required for ' + _residentFullName(res)
        missingInfo.push(_newIssue(missingInfo.length, info2, res.id, 'HOUSEHOLD', false, '', true))
      } else if (res.idenType !== 'SSN' && !res.idenDocuments) {
        var idType = state.IdentityTypes.find(it => it.type === res.idenType)
        var info3 = _residentFullName(res) + ' - a ' + idType.requiredDoc + ' is required for proof of identity'
        missingInfo.push(_newIssue(missingInfo.length, info3, res.id, 'HOUSEHOLD', true, res.idenType))
      }
      // income
      if (res.income && res.income.hasIncome !== null) {
        if (res.hasIncome === false) return null
        if (res.income.sources && res.income.sources.length > 0) {
          var missingDocs = res.income.sources.filter(s => sourceNeedsDoc(state, s.type) &&
              (!s.attachments || s.attachments.length === 0))
          missingDocs.forEach(src => {
            var info = 'Missing ' + incomeSourceDescription(state, src.type) + ' documentation for ' + _residentFullName(res)
            missingInfo.push(_newIssue(missingInfo.length, info, res.id, 'INCOME', true, src.type))
          })
        }
      } else {
        var infoIncome = 'Income information is required for ' + _residentFullName(res)
        missingInfo.push(_newIssue(missingInfo.length, infoIncome, res.id, 'INCOME', false, '', true))
      }
    })
    state.CurrentApplication.missingInfo = missingInfo
  }
}

export const submitApplication = (state, consent) => {
  if (state.CurrentApplication) {
    // state.CurrentApplication.consent = consent
    state.CurrentApplication.status = 'Submitted'
    state.CurrentApplication.stepsCompleted = Math.max(9, state.CurrentApplication.stepsCompleted)
  }
}

export const gotoApplication = (state, app) => {
  state.CurrentApplication = app
  if (app.addresses && app.addresses.primary) {
    loadCountySPs(state, app.addresses.primary.county)
  }
}

export const errorMsg = (state, msg) => {
  state.ErrorMessage = msg
}
