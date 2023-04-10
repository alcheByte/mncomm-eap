<template>
  <b-card header-tag="header">
    <template #header>
      <b-row class="justify-content-center">
        Application Status
      </b-row>
    </template>
    <b-container v-if="CurrentAccount" class="pt-2">
      <b-row
        v-for="app in CurrentAccount.applications"
        :key="app.id"
        class="summary-panel pt-2 center-v"
      >
        <b-col>
          Applicant: {{ app.residents.find(a => a.isApplicant).firstname }} {{ app.residents.find(a => a.isApplicant).lastname }}
        </b-col>
        <b-col>
          Date: {{ app.dateCreated.toLocaleDateString("en-US") }}
        </b-col>
        <b-col class="centered">
          Status <b-badge :variant="statusBadge(app.status)" pill>{{ app.status }}</b-badge>
        </b-col>
      </b-row>
      <div v-if="CanApplyThisYear" class="centered" style="margin-top: 17px;">
        <b-button to="Apply">Apply for 2021</b-button>
      </div>
    </b-container>
  </b-card>
  <!-- <div id="applications">
    <b-row class="pad-15">
      <b-col>
        <h4 class="centered">My Applications</h4>
      </b-col>
      <b-col md="auto" class="flex-center">
        <b-button to="Emergency" variant="danger">I have a Heat Emergency<b-icon icon="exclamation-circle" style="margin-left: 9px;"/></b-button>
      </b-col>
    </b-row>
    <b-list-group v-if="CurrentAccount">
      <b-row class="list-header">
        <b-col class="cull-small">Applicant</b-col>
        <b-col>Date</b-col>
        <b-col class="centered">Status</b-col>
      </b-row>
      <b-list-group-item
        v-for="app in CurrentAccount.applications"
        :key="app.id"
        button
        @click="onGotoApplication(app)"
      >
        <b-row>
          <b-col class="cull-small">
            {{ app.residents.find(a => a.isApplicant).firstname }} {{ app.residents.find(a => a.isApplicant).lastname }}
          </b-col>
          <b-col>
            {{ app.dateCreated.toLocaleDateString("en-US") }}
          </b-col>
          <b-col class="centered">
            <b-badge :variant="statusBadge(app.status)" pill>{{ app.status }}</b-badge>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <div v-if="CanApplyThisYear" class="centered" style="margin-top: 17px;">
      <b-button to="Apply">Apply for 2021</b-button>
    </div>
  </div> -->
</template>

<style scoped>
.card {
  color: #224277;
  background-color: #FFFFFF;
  font-size: 16px;
  margin: 9px;
  margin-top: 0px;
  width: 100%;
}
.card-header {
  color: #224277;
  background-color: #a1c2e3 !important;
  padding: 0.7rem;
  font-size: 1.2rem;
}
.icon {
  height: 100%;
  font-size: 1.4em;
}
@media only screen and (max-width: 475px) {
  .card {
      min-width: unset;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Applications',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication',
      'CanApplyThisYear',
      'UserIsAuthenticated'
    ])
  },
  created () {
    if (this.UserIsAuthenticated !== true) {
      this.$router.push('SignIn')
    }
  },
  methods: {
    onGotoApplication (app) {
      this.$store.dispatch('gotoApplication', app)
      if (this.CurrentApplication) {
        switch (this.CurrentApplication.status) {
          case 'In Progress':
            this.$router.push('ApplyStep' + (this.CurrentApplication.stepsCompleted + 1))
            break
          case 'Submitted':
          case 'Denied':
          case 'Approved':
            this.$router.push('ApplicationSummary')
            break
        }
      }
    },
    statusBadge (status) {
      switch (status) {
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
