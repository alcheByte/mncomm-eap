<template>
  <b-card header-tag="header">
    <template #header>
      <b-row class="justify-content-center">
        Housing Summary
      </b-row>
    </template>
    <b-container class="pt-2">
      <b-row
          v-for="_missing in missingHousingInfo"
          :key="_missing.id"
          class="missing-info pl-4"
      >
        <b-icon icon="exclamation-triangle" class="center-v mr-1"/>&nbsp;{{ _missing.desc }}
      </b-row>
      <b-row v-if="CurrentApplication.housing.ownership === 'rent'" class="justify-content-center">
        <!-- Energy Accounts -->
        <div class="summary-panel m-3">
          <b-row class="justify-content-center p-2">
            <h5>Renting</h5>
          </b-row>
          <div class="p-2">
            <b-row no-gutters><b-col>Landlord:</b-col><b-col>{{ CurrentApplication.housing.rent.landlord.name }}</b-col></b-row>
            <b-row no-gutters><b-col>Monthly Rent:</b-col><b-col>{{ CurrentApplication.housing.rent.monthlyAmount }}</b-col></b-row>
            <b-row v-if="CurrentApplication.housing.rent.includes.length > 0" no-gutters><b-col>Includes:</b-col><b-col>{{ CurrentApplication.housing.rent.includes.join(", ") }}</b-col></b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button :to="_getEditRoute()">
              <b-icon icon="pencil-fill" class="icon"/> Edit
            </b-button>
          </b-row>
        </div>
      </b-row>
      <b-row v-if="CurrentApplication.housing.ownership === 'own'" class="justify-content-center">
        <!-- Energy Accounts -->
        <div class="summary-panel m-3">
          <b-row class="justify-content-center p-2">
            <h5>Owns Home</h5>
          </b-row>
          <div class="p-2">
            <b-row no-gutters><b-col>Monthly Mortgage:</b-col><b-col>{{ CurrentApplication.housing.own.mortgage }}</b-col></b-row>
            <b-row v-if="CurrentApplication.housing.own.rented === 'not-rented'" no-gutters>Not renting any part of home</b-row>
            <b-row v-if="CurrentApplication.housing.own.rented === 'rented'" no-gutters>Renting part of home</b-row>
            <b-row v-if="CurrentApplication.housing.own.usedForBusiness === 'home-office'" no-gutters>Home is used for office/business</b-row>
            <b-row v-if="CurrentApplication.housing.own.usedForBusiness === 'none'" no-gutters>No office/business at home</b-row>
            <b-row v-if="CurrentApplication.housing.rent.includes.length > 0" no-gutters><b-col>Includes:</b-col><b-col>{{ CurrentApplication.housing.rent.includes.join(", ") }}</b-col></b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button :to="_getEditRoute()">
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
  name: 'ReviewHousing',
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication) {
      this.missingHousingInfo = this.CurrentApplication.missingInfo.filter(mi => mi.section === 'HOUSING' && mi.needsDoc !== true)
    }
  },
  methods: {
    _getEditRoute () {
      return { name: 'ApplyStep9' }
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
      missingHousingInfo: []
    }
  }
}
</script>
