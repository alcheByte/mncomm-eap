<template>
  <div id="applysubmitted">
    <b-card header-tag="header">
      <template #header>
        <div class="panel-header">
          <span style="font-size: 24px">Application Submitted</span>
        </div>
      </template>
      <div class="container-fluid p-3">
        <b-row v-if="CurrentAccount && CurrentAccount.contact" no-gutters>
            <h3>{{CurrentAccount.contact.firstname}} {{CurrentAccount.contact.lastname}}</h3>
        </b-row>
        <b-card-text >
            Your application has been submitted. To check the status of your application go to your account.
        </b-card-text>
        <div style="margin-top: 17px;" class="centered">
            <b-button to="home">Go to My Account</b-button>
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
  name: 'ApplySubmitted',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'UserIsAuthenticated'
    ])
  }
}
</script>
