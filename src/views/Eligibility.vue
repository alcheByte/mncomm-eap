<template>
  <div id="eligibility">
    <b-card header-tag="header">
      <template #header>
        <div class="panel-header">
          <span style="font-size: 24px">Apply for Energy Assistance</span>
        </div>
      </template>
      <b-form >
        <div class="container-fluid">
          <div v-if="acknowledged === null" class="sheet">
            <b-row class="justify-content-center pb-2">
              To qualify for energy assistance, your total household income must be less than the limits below.
            </b-row>
            <b-row class="justify-content-center pb-3">
              <table class="m-2 small">
                <thead>
                  <th>Household Size</th>
                  <th>Household Income From the Past 3 Months</th>
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
                  <!-- <tr>
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
                  </tr> -->
                </tbody>
              </table>
            </b-row>
            <b-row class="justify-content-center pb-2">You must live in Minnesota to get energy assistance.</b-row>
            <b-row class="justify-content-center pb-3"><MN /></b-row>
          </div>
          <b-row v-if="acknowledged === null" class="justify-content-center">
            <b-button @click="acknowledge">Apply Now</b-button>
          </b-row>
          <div v-if="acknowledged && CanApplyThisYear !== false" class="sheet">
            <p>You’ll need to provide the following information to complete your application.</p>
            <ul>
              <li>Contact information</li>
              <li>Details about each member of your household, such as names, birthdays, and social security numbers</li>
              <li>Information about any income your household gets from jobs, government programs, or other sources</li>
              <li>Account information for utility companies that provide heat or electricity to your home</li>
              <li>Details about your home, such as the amount you may for your monthly rent or mortgage</li>
            </ul>
            <p>
              Please review your <b-link v-b-modal.modal-rights>Rights &amp; Responsibilities</b-link> and the <b-link v-b-modal.modal-privacy>Privacy Notice</b-link> before completing this application.
            </p>
          </div>
          <div v-if="acknowledged && CanApplyThisYear !== false" class="centered">
            <b-button v-if="CurrentAccount" to="ApplyStep2">Next: Applicant Information<b-icon icon="arrow-right-circle" style="margin-left: 9px;"/></b-button>
            <b-button v-if="CurrentAccount === null" to="CreateAccount">Next: Create Account<b-icon icon="arrow-right-circle" style="margin-left: 9px;"/></b-button>
          </div>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<style scoped>
td {
  border: 1px dotted #999;
  text-align: center;
  padding: .35rem;
}
th {
  border: 1px dotted #999;
  text-align: center;
  padding: .5rem;
}
</style>

<script>
import { mapGetters } from 'vuex'
import Rights from './Rights'
import Privacy from './Privacy'
import MN from '../components/MN.vue'

export default {
  name: 'Eligibility',
  components: { Rights, Privacy, MN },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CanApplyThisYear',
      'UserIsAuthenticated'
    ])
  },
  methods: {
    acknowledge () {
      this.acknowledged = true
    }
  },
  data () {
    return {
      acknowledged: null
    }
  }
}
</script>
