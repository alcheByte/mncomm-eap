<template>
  <div id="home">
    <b-card header-tag="header">
      <template #header>
        <div class="panel-header">
          <b-row no-gutters>
            <b-col cols="7">My eHEAT Account</b-col>
            <b-col class="center-v text-right">
              <LogoutLink />
            </b-col>
          </b-row>
        </div>
      </template>
      <b-container fluid>
        <b-row v-if="CurrentAccount && CurrentAccount.contact" style="padding-bottom: 11px;padding-top: 15px;">
          <b-col>
            <h3>Welcome {{CurrentAccount.contact.firstname}} {{CurrentAccount.contact.lastname}}</h3>
          </b-col>
          <b-col md="auto" class="flex-center">
            <b-button v-if="CallToAction" :to="CallToAction.to" variant="success">
              {{ CallToAction.text }}<b-icon icon="arrow-right-circle" style="margin-left: 9px;"/>
            </b-button>
          </b-col>
        </b-row>
        <div v-if="CurrentAccount && CurrentApplication === null">
          <p>
            To apply for eHeat assistance you'll need to create an account and
            provide the following information:
          </p>
          <ul class="pull-left">
            <li>Personal Information (Name, SSN, Address, etc.)</li>
            <li>Household Income (Sources of Income and Other Assistance</li>
            <li>Heating Sources (Type, etc.)</li>
            <li>Housing Information (Housing Type, Residency)</li>
          </ul>
          <div class="centered">
            <b-card-text> Apply now to see if you are eligible. </b-card-text>
            <b-button to="Eligibility">Apply Now</b-button>
          </div>
        </div>
        <b-row v-if="CurrentApplication"  class="justify-content-center pb-2" no-gutters>
          <Applications/>
        </b-row>
        <b-row v-if="CurrentApplication"  class="justify-content-center pb-2" no-gutters>
          <Correspondence/>
        </b-row>
        <b-row v-if="CurrentApplication"  class="justify-content-center pb-2" no-gutters>
          <Payments/>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import Applications from '../components/Applications'
import LogoutLink from '../components/LogoutLink'
import Correspondence from '../components/Correspondence'
import Payments from '../components/Payments'

export default {
  name: 'Home',
  components: { Applications, LogoutLink, Correspondence, Payments },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication',
      'CallToAction',
      'CanApplyThisYear',
      'UserIsAuthenticated'
    ])
  },
  created () {
    if (this.UserIsAuthenticated !== true) {
      this.$router.push('SignIn')
    }
  }
}
</script>
