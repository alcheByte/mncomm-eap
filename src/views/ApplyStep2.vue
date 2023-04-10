<template>
  <div id="applystep2" class="grid-fill">
    <b-card header-tag="header">
      <template #header>
          <ApplicationStatus :curStep="2" />
      </template>
      <b-form @submit="onApplyStep2" class="app-form">
        <div class="sheet">
          <div v-if="userIsAR === null">
            <b-row class="justify-content-center py-1">Are you completing this application for the household where you live or on behalf of another household?</b-row>
            <b-row class="justify-content-center py-1">
              <b-button @click="isAR(false)">My Household</b-button>
              &nbsp;
              <b-button @click="isAR(true)">Another Household</b-button>
            </b-row>
          </div>
          <b-row v-if="userIsAR !== null" class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-applicant icon="info-circle" class="title-icon"/>Personal Information</h3></div>
          </b-row>
          <b-row v-if="userIsAR !== null" class="pb-3" no-gutters>
            <p class="sub-title center-h">Enter personal information for the primary household member</p>
          </b-row>
          <Resident v-if="userIsAR !== null" :resident="applicant" :isApplicant="true" />
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :backLabel="backLabel" :backTo="backTo"/>
      </b-form>
    </b-card>
    <b-modal id="modal-applicant" title="Applicant Information:" ok-only size="lg">
      <b-container>
        <p>Fill in the Social Security Number (SSN), name, current home address, phone number, and contact information for the primary household member.</p>
        <p>Contact your Service Provider if anyone in your household is unable to provide an SSN.</p>
        <p>You may be able to use an alternative legal document number or documentation of your eligibility for public benefits.</p>
        <div class="subtext">
          <h4><b>Non-Citizen Applicants:</b></h4>
          <p>To get help from Minnesota Energy Programs, you must be a citizen or in the United States (US) legally.</p>
          <p><b>Energy Assistance benefits are not counted in public charge determinations.</b></p>
          <p>You can apply and get help for other eligible household members, even if you or some household members are not eligible because of immigration status.</p>
          <p>Members of your household who are eligible non-citizens and applying for help must show proof of their immigration status.</p>
          <p>Give a copy of both sides of immigration cards or other documents that show immigration status for every household member who is an eligible non-citizen and applying for help. All household members, regardless of immigration or citizenship status, must provide their income information, but only those who are citizens or eligible non-citizens will be counted as household members.</p>
          <p>Contact your Service Provider for specific information about what is required for your situation.</p>
          <p><b>We will not share information about you with the US Citizenship and Immigration Services (USCIS) without your permission.</b></p>
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
import Resident from '../components/Resident'

export default {
  name: 'ApplyStep2',
  components: { ApplicationStatus, Resident, ApplicationSteps },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication) {
      this.applicant = {...this.CurrentApplication.residents.find(a => a.isApplicant)}
      this.userIsAR = this.CurrentApplication.AR !== null
    } else if (this.CurrentAccount && this.CurrentAccount.contact) {
      this.applicant.firstname = this.CurrentAccount.contact.firstname
      this.applicant.lastname = this.CurrentAccount.contact.lastname
    } else if (!this.CurrentAccount) {
      this.$router.push('Home')
    }
  },
  methods: {
    onApplyStep2 () {
      if (this.CurrentApplication) {
        this.$store.dispatch('updateApplicant', this.applicant)
      } else {
        this.$store.dispatch('createApplication', { applicant: this.applicant, userIsAR: this.userIsAR })
      }
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep3')
      } else {
        this.$router.push('Home')
      }
    },
    isAR (ans) {
      this.userIsAR = ans
    }
  },
  data () {
    return {
      userIsAR: null,
      applicant: {
        firstname: '',
        lastname: '',
        dateofbirth: null,
        ssn: ''
      },
      curStep: '2',
      backLabel: null,
      submitLabel: 'Address',
      backTo: null
    }
  }
}
</script>
