<template>
  <div id="welcome">
    <b-card header-tag="header">
      <template #header>
        <div class="panel-header">
          <span style="font-size: 24px">Apply for Energy Assistance</span>
        </div>
      </template>
      <div class="container-fluid">
        <div class="row" v-if="CurrentAccount && CurrentAccount.contact">
            <h3>Welcome {{CurrentAccount.contact.firstname}} {{CurrentAccount.contact.lastname}}</h3>
        </div>
        <div v-if="UserIsAuthenticated === false" style="margin-top: 13px;" class="centered">
          <b-card-text>
            Already have an account? Login to continue your application.
          </b-card-text>
          <b-button to="signin" >Login</b-button>
        </div>
        <div v-if="CanApplyThisYear !== false" class="centered" style="margin-top: 17px;">
          <b-card-text >
            First time applying online? Click the button below to continue.
          </b-card-text>
          <b-button to="Eligibility">Apply Now</b-button>
        </div>
        <div v-if="UserIsAuthenticated === true" style="margin-top: 17px;" class="centered">
          <b-button to="home">Go to My Account</b-button>
          <div style="margin-top: 17px;" class="centered">
            <b-card-text >
              Are you having an energy emergency?
            </b-card-text>
            <b-button to="Emergency" variant="danger">Yes, I Need Help</b-button>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'welcome',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CanApplyThisYear',
      'UserIsAuthenticated'
    ])
  }
}
</script>
