const _IdentityTypes =
[
  {
    type: 'SSN',
    desc: 'Social Security Number (SSN)',
    requiredDoc: null,
    info: null
  },
  {
    type: 'I-551',
    desc: 'Form I-551, Permanent Resident Card or Alien Registration Receipt Card',
    requiredDoc: 'Form I-551',
    info: null
  },
  {
    type: 'I-94',
    desc: 'Form I-94, US Customs and Border Patrol',
    requiredDoc: 'Form I-94',
    info: null
  },
  {
    type: 'I-766',
    desc: 'Form I-766, Employment Authorization Document Card',
    requiredDoc: 'Form I-766',
    info: null
  },
  {
    type: 'I-197',
    desc: 'Form I-197, U.S. Citizen Identification Card',
    requiredDoc: 'Form I-197',
    info: null
  },
  {
    type: 'I-179',
    desc: 'Form I-179, Identification Card for Use of Resident Citizen in the United States',
    requiredDoc: 'Form I-179',
    info: null
  }
]
// initial state
const state = () => ({
  All: _IdentityTypes
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
