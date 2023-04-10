<template>
  <div id="emergency">
    <b-card header-tag="header">
      <template #header>
        <div class="panel-header">
          <span style="font-size: 24px">Energy Emergency</span>
        </div>
      </template>
      <div class="container-fluid">
        <div class="row" v-if="CurrentAccount && CurrentAccount.contact">
            <h3>Welcome {{CurrentAccount.contact.firstname}} {{CurrentAccount.contact.lastname}}</h3>
        </div>
        <p style="text-align: left;">What is the nature of your emergency?</p>
        <div class="dummy-content">
            <p>Collect emergency info and login or start app...</p>
        </div>
        <div class="centered">
          <b-button to="Home">Back to My Account</b-button>
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
  name: 'Emergency',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'IsEligible',
      'EligibilityMessage',
      'UserIsAuthenticated'
    ])
  },
  created () {
    // if (this.$store.state.users.UserIsAuthenticated !== true) {
    //   this.$router.push('Welcome')
    // }
  },
  methods: {
    CheckEligibility (event) {
      event.preventDefault()
      this.$store.dispatch('checkEligibility', { isMNResident: this.isMNResident, numOfResidents: this.numOfResidents, householdIncome: this.householdIncome })
    },
    helpIncome (event) {
      event.preventDefault()
    }
  },
  data () {
    return {
      isMNResident: null,
      numOfResidents: null,
      householdIncome: 0
    }
  }
}
</script>
