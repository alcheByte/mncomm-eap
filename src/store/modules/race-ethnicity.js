const _RaceEthnicityGroups =
[
  {
    group: 1,
    desc: 'American Indian/Native American/Alaska Native/Indigenous',
    sub_groups: [
      { subGroup: 1, desc: 'Anishinaabe/Ojibwe' },
      { subGroup: 2, desc: 'Cherokee' },
      { subGroup: 3, desc: 'Dakota/Lakota' },
      { subGroup: 4, desc: 'Other North American Tribal Affiliation' },
      { subGroup: 5, desc: 'Indigenous/American Indian from South or Central America' },
      { subGroup: 10, desc: 'Prefer to self-describe' },
      { subGroup: 11, desc: 'Unknown' },
      { subGroup: 0, desc: 'Prefer not to answer' }
    ]
  },
  {
    group: 2,
    desc: 'Asian',
    sub_groups: [
      { subGroup: 1, desc: 'Asian Indian' },
      { subGroup: 2, desc: 'Burmese' },
      { subGroup: 3, desc: 'Chinese' },
      { subGroup: 4, desc: 'Filipino' },
      { subGroup: 5, desc: 'Hmong' },
      { subGroup: 6, desc: 'Karen' },
      { subGroup: 7, desc: 'Korean' },
      { subGroup: 8, desc: 'Vietnamese' },
      { subGroup: 10, desc: 'Other Asian/Prefer to self-describe' },
      { subGroup: 11, desc: 'Unknown' },
      { subGroup: 0, desc: 'Prefer not to answer' }
    ]
  },
  {
    group: 3,
    desc: 'Biracial/Multiracial',
    sub_groups: []
  },
  {
    group: 4,
    desc: 'Black/African American',
    sub_groups: [
      { subGroup: 1, desc: 'African-American' },
      { subGroup: 2, desc: 'Ethiopian-Oromo' },
      { subGroup: 3, desc: 'Ethiopian-Other' },
      { subGroup: 4, desc: 'Kenyan' },
      { subGroup: 5, desc: 'Liberian' },
      { subGroup: 6, desc: 'Nigerian' },
      { subGroup: 7, desc: 'Somali' },
      { subGroup: 10, desc: 'Other Black/Prefer to self-describe' },
      { subGroup: 11, desc: 'Unknown' },
      { subGroup: 0, desc: 'Prefer not to answer' }
    ]
  },
  {
    group: 5,
    desc: 'Hispanic/Latinx',
    sub_groups: [
      { subGroup: 1, desc: 'Colombian' },
      { subGroup: 2, desc: 'Ecuadorian' },
      { subGroup: 3, desc: 'Guatemalan' },
      { subGroup: 4, desc: 'Mexican' },
      { subGroup: 5, desc: 'Puerto Rican' },
      { subGroup: 6, desc: 'Salvadoran' },
      { subGroup: 7, desc: 'Spaniard/Spanish' },
      { subGroup: 10, desc: 'Other Hispanic or Latinx/Prefer to self-describe' },
      { subGroup: 11, desc: 'Unknown' },
      { subGroup: 0, desc: 'Prefer not to answer' }
    ]
  },
  {
    group: 6,
    desc: 'Middle Eastern/North African',
    sub_groups: []
  },
  {
    group: 7,
    desc: 'Native Hawaiian/Pacific Islander',
    sub_groups: []
  },
  {
    group: 8,
    desc: 'White',
    sub_groups: []
  },
  {
    group: 10,
    desc: 'Prefer to self-describe',
    sub_groups: []
  },
  {
    group: 0,
    desc: 'Prefer not to answer',
    sub_groups: []
  }
]
// initial state
const state = () => ({
  RaceEthnicityGroups: _RaceEthnicityGroups
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
