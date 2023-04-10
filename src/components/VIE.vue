<template>
  <div id="vie">
    <CrumbBar :crumbs="crumbs" :activeStep="curCrumb" :stepsCompleted="catsCompleted" :size="crumbSize"/>
    <b-container v-if="curCrumb === 1">
      <b-row class="p-3 centered">
          List your monthly bills:
      </b-row>
      <b-row align-h="center" class="pb-3">
        <b-col>
          <b-form-group
            v-for="_bill in billsLeft"
            :key="_bill.name"
            :label="_bill.name"
            label-cols="8"
            content-cols="4"
            label-align="center"
          >
            <b-form-input v-model="_bill.amount"/>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            v-for="_bill in billsRight"
            :key="_bill.name"
            :label="_bill.name"
            label-cols="8"
            content-cols="4"
            label-align="center"
          >
            <b-form-input v-model="_bill.amount"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-3 centered">
          How have you paid your monthly bills?
      </b-row>
      <b-row class="p-3">
        <b-form-input v-model="VIE.Expenses.paymentDescription" required placeholder="Please describe how you pay your bills" class="describe"/>
      </b-row>
    </b-container>
    <b-container v-if="curCrumb === 2">
      <b-row class="p-3 centered">
          Payments made by others to provide support for your household are considered income.
      </b-row>
      <b-row class="p-3 centered">
          If someone helped pay your bills in the 3 months listed above, list their name, address and phone number below:
      </b-row>
      <b-row class="p-3">
        <b-form-input v-model="VIE.Income.helpFromOthers" required placeholder="Enter gifts here" class="describe"/>
      </b-row>
      <b-row class="p-3 centered">
          When did the unemployed members of the household last work?
      </b-row>
      <b-row >
        <b-form-group
          v-for="_member in getUnemployedMembers()"
          :key="_member.id"
          :label="residentLabel(_member)"
          label-cols="8"
          content-cols="4"
          label-align="right"
        >
          <b-form-input v-model="VIE.Income.lastEmployed[_member.id]" :formatter="formatLastEmployed" placeholder="MM/YYYY"/>
        </b-form-group>
      </b-row>
    </b-container>
    <!-- buttons -->
    <b-row v-if="curCrumb === 1" align-h="center">
      <b-button @click="gotoCrumb(2)" variant="success">Next: Verify Income<b-icon icon="arrow-right-circle" style="margin-left: 9px"/></b-button>
    </b-row>
    <b-row v-if="curCrumb === 2" class="justify-content-center info-footer">
      <b-button @click="saveVIE" variant="success"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Expenses and Income Verification</b-button>
    </b-row>
    <!-- Modals -->
  </div>
</template>

<style scoped>
#vie {
  min-height: 375px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.group-row {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.describe {
  height: 120px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import CrumbBar from './CrumbBar.vue'

export default {
  name: 'VIE',
  props: {
    onComplete: null
  },
  components: { CrumbBar },
  computed: {
    ...mapGetters([
      'CurrentApplication',
      'LastThreeMonths',
      'IncomeSources'
    ])
  },
  created () {
  },
  methods: {
    gotoCrumb (index) {
      this.curCrumb = index
    },
    getUnemployedMembers () {
      var unemployed = this.CurrentApplication.residents.filter(r => this.isMinor(r) === false && this.isRetiree(r) === false)
      return unemployed
    },
    residentLabel (resident) {
      var label = resident.firstname + ' ' + resident.lastname
      if (resident.dateofbirth) {
        label += ', Age ' + this._calculateAge(resident.dateofbirth)
      }
      return label
    },
    formatLastEmployed (value) {
      var curYear = new Date().getFullYear()
      var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})/)
      if (!x[2]) {
        if (x[1] / 1 > 12) return x[1][0]
      } else {
        if (x[2] / 1 > curYear) {
          var part = x[2].slice(0, 3)
          return x[1] + '/' + part
        }
      }
      return !x[2] ? x[1] : x[1] + '/' + x[2]
    },
    isMinor (resident) {
      if (!resident) return false
      var age = this._calculateAge(resident.dateofbirth)
      return age < 18
    },
    isRetiree (resident) {
      if (!resident) return false
      var age = this._calculateAge(resident.dateofbirth)
      return age > 64
    },
    _calculateAge (birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    saveVIE () {
      this.$store.dispatch('saveVIE', this.VIE)
      if (this.onComplete) this.onComplete()
    }
  },
  data () {
    return {
      yesno: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      crumbSize: 'small',
      curCrumb: 1,
      catsCompleted: 0,
      VIE: {
        Expenses: {
          paymentDescription: '',
          isComplete: false
        },
        Income: {
          helpFromOthers: '',
          lastEmployed: [],
          isComplete: false
        }
      },
      billsLeft: [
        {
          name: 'Rent/Mortgage',
          amount: 0.0
        },
        {
          name: 'Food',
          amount: 0.0
        },
        {
          name: 'Heat',
          amount: 0.0
        },
        {
          name: 'Electric',
          amount: 0.0
        },
        {
          name: 'Phone/Cell',
          amount: 0.0
        }
      ],
      billsRight: [
        {
          name: 'Car Payment/Insurance',
          amount: 0.0
        },
        {
          name: 'Gas',
          amount: 0.0
        },
        {
          name: 'Cable/Internet',
          amount: 0.0
        },
        {
          name: 'Personal Items',
          amount: 0.0
        },
        {
          name: 'Other Expenses',
          amount: 0.0
        }
      ],
      crumbs: [
        {
          index: 1,
          name: 'Expenses',
          steps: [1],
          routeTo: null,
          action: () => this.gotoCrumb(1)
        },
        {
          index: 2,
          name: 'Income',
          steps: [2],
          routeTo: null,
          action: () => this.gotoCrumb(2)
        }
      ]
    }
  }
}
</script>
