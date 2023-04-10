<template>
  <div id="income" v-if="income">
    <CrumbBar :crumbs="incomeCategories" :activeStep="curCategory" :stepsCompleted="catsCompleted" :size="crumbSize"/>
    <b-container v-if="sourcesSelected === false">
      <b-row class="p-3 centered">
        <div>
          Did <strong>&nbsp;{{ labelName() }}&nbsp;</strong> have income from any of the following sources in {{ LastThreeMonths }}?
        </div>
      </b-row>
      <b-row align-h="center" class="p-1">
        <strong>(check all sources that apply)</strong>
      </b-row>
      <b-row class="pb-3">
        <b-form-group class="list">
          <b-form-checkbox
            v-for="_option in getCategoryOptions(curCategory)"
            v-model="selectedSources"
            :key="_option.type"
            :value="_option.type"
          >
            {{ _option.desc }}
            <!-- startBusinessDate -->
            <b-form-group
              class="inline"
              v-if="selectedSources.includes('SELF') && _option.type === 'SELF' && curCategory === 1"
              label="When was the business started?"
              label-cols="6"
              content-cols="6"
              label-align="right"
            >
              <b-form-input
                v-model="income.businessStartDate"
                type="text"
                placeholder="MM/DD/YYYY"
                :formatter="formatDate"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="inline"
              v-if="selectedSources.includes('SUPP-CHILD') && _option.type === 'SUPP-CHILD' && curCategory === 3"
              label="Monthly child support amount"
              label-cols="6"
              content-cols="6"
              label-align="right"
            >
              <b-form-input
                v-model="income.monthlyChildSupport"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <!-- otherSourceTypes -->
            <b-form-group
              class="inline"
              v-if="selectedSources.includes('OTHER') && _option.type === 'OTHER' && curCategory === 3"
              label="Other income type"
              label-cols="6"
              content-cols="6"
              label-align="right"
            >
              <b-form-input
                v-model="income.otherSourceTypes"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-form-checkbox>
        </b-form-group>
      </b-row>
    </b-container>
    <b-container v-if="sourcesSelected === true">
      <!-- Has Decreased -->
      <b-row class="justify-content-center pt-3">{{ labelHasDecreased() }}</b-row>
      <b-row class="justify-content-center pt-2">
        <b-form-radio-group v-model="income.hasDecreased" :options="yesno" @input="onDecreased()"/>
      </b-row>
      <b-container v-if="income.hasDecreased !== null">
        <!-- No Income -->
        <b-row v-if="income.hasIncome === false" class="justify-content-center pt-3 centered">
          If your household has no income and no one is self-employed, you will be required to verify your income and expenses.
        </b-row>
        <b-row v-if="income.hasIncome !== false" class="justify-content-center py-3">
          <strong>* The following income sources will require documentation:</strong>
        </b-row>
        <b-row
          v-for="_source in selectedSources.filter(s => sourceNeedsDoc(s))"
          :key="_source"
          class="row-attachments"
        >
        * {{ attachLabel(_source) }}
        </b-row>
      </b-container>
    </b-container>
    <!-- buttons -->
    <b-row v-if="sourcesSelected === false" align-h="center">
      <b-button v-if="curCategory > 1" @click="prevCategory" class="mr-3"><b-icon icon="arrow-left-circle" style="margin-right: 9px"/>Back: {{ backLabel() }}</b-button>
      <b-button @click="nextCategory" variant="success">Next: {{ nextLabel() }}<b-icon icon="arrow-right-circle" style="margin-left: 9px"/></b-button>
    </b-row>
    <b-row v-if="sourcesSelected === true" class="justify-content-center info-footer">
      <b-button @click="saveResidentIncome" variant="success"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Income Sources</b-button>
    </b-row>
    <!-- Modals -->
    <b-modal id="modal-wages" title="Wage Income Instructions" ok-only size="lg">
      <p>Please attach a check stub or a signed, dated statement by your employer (including employer name, address and phone number) stating gross wages.</p>
      <p>EAP may use your SSN to verify wages reported to DEED by your employer.</p>
      <p>For follow up on unreported wages, please indicate the number of employers each household member had in the past 6 months.</p>
    </b-modal>
    <b-modal id="modal-other" title="Non-Wage Income Sources" ok-only size="lg">
      <p>Other reportable income requires the following documentation for proof:</p>
      <ul>
        <li><b>MFIP, DWP, GA:</b> Statement from the county showing monthly amount or bank statements.</li>
        <li><b>Support or Alimony:</b> Check copy(ies), bank deposits, or a note signed by the payer stating the amount and dates of received payments or other proof of amount received.</li>
        <li><b>Veteran’s Benefits, Social Security, RSDI and SSI:</b> Award letters, bank statements showing direct deposits, or check copy(ies).</li>
        <li><b>Workers’ Compensation, Short Term and Long Term Disability:</b> Benefit award notice, copies of workers’ compensation or disability checks, workers’ compensation records, or attorney’s records.</li>
        <li><b>Unemployment Compensation:</b> Unemployment weekly benefit printout from www.uimn.org. Click on “Log in to My Account” and log in, go to “View and Maintain My Account,” then “Payment Information,” and enter date range for the last 5 full calendar months. EAP may verify this income directly with DEED.</li>
        <li><b>Self Employed, Farm, and Rental Income:</b> The first 2 pages of your most recent IRS-1040 tax return and Schedule 1. If you did not file taxes, call your Service Provider and ask for a Self-Employment Form. Enter the date your business started in the space provided on page 2 of the application.</li>
        <li><b>Interest, Dividend:</b> Bank statements or your IRS-1099 or IRS-1040.</li>
        <li><b>Retirement Income including IRA income:</b> Benefit checks/stubs, bank statements or award letter.</li>
        <li><b>Pensions and Annuities:</b> Benefit checks/stubs, bank statements or award letter.</li>
        <li><b>Tribal Bonus, Judgments or Per Capita Payments:</b> Benefit checks/stubs, bank statements or award letter.</li>
      </ul>
    </b-modal>
  </div>
</template>

<style scoped>
#income {
  min-height: 375px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.row-attachments {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.group-row {
  width: 100%;
}
.list {
  margin-left: 8rem;
}
.inline {
  margin-top: 1rem;
  margin-left: -3rem;
}
</style>

<script>
import { mapGetters } from 'vuex'
import CrumbBar from './CrumbBar.vue'

export default {
  name: 'Income',
  props: {
    income: null,
    resident: null,
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
    if (this.income) {
      this.selectedSources = this.income.sources.map(s => s.type)
      this.catsCompleted = !this.income.sources ? 0 : 4
    }
  },
  methods: {
    getCategoryOptions (group) {
      if (this.IncomeSources.length > 0) {
        return this.IncomeSources.filter(i => i.group === group)
      }
    },
    labelName () {
      return this.resident.firstname + ' ' + this.resident.lastname
    },
    backLabel () {
      if (this.curCategory < 2) return ''
      var source = this.incomeCategories.find(i => i.index === this.curCategory - 1)
      return source.name
    },
    nextLabel () {
      var source = this.incomeCategories.find(i => i.index === this.curCategory + 1)
      return source.name
    },
    labelHasDecreased () {
      var label = 'Did ' + this.resident.firstname + ' ' + this.resident.lastname + '\'s income decrease in the last three months?'
      return label
    },
    attachLabel (_source) {
      if (_source === 'OTHER') return 'Other (' + this.income.otherSourceTypes + ')'
      var source = this.IncomeSources.find(i => i.type === _source)
      if (source) {
        return source.desc
      }
    },
    formatDate (value) {
      var curYear = new Date().getFullYear()
      var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/)
      if (!x[2]) {
        if (x[1] / 1 > 12) return x[1][0]
      } else {
        if (x[2] / 1 > 31) {
          return x[1] + '/' + x[2][0]
        } else if (x[3] / 1 > curYear) {
          var part = x[3].slice(0, 3)
          return x[1] + '/' + x[2] + '/' + part
        }
      }
      return !x[2] ? x[1] : x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '')
    },
    checkComplete () {
      this.income.hasIncome = this.selectedSources.length > 0
      var reqDocs = this.selectedSources.filter(s => this.sourceNeedsDoc(s))
      if (this.income.sources.length >= reqDocs.length || !this.income.hasIncome) {
        this.income.isComplete = true
      }
      if (!this.income.hasIncome) this.income.sources = []
    },
    prevCategory () {
      this.curCategory -= 1
    },
    nextCategory () {
      this.curCategory += 1
      this.catsCompleted += 1
      if (this.curCategory > 3) {
        this.sourcesSelected = true
        this.checkComplete()
      }
    },
    gotoCategory (index) {
      this.curCategory = index
      if (index === 4) {
        this.sourcesSelected = true
        this.checkComplete()
      } else {
        this.sourcesSelected = false
      }
    },
    onDecreased () {
      if (this.income.hasIncome === false) {
        this.checkComplete()
      }
    },
    sourceNeedsDoc (_source) {
      var src = this.IncomeSources.find(i => i.type === _source)
      if (src) {
        return src.requiredDoc !== null
      } else {
        return true
      }
    },
    saveResidentIncome () {
      this.selectedSources.forEach(s => {
        if (this.income.sources.findIndex(is => is.type === s) === -1) {
          this.income.sources.push({ type: s })
        }
      })
      this.$store.dispatch('saveResidentIncome', { resident: this.resident, income: this.income })
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
      curCategory: 1,
      sourcesSelected: false,
      selectedSources: [],
      attachments: [[]],
      catsCompleted: 0,
      incomeCategories: [
        {
          index: 1,
          name: 'Income',
          steps: [1],
          routeTo: null,
          action: () => this.gotoCategory(1)
        },
        {
          index: 2,
          name: 'Benefits',
          steps: [2],
          routeTo: null,
          action: () => this.gotoCategory(2)
        },
        {
          index: 3,
          name: 'Other Income',
          steps: [3],
          routeTo: null,
          action: () => this.gotoCategory(3)
        },
        {
          index: 4,
          name: 'Review',
          steps: [4],
          routeTo: null,
          action: () => this.gotoCategory(4)
        }
      ]
    }
  }
}
</script>
