const _Accounts = [
  {
    userid: 'f38dac52-7fd0-4ca3-a03c-d5609aa60268',
    dateCreated: new Date('2020-01-27'),
    eligible: null,
    contact: {
      firstname: 'User',
      lastname: 'Scenario_2'
    },
    applications: [
      {
        id: '0d0ec60f-1ce2-4dfd-9f02-ee1a37eb63b8',
        status: 'Denied',
        dateCreated: new Date('2019-02-02'),
        AR: null,
        addresses: {
          hasMailing: false,
          primary: {
            line1: '2117 15th St',
            line2: '',
            city: 'Saint Cloud',
            state: 'MN',
            zipcode: '56304',
            county: 'Sherburne'
          },
          mailing: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          },
          isSAH: false
        },
        residents: [
          {
            id: 'd9551fcd-8a1a-47c5-92b6-701213efaa77',
            firstname: 'User',
            lastname: 'Scenario_2',
            dateofbirth: new Date('1967-11-05'),
            ssn: '123-45-6789',
            isApplicant: true
          }
        ],
        stepsCompleted: 4
      },
      {
        id: '2f5bad70-a1da-4d85-ab53-169b6ea84625',
        status: 'Approved',
        dateCreated: new Date('2020-03-02'),
        AR: null,
        addresses: {
          hasMailing: false,
          primary: {
            line1: '2117 15th St',
            line2: '',
            city: 'Saint Cloud',
            state: 'MN',
            zipcode: '56304',
            county: 'Sherburne'
          },
          mailing: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          },
          isSAH: false
        },
        residents: [
          {
            id: 'e805dffc-90b7-4513-be01-63b3aae9b0ff',
            firstname: 'User',
            lastname: 'Scenario_2',
            dateofbirth: new Date('1967-11-05'),
            ssn: '123-45-6789',
            race: 'W',
            isApplicant: true
          }
        ],
        stepsCompleted: 4
      },
      {
        status: 'Submitted',
        dateCreated: new Date('2021-03-13'),
        AR: null,
        addresses: {
          hasMailing: false,
          primary: {
            line1: '2117 15th St',
            line2: '',
            city: 'Saint Cloud',
            state: 'MN',
            zipcode: '56304',
            county: 'Sherburne'
          },
          mailing: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          },
          isSAH: false
        },
        residents: [
          {
            id: 'e805dffc-90b7-4513-be01-63b3aae9b0ff',
            firstname: 'User',
            lastname: 'Scenario_2',
            dateofbirth: new Date('1967-11-05'),
            ssn: '123-45-6789',
            isApplicant: true
          }
        ],
        stepsCompleted: 9
      }
    ]
  },
  {
    userid: 'e81d7cfc-9561-48fa-a35f-93f2fc6e143c',
    dateCreated: new Date('2020-02-27'),
    eligible: null,
    contact: {
      firstname: 'Fred',
      lastname: 'Flintstone'
    },
    applications: [
      {
        'id': '6db767a9-76dc-4a90-b6fe-c88af192257f',
        'status': 'In Progress',
        'dateCreated': new Date('2021-02-02'),
        'AR': null,
        'addresses': {
          'hasMailing': false,
          'primary': {
            'line1': '2117 15th St',
            'line2': '',
            'city': 'Saint Cloud',
            'state': 'MN',
            'zipcode': '56304',
            'county': 'Sherburne'
          },
          'mailing': {
            'line1': '',
            'line2': '',
            'city': '',
            'state': 'MN',
            'zipcode': '',
            'county': ''
          },
          'isSAH': false
        },
        'residents': [{
          'id': 'ce194c3b-3165-49f9-a8ba-4781b9630ed6',
          'firstname': 'Fred',
          'lastname': 'Flintstone',
          'idenType': 'I-766',
          'idenNumber': 'DFJ1223452362',
          'dateofbirth': new Date('1967-11-05'),
          'phonenumber': '(321)654-0987',
          'race': 'Cuban',
          'gender': 'M',
          'isApplicant': true,
          'income': {
            'businessStartDate': '11/02/2016',
            'hasDecreased': false,
            'hasIncome': true,
            'isComplete': true,
            'sources': [{
              'type': 'SELF',
              'attachments': [{
                'id': 'f4177125-ad62-46f0-9d04-ed9b9a7d7e8c',
                'origName': 'income-frm.pdf',
                'fileType': 'application/pdf',
                'fileSize': 0,
                'section': 'INCOME',
                'type': 'SELF',
                'resId': 'ce194c3b-3165-49f9-a8ba-4781b9630ed6'
              }]
            }]
          }
        }, {
          'id': '13318907-a484-48d3-8118-76b07955106a',
          'firstname': 'Wilma',
          'lastname': 'Flintstone',
          'idenType': 'I-94',
          'idenNumber': '123456789R5',
          'dateofbirth': new Date('1970-04-20'),
          'race': 'Cuban',
          'gender': 'F',
          'isApplicant': false,
          'income': {
            'hasDecreased': false,
            'hasIncome': true,
            'isComplete': true,
            'sources': [{
              'type': 'WAGES',
              'attachments': [{
                'id': '7bdbfad3-b5d2-4a8f-a3cd-4154c5d14574',
                'origName': 'income-salary.pdf',
                'fileType': 'application/pdf',
                'fileSize': 0,
                'section': 'INCOME',
                'type': 'WAGES',
                'resId': '13318907-a484-48d3-8118-76b07955106a'
              }]
            }]
          }
        }],
        'stepsCompleted': 9,
        'energyAccounts': [{
          'vendor_id': 2217,
          'vendor_name': 'Xcel Energy',
          'accountNumber': '23462457',
          'accountName': 'Fred Flintstone',
          'fuels': ['Natural Gas', 'Electricity'],
          'id': '8605d5b2-ee5b-4438-8459-70d15bd66967'
        }],
        'primaryFuel': 'Natural Gas',
        'housing': {
          'type': 'house',
          'isComplete': true,
          'residencyYears': '3',
          'residencyMonths': null,
          'ownership': 'own',
          'rent': {
            'includes': [],
            'monthlyAmount': '1250',
            'subsidized': false,
            'landlord': {
              'name': 'Ted Bundy',
              'address': {
                'line1': '123 Willow Ave',
                'line2': '',
                'city': 'Bethusda',
                'state': 'MN',
                'zipcode': '56478',
                'county': ''
              }
            }
          },
          'own': {
            'mortgage': '1450',
            'rented': 'not-rented',
            'usedForBusiness': 'none',
            'heatNotWorking': true
          }
        }
      }
    ],
    coorespondence: [
      {
        applicant_name: 'Fred Flintstone',
        type: 'Request for Additional Information',
        dateCreated: new Date('2021-11-03')
      }
    ]
  },
  {
    userid: '9f94e97b-5a0a-497d-9500-4b77f871f48e',
    dateCreated: new Date('2020-01-27'),
    eligible: null,
    contact: {
      firstname: 'User',
      lastname: 'Scenario_6'
    },
    applications: []
  },
  {
    userid: 'c1bfbbd2-d5e0-4d25-906f-98d619218b1c',
    dateCreated: new Date('2020-01-27'),
    eligible: null,
    contact: {
      firstname: 'User',
      lastname: 'Scenario_7'
    },
    applications: [
      {
        id: '399132d8-a4cd-41a2-bdfc-4a7d9e48dbf3',
        status: 'Submitted',
        dateCreated: new Date('2021-02-02'),
        AR: null,
        addresses: {
          hasMailing: false,
          primary: {
            line1: '2117 15th St',
            line2: '',
            city: 'Saint Cloud',
            state: 'MN',
            zipcode: '56304',
            county: 'Sherburne'
          },
          mailing: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          },
          isSAH: false
        },
        residents: [
          {
            id: 'a6d94168-0d04-4045-acc8-6f2d94fb962c',
            firstname: 'User',
            lastname: 'Scenario_7',
            dateofbirth: new Date('1967-11-05'),
            ssn: '123-45-6789',
            race: 'A',
            isApplicant: true
          }
        ],
        stepsCompleted: 9
      }
    ]
  },
  {
    userid: '544d70ce-6788-4563-8968-37841c7df242',
    dateCreated: new Date('2021-01-27'),
    eligible: null,
    contact: {
      firstname: 'User',
      lastname: 'Scenario_8'
    },
    applications: [
      {
        id: '54dab115-a000-4ae8-8b00-e72fd306b544',
        status: 'Approved',
        dateCreated: new Date('2020-02-02'),
        AR: null,
        addresses: {
          hasMailing: false,
          primary: {
            line1: '2117 15th St',
            line2: '',
            city: 'Saint Cloud',
            state: 'MN',
            zipcode: '56304',
            county: 'Sherburne'
          },
          mailing: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          },
          isSAH: false
        },
        residents: [
          {
            id: 'ec8c5e8d-8269-441c-a756-43ebc655d13f',
            firstname: 'User',
            lastname: 'Scenario_8',
            dateofbirth: new Date('1967-11-05'),
            ssn: '123-45-6789',
            race: 'M',
            isApplicant: true
          }
        ],
        stepsCompleted: 9
      }
    ]
  },
  {
    userid: '3cb43589-e10e-434e-9da9-6b44f82bb905',
    dateCreated: new Date('2020-01-27'),
    eligible: null,
    contact: {
      firstname: 'User',
      lastname: 'Scenario_9'
    },
    applications: [
      {
        id: '57b8d163-d7ce-4915-a66d-d5f01107ed50',
        status: 'Denied',
        dateCreated: new Date('2020-02-02'),
        AR: null,
        addresses: {
          hasMailing: false,
          primary: {
            line1: '2117 15th St',
            line2: '',
            city: 'Saint Cloud',
            state: 'MN',
            zipcode: '56304',
            county: 'Sherburne'
          },
          mailing: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          },
          isSAH: false
        },
        residents: [
          {
            id: '56f3ab8a-be97-45b1-987d-328fbc55ed52',
            firstname: 'User',
            lastname: 'Scenario_9',
            dateofbirth: new Date('1967-11-05'),
            ssn: '123-45-6789',
            race: 'P',
            isApplicant: true
          }
        ],
        stepsCompleted: 9
      }
    ]
  }
]

// initial state
const state = () => ({
  All: _Accounts
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
