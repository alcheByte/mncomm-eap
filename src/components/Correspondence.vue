<template>
  <b-card header-tag="header">
    <template #header>
      <b-row class="justify-content-center">
        Correspondence
      </b-row>
    </template>
    <b-container v-if="CurrentAccount" class="pt-2">
      <b-row
        v-for="msg in CurrentAccount.coorespondence"
        :key="msg.id"
        class="summary-panel pt-2 center-v"
      >
        <b-col>
          Applicant: {{ msg.applicant_name }}
        </b-col>
        <b-col>
          Date: {{ msg.dateCreated.toLocaleDateString("en-US") }}
        </b-col>
        <b-col class="centered">
          Type {{ msg.type }}
        </b-col>
      </b-row>
      <b-row class="justify-content-center m-2">
        <b-button variant="success">
          View / Download <b-icon icon="cloud-arrow-down" style="margin-left: 9px;"/>
        </b-button>
      </b-row>
    </b-container>
  </b-card>
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
  name: 'Correspondence',
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentAccount',
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication) {
    }
  },
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>
