<template>
  <b-card header-tag="header">
    <template #header>
      <b-row class="justify-content-center">
        Heat Sources Summary
      </b-row>
    </template>
    <b-container class="pt-2">
      <b-row
          v-for="_missing in missingHeatingInfo"
          :key="_missing.id"
          class="missing-info pl-4"
      >
        <b-icon icon="exclamation-triangle" class="center-v mr-1"/>&nbsp;{{ _missing.desc }}
      </b-row>
      <b-row class="justify-content-center">
        <!-- Energy Accounts -->
        <div v-for="_account in CurrentApplication.energyAccounts"
          :key="_account.id"
          class="summary-panel m-3"
        >
          <b-row class="justify-content-center p-2">
            <h5>{{ _account.vendor_name }}</h5>
          </b-row>
          <div class="p-2">
            <b-row no-gutters><b-col>Name on Account:</b-col><b-col>{{ _account.accountName }}</b-col></b-row>
            <b-row no-gutters><b-col>Account #:</b-col><b-col>{{ _account.accountNumber }}</b-col></b-row>
            <b-row no-gutters><b-col>Fuels:</b-col><b-col>{{ _account.fuels.join(", ") }}</b-col></b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button :to="_getEditRoute(_account)">
              <b-icon icon="pencil-fill" class="icon"/> Edit
            </b-button>
          </b-row>
        </div>
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
.summary-panel {
 min-width: 375px;
}
@media only screen and (max-width: 475px) {
  .card {
      min-width: unset;
  }
  .summary-panel {
    min-width: unset;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReviewHeatSources',
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication) {
      this.missingHeatingInfo = this.CurrentApplication.missingInfo.filter(mi => mi.section === 'HEATSOURCES' && mi.needsDoc !== true)
    }
  },
  methods: {
    _getEditRoute (account) {
      return { name: 'ApplyStep6', params: { editId: account.id } }
    },
    _getResidentInfo (resident) {
      return resident.firstname + ' ' + resident.lastname + ', ' + this._calculateAge(resident.dateofbirth)
    },
    _calculateAge (birthday) { // birthday is a date
      if (birthday) {
        var ageDifMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageDifMs) // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      }
      return NaN
    }
  },
  data () {
    return {
      missingHeatingInfo: []
    }
  }
}
</script>
