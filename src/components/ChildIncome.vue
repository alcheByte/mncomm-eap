<template>
  <div id="income-child" v-if="income">
    <CrumbBar :crumbs="crumbs" :activeStep="curCrumb" :stepsCompleted="catsCompleted" :size="crumbSize"/>
    <b-container v-if="sourcesSelected === false">
      <b-row class="p-3 centered">
        <div>
          Did <strong>&nbsp;{{ labelName() }}&nbsp;</strong> have income from any of the following sources in {{ LastThreeMonths }}?
        </div>
      </b-row>
      <b-row align-h="center" class="p-1">
        <strong>(check all sources that apply)</strong>
      </b-row>
      <b-row align-h="center" class="pb-3">
        <b-form-group>
          <b-form-checkbox
            v-for="_option in getChildOptions()"
            v-model="selectedSources"
            :key="_option.type"
            :value="_option.type"
          >
            {{ _option.desc }}
          </b-form-checkbox>
        </b-form-group>
      </b-row>
    </b-container>
    <b-container v-if="sourcesSelected === true">
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
    <!-- buttons -->
    <b-row v-if="sourcesSelected === false" align-h="center">
      <b-button @click="gotoCrumb(2)" variant="success">Next: Review<b-icon icon="arrow-right-circle" style="margin-left: 9px"/></b-button>
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
</style>

<script>
import { mapGetters } from 'vuex'
import CrumbBar from './CrumbBar.vue'

export default {
  name: 'ChildIncome',
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
    }
  },
  methods: {
    getChildOptions () {
      if (this.IncomeSources.length > 0) {
        return this.IncomeSources.filter(i => i.isMinor)
      }
    },
    labelName () {
      return this.resident.firstname + ' ' + this.resident.lastname
    },
    attachLabel (_source) {
      if (_source === 'OTHER') return 'Other (' + this.income.otherSourceTypes + ')'
      var source = this.IncomeSources.find(i => i.type === _source)
      if (source) {
        return source.desc
      }
    },
    checkComplete () {
      this.income.hasIncome = this.selectedSources.length > 0
      var reqDocs = this.selectedSources.filter(s => this.sourceNeedsDoc(s))
      if (this.income.sources.length === reqDocs.length || !this.income.hasIncome) {
        this.income.isComplete = true
      }
    },
    gotoCrumb (index) {
      this.curCrumb = index
      if (index === 2) {
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
    convertAttachment (fso) {
      return fso.map(fo => ({ fileName: fo.name, fileType: fo.type, fileSize: fo.size }))
    },
    attachIncome (_source) {
      var src = this.income.sources.find(i => i.type === _source)
      if (src) {
        src.attachments = this.convertAttachment(this.attachments[_source])
      } else {
        var newSrc = {
          type: _source,
          attachments: this.convertAttachment(this.attachments[_source])
        }
        this.income.sources.push(newSrc)
      }
      this.checkComplete()
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
      // persist source for missing sources that don't require documentation, probably better to handle this upstream somewhere
      this.selectedSources.filter(s => !this.sourceNeedsDoc(s)).forEach(s => {
        if (this.income.sources.findIndex(is => is.type === s) === -1) {
          this.income.sources.push({ type: s })
        }
      })
      if (!this.income.hasIncome) this.income.sources = []
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
      curCrumb: 1,
      sourcesSelected: false,
      selectedSources: [],
      attachments: [[]],
      catsCompleted: 0,
      crumbs: [
        {
          index: 1,
          name: 'Benefits',
          steps: [1],
          routeTo: null,
          action: () => this.gotoCrumb(1)
        },
        {
          index: 2,
          name: 'Review',
          steps: [2],
          routeTo: null,
          action: () => this.gotoCrumb(2)
        }
      ]
    }
  }
}
</script>
