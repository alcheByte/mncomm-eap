<template>
  <div id="applystep5" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
        <ApplicationStatus :curStep="5" />
      </template>
      <b-form @submit="onUpdateIncome" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-income icon="info-circle" class="title-icon"/>Household Income</h3></div>
          </b-row>
          <b-row class="pb-3" no-gutters>
            <p class="sub-title center-h">We’ll need to know about any wages, benefits, retirement, or other income received by each member of your household.</p>
          </b-row>
          <Incomes :residents="CurrentApplication.residents" :onSaveIncome="updateMissingInfo" :editId="editId"/>
          <b-row v-if="noHouseholdIncome" class="justify-content-center pb-3">
            <b-button @click="verifyIncome" variant="success"><b-icon icon="plus-circle" style="margin-right: 9px;"/>Verify Income and Expenses</b-button>
          </b-row>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :disableSubmit="!allCompleted" :backLabel="backLabel" :backTo="backTo" />
      </b-form>
    </b-card>
    <!-- Modals -->
    <b-modal id="modal-vie" v-model="showVIE" title="Verify Income and Expenses" hide-footer size="lg">
      <VIE :onComplete="vieCompleted" class="p-3 mb-4"/>
    </b-modal>
    <b-modal id="modal-income" title="Income Instructions:" ok-only size="lg">
      <b-container>
        <p>Enter all income and all money received by each household member in the last 3 full calendar months.</p>
        <p><b>ATTACH PROOF OF ALL GROSS INCOME</b>, received by all people in your household in the <b>last 3 full calendar months</b>.</p>
        <p>Wages for children in grades K-12 are not counted.</p>
        <p>*If self-employed, attach first 2 pages of your most recent IRS-1040 tax return and schedule 1. Contact your Service Provider if you have not filed a 1040 since self-employment started.</p>
        <p>Your application will be delayed if you do not include proof of income.</p>
        <div class="subtext">
          <p>Attach proof of gross income received in <b>{{ LastThreeMonths }}</b></p>
          <p>Household income cannot be more than these income guidelines for the most recent 3 months:</p>
          <table>
            <thead>
              <th>Household Size</th>
              <th>3 Months Income</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>$7,066</td>
              </tr>
              <tr>
                <td>2</td>
                <td>$9,240</td>
              </tr>
              <tr>
                <td>3</td>
                <td>$11,415</td>
              </tr>
              <tr>
                <td>4</td>
                <td>$13,589</td>
              </tr>
              <tr>
                <td>5</td>
                <td>$15,763</td>
              </tr>
              <tr>
                <td>6</td>
                <td>$17,937</td>
              </tr>
              <tr>
                <td>7</td>
                <td>$18,345</td>
              </tr>
              <tr>
                <td>8</td>
                <td>$18,753</td>
              </tr>
              <tr>
                <td>9</td>
                <td>$19,160</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationStatus from '../components/ApplicationStatus'
import ApplicationSteps from '../components/ApplicationSteps'
import Incomes from '../components/Incomes'
import VIE from '../components/VIE'

export default {
  name: 'ApplyStep5',
  components: { ApplicationStatus, ApplicationSteps, Incomes, VIE },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication',
      'LastThreeMonths'
    ])
  },
  created () {
    if (this.CurrentApplication) {
      this.updateMissingInfo()
    } else {
      this.$router.push('Home')
    }
    if (this.$route.params) this.editId = this.$route.params.editId
  },
  methods: {
    onUpdateIncome () {
      this.$store.dispatch('finishResidentIncomes')
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep6')
      } else {
        this.$router.push('Home')
      }
    },
    verifyIncome () {
      this.showVIE = true
    },
    vieCompleted () {
      this.showVIE = false
    },
    updateMissingInfo () {
      this.missingInfo = []
      this.CurrentApplication.residents.forEach(res => {
        if (!res.income) {
          this.missingInfo.push({ firstname: res.firstname, lastname: res.lastname, error: 'Need income information' })
        } else {
          if (res.income.hasWages === null || (res.income.hasWages && res.income.wages.length === 0)) {
            this.missingInfo.push({ firstname: res.firstname, lastname: res.lastname, error: 'Need Wage Information' })
          } else if (res.income.hasOther === null || (res.income.hasOther && res.income.otherIncome.length === 0)) {
            this.missingInfo.push({ firstname: res.firstname, lastname: res.lastname, error: 'Need Other Income Information' })
          }
        }
      })
      this.noHouseholdIncome = this.CurrentApplication.residents.every(r => r.income && r.income.hasIncome === false)
      this.allCompleted = this.missingInfo.length === 0
    }
  },
  data () {
    return {
      editId: null,
      curStep: '5',
      backLabel: 'Household Members',
      submitLabel: 'Energy Companies',
      backTo: 'ApplyStep4',
      allCompleted: false,
      missingInfo: [],
      noHouseholdIncome: false,
      showVIE: false
    }
  }
}
</script>
