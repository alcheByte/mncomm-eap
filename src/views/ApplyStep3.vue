<template>
  <div id="applystep3" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
          <ApplicationStatus :curStep="3" />
      </template>
      <b-form @submit="onUpdateAddresses" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-address icon="info-circle" class="title-icon"/>Home Address</h3></div>
          </b-row>
          <b-row class="pb-3" no-gutters>
            <p class="sub-title center-h">Enter the current address where you live</p>
          </b-row>
          <Address :address="primary" :disableState="true" :showAddress2="true" :autofocus="true"/>
          <b-row class="justify-content-center p-1">
            <b-form-checkbox v-model="hasMailing">I have a different mailing address</b-form-checkbox>
          </b-row>
          <b-row v-if="hasMailing" class="justify-content-center py-2">
            <div><h3>Mailing Address</h3></div>
          </b-row>
          <Address v-if="hasMailing" :address="mailing" :disableState="false" :showAddress2="true" class="pt-3"/>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :backLabel="backLabel" :backTo="backTo"/>
      </b-form>
    </b-card>
    <b-modal id="modal-address" title="Applicant Address" ok-only size="lg">
      <b-container>
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
import Address from '../components/Address'

export default {
  name: 'ApplyStep3',
  components: { ApplicationStatus, ApplicationSteps, Address },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication && this.CurrentApplication.addresses) {
      this.hasMailing = this.CurrentApplication.addresses.hasMailing
      this.primary = {...this.CurrentApplication.addresses.primary}
      this.mailing = {...this.CurrentApplication.addresses.mailing}
    } else if (!this.CurrentApplication) {
      this.$router.push('Home')
    }
  },
  methods: {
    onUpdateAddresses (event) {
      event.preventDefault()
      this.$store.dispatch('updateAddresses', {
        primary: this.primary,
        hasMailing: this.hasMailing,
        mailing: this.mailing
      })
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep4')
      } else {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      yesorno: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      showHelpSSN: false,
      hasMailing: false,
      primary: {
        line1: '',
        line2: '',
        city: '',
        state: 'MN',
        zipcode: '',
        county: ''
      },
      mailing: {
        line1: '',
        line2: '',
        city: '',
        state: 'MN',
        zipcode: '',
        county: ''
      },
      curStep: '3',
      backLabel: 'Applicant',
      submitLabel: 'Household Members',
      backTo: 'ApplyStep2'
    }
  }
}
</script>
