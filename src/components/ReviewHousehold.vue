<template>
  <b-card header-tag="header">
    <template #header>
      <b-row>
        <b-col class="center-v">
          Household Summary
        </b-col>
      </b-row>
    </template>
    <b-container class="pt-2">
      <b-row
          v-for="_missing in missingHouseholdInfo"
          :key="_missing.id"
          class="missing-info pl-4 pt-2 center-v"
      >
        <b-alert show variant="danger" class="w-100">
          <b-button @click="fix(_missing)" variant="danger" class="mr-2">
            <b-icon icon="pencil-fill" class="emphasize"/>
            <span class="pl-1">Fix</span>
          </b-button>
          &nbsp;<b-icon icon="exclamation-octagon-fill" class="emphasize"/>
          &nbsp;{{ _missing.desc }}
        </b-alert>
      </b-row>
      <b-row class="justify-content-center">
        <!-- Members -->
        <div class="summary-panel m-3">
          <b-row class="justify-content-center py-2 px-3">
            <h5>Household Members</h5>&nbsp;({{ CurrentApplication.residents.length }})
          </b-row>
          <div class="p-2">
            <b-row
              v-for="_resident in CurrentApplication.residents"
              :key="_resident.id"
              class="pb-1"
              no-gutters>
              {{ _getResidentInfo(_resident) }}&nbsp;
              <b-icon v-if="_isMissingInfo(_resident)" :title="_getMissingInfo(_resident)" icon="exclamation-octagon-fill" class="missing-info emphasize center-v ml-1"/>
            </b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button to="ApplyStep4">
              <b-icon icon="pencil-fill" class="icon"/> Edit
            </b-button>
          </b-row>
        </div>
        <!-- Address -->
        <div class="summary-panel m-3">
          <b-row class="justify-content-center py-2 px-3">
            <h5>Address</h5>
          </b-row>
          <div class="p-2">
            <b-row no-gutters>{{ CurrentApplication.addresses.primary.line1 }}</b-row>
            <b-row no-gutters>{{ CurrentApplication.addresses.primary.line2 }}</b-row>
            <b-row no-gutters>{{ CurrentApplication.addresses.primary.city }}, {{ CurrentApplication.addresses.primarystate }} {{ CurrentApplication.addresses.primary.zipcode }}</b-row>
            <b-row no-gutters>{{ CurrentApplication.addresses.primary.county }} County</b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button to="ApplyStep3">
              <b-icon icon="pencil-fill" class="icon"/> Edit
            </b-button>
          </b-row>
        </div>
        <!-- Mailing Address -->
        <div class="summary-panel m-3" v-if="CurrentApplication.addresses.hasMailing === true">
          <b-row class="justify-content-center p-2">
            <h5>Mailing Address</h5>
          </b-row>
          <div class="p-2">
            <b-row no-gutters>{{ CurrentApplication.addresses.mailing.line1 }}</b-row>
            <b-row no-gutters>{{ CurrentApplication.addresses.mailing.line2 }}</b-row>
            <b-row no-gutters>{{ CurrentApplication.addresses.mailing.city }}, {{ CurrentApplication.addresses.primarystate }} {{ CurrentApplication.addresses.primary.zipcode }}</b-row>
            <b-row  v-if="CurrentApplication.addresses.mailing.county" no-gutters>{{ CurrentApplication.addresses.mailing.county }} County</b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button to="ApplyStep3">
              <b-icon icon="pencil-fill" class="icon"/> Edit
            </b-button>
          </b-row>
        </div>
      </b-row>
    </b-container>
    <!-- modals -->
    <b-modal id="modal-edit-member" v-model="showEdit" title="Edit Household Member" hide-footer size="md">
      <div class="sheet">
        <Resident :resident="curResident" :isApplicant="false"/>
      </div>
      <b-row class="justify-content-center pb-4">
        <b-button @click="saveResident" variant="success"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Household Member</b-button>
      </b-row>
    </b-modal>
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
    font-size: .75rem !important;
    vertical-align: middle !important;
    padding: 0px !important;
}
@media only screen and (max-width: 475px) {
  .card {
      min-width: unset;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import Resident from './Resident'

export default {
  name: 'ReviewHousehold',
  components: { Resident },
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    this._loadMissingInfo()
  },
  methods: {
    _loadMissingInfo () {
      if (this.CurrentApplication) {
        this.missingHouseholdInfo = this.CurrentApplication.missingInfo.filter(mi => mi.section === 'HOUSEHOLD' && mi.needsDoc !== true)
      }
    },
    _getResidentInfo (resident) {
      return this._residentFullName(resident) + ', ' + this._calculateAge(resident.dateofbirth)
    },
    _isMissingInfo (resident) {
      if (this.CurrentApplication.missingInfo) {
        return this.missingHouseholdInfo.findIndex(mi => mi.resId === resident.id) > -1
      }
      return false
    },
    _getMissingInfo (resident) {
      var missing = this.missingHouseholdInfo.find(mi => mi.resId === resident.id)
      if (missing) return missing.desc
    },
    _calculateAge (birthday) { // birthday is a date
      if (birthday) {
        var ageDifMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageDifMs) // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      }
      return NaN
    },
    _residentFullName (res) {
      return res.firstname + ' ' + (res.middlename ? res.middlename + ' ' + res.lastname : res.lastname)
    },
    fix (missing) {
      var res = this.CurrentApplication.residents.find(r => r.id === missing.resId)
      if (res) {
        this.curResident = {...res}
        this.showEdit = true
      }
    },
    saveResident () {
      this.showEdit = false
      this.$store.dispatch('saveResident', this.curResident)
      this.$store.dispatch('updateMissingInfo')
      this._loadMissingInfo()
    }
  },
  data () {
    return {
      missingHouseholdInfo: [],
      showEdit: false,
      curResident: null
    }
  }
}
</script>
