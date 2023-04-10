const _IncomeSources = [
  {
    group: 1,
    type: 'WAGES',
    desc: 'Wages (including cash for hourly labor)',
    title: 'Wages',
    isMinor: false,
    requiredDoc: 'IRS Form W-9'
  },
  {
    group: 1,
    type: 'SELF',
    desc: 'Self-employment Income/Farm Income',
    title: 'Self-employment Income',
    isMinor: false,
    requiredDoc: 'IRS Form 1040/40EZ'
  },
  {
    group: 1,
    type: 'RENT',
    desc: 'Rental Income',
    title: 'Rental Income',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 1,
    type: 'UNEMPCOMP',
    desc: 'Unemployment Compensation',
    title: 'Unemployment Compensation',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 1,
    type: 'WORKCOMP',
    desc: 'Workers Compensation',
    title: 'Workers Compensation',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 1,
    type: 'INTDIV',
    desc: 'Interest or Dividend Income',
    title: 'Interest/Dividend Income',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 1,
    type: 'DEED',
    desc: 'Contract for Deed Interest',
    title: 'Deed Interest',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'DWP',
    desc: 'Diversionary Work (DWP)',
    title: 'Diversionary Work',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'VETBEN',
    desc: 'Veterans Benefits',
    title: 'Veterans Benefits',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'SSI',
    desc: 'Supplemental Security Income  (SSI)',
    title: 'Supplemental Security Income',
    isMinor: true,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'SSB',
    desc: 'Social Security Benefits (SSDI,RSDI,SSA)',
    title: 'Social Security Benefits',
    isMinor: true,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'RETIRE',
    desc: 'Retirement Income (including IRAs)',
    title: 'Retirement Income',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'PENSION',
    desc: 'Pension / Annuity (including quarterly & annual)',
    title: 'Pension/Annuity',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'TRIBAL-PER',
    desc: 'Tribal Per Capita Income',
    title: 'Tribal Income',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'TRIBAL-BONUS',
    desc: 'Tribal Judgments or Tribal Bonus',
    title: 'Tribal Judgment/Bonus',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'DISABILITY',
    desc: 'Long / Short-term Disability',
    title: 'Disability',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'MFIP',
    desc: 'MFIP',
    title: 'MFIP',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'GA',
    desc: 'General Assistance (GA)',
    title: 'General Assistance',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 2,
    type: 'SPOUSAL',
    desc: 'Alimony or Spousal Support',
    title: 'Alimony/Spousal Support',
    isMinor: false,
    requiredDoc: 'Form ???'
  },
  {
    group: 3,
    type: 'SUPP-CHILD',
    desc: 'Child Support (is not income)',
    title: 'Child Support',
    isMinor: false,
    requiredDoc: null
  },
  {
    group: 3,
    type: 'SUPP-FOOD',
    desc: 'Food Support',
    title: 'Food Support',
    isMinor: false,
    requiredDoc: null
  },
  {
    group: 3,
    type: 'EITC',
    desc: 'Earned Income Tax Credit',
    title: 'Earned Income Tax Credit',
    isMinor: false,
    requiredDoc: null
  },
  {
    group: 3,
    type: 'OTHER',
    desc: 'Other income not listed',
    title: '',
    isMinor: false,
    requiredDoc: 'Form ???'
  }
]

// initial state
const state = () => ({
  All: _IncomeSources
})

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
