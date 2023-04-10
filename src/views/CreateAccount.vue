<template>
    <div id="createaccount">
        <b-card header-tag="header">
            <template #header>
              <ApplicationStatus :curStep="1" />
            </template>
            <b-form @submit="onNewAccount">
              <div class="sheet">
                <div v-if="selectedCounty === ''">
                  <b-row class="justify-content-center py-1">What county does your household live in?</b-row>
                  <b-row class="justify-content-center py-1">
                    <b-form-select v-model="selectedCounty" :options="MNCounties" @input="changeCounty" style="max-width: 400px;">
                      <template #first>
                        <b-form-select-option value="" disabled>-- Please select a county --</b-form-select-option>
                      </template>
                    </b-form-select>
                  </b-row>
                </div>
                <div v-if="CountySPs && CountySPs.length > 1 && !ServiceProvider">
                  <b-row class="justify-content-center py-1">There are multiple local offices that can help you apply for energy assistances.</b-row>
                  <b-row class="justify-content-center py-1">Please select the office you would like to work with.</b-row>
                  <b-row class="justify-content-center py-1">
                    <b-form-select v-model="selectedSP" :options="CountySPs" @input="changeSP" style="max-width: 400px;">
                      <template #first>
                        <b-form-select-option value="" disabled>-- Please select a service provider --</b-form-select-option>
                      </template>
                    </b-form-select>
                  </b-row>
                </div>
                <div v-if="selectedCounty !== '' && ServiceProvider">
                  <b-row class="justify-content-center pb-2"><h3>Create Account</h3></b-row>
                  <b-row class="justify-content-center pb-3">
                    <ServiceProvider />
                  </b-row>
                  <b-row class="justify-content-center py-2">To continue with your application, create an account by entering an email and password below.</b-row>
                  <div id="credentials">
                    <b-form-group
                      label="Email address:"
                      description="We'll never share your email with anyone else."
                      label-cols="4"
                      content-cols="8"
                    >
                        <b-form-input
                            v-model="email"
                            type="email"
                            placeholder="Enter email"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Password:"
                      label-cols="4"
                      content-cols="8"
                    >
                        <b-form-input
                            v-model="password"
                            type="password"
                            placeholder="Enter password"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Confirm:"
                      label-cols="4"
                      content-cols="8"
                    >
                        <b-form-input
                            v-model="confirm"
                            type="password"
                            placeholder="Re-enter password"
                            required
                        ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
              </div>
              <div v-if="selectedCounty !== ''" class="centered">
                <b-button type="submit" variant="success">Next: Begin Application<b-icon icon="arrow-right-circle" style="margin-left: 9px;"/></b-button>
              </div>
            </b-form>
        </b-card>
    </div>
</template>

<style scoped>
#credentials {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationStatus from '../components/ApplicationStatus'
import ServiceProvider from '../components/ServiceProvider'

export default {
  name: 'CreateAccount',
  components: { ApplicationStatus, ServiceProvider },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'IsEligible',
      'MNCounties',
      'CountySPs',
      'ServiceProvider',
      'EligibilityMessage',
      'UserIsAuthenticated'
    ])
  },
  created () {
    if (this.MNCounties.length === 0) {
      this.$store.dispatch('getCounties')
    }
    if (this.ServiceProvider) {
      this.selectedSP = this.ServiceProvider
    }
  },
  methods: {
    changeCounty (county) {
      this.$store.dispatch('loadCountySPs', county)
      this.selectedSP = ''
    },
    changeSP (sp) {
      if (sp) {
        this.$store.dispatch('selectServiceProvider', sp)
      }
    },
    onNewAccount () {
      this.$store.dispatch('createAccount', {
        email: this.email,
        password: this.password,
        county: this.selectedCounty
      })
      if (this.CurrentAccount) {
        this.$router.push('ApplyStep2')
      }
    }
  },
  data () {
    return {
      yesorno: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      email: '',
      password: '',
      confirm: '',
      selectedCounty: '',
      selectedSP: ''
    }
  }
}
</script>
