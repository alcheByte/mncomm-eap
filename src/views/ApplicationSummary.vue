<template>
  <div id="applicationsummary">
    <b-card header-tag="header">
      <template #header>
        <div class="panel-header">
          Application Summary {{ CurrentApplication.dateCreated.toLocaleDateString("en-US") }} - <b-badge :variant="statusBadge()" pill>{{ CurrentApplication.status }}</b-badge>
        </div>
      </template>
      <div class="container-fluid">
        <div class="dummy-content">
          <p>Display <b>{{ CurrentApplication.status }}</b> status information...</p>
        </div>
        <div class="dummy-content">
          <p>Display application summary info...</p>
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
  name: 'ApplicationSummary',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication',
      'UserIsAuthenticated'
    ])
  },
  created () {
    if (this.UserIsAuthenticated !== true) {
      this.$router.push('SignIn')
    }
  },
  methods: {
    statusBadge () {
      switch (this.CurrentApplication.status) {
        case 'Approved':
          return 'success'
        case 'Denied':
          return 'danger'
        case 'Submitted':
          return 'primary'
        case 'In Progress':
          return 'warning'
      }
    }
  }
}
</script>
