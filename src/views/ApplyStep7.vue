<template>
  <div id="applystep7" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
          <ApplicationStatus :curStep="7" />
      </template>
      <b-form @submit="onSaveEmergency" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-heat-sources icon="info-circle" class="title-icon"/>Heat Emergencies</h3></div>
          </b-row>
          <b-row class="pb-3" no-gutters>
            <p class="sub-title center-h">Do any of the following apply to you? (check all that apply)</p>
          </b-row>
          <b-row class="justify-content-center pb-3">
            <Emergencies :emergencies="emergencies" />
          </b-row>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :disableSubmit="!allCompleted" :backLabel="backLabel" :backTo="backTo"/>
      </b-form>
    </b-card>
    <b-modal id="modal-heat-sources" title="Heat Sources Instructions:" ok-only size="lg">
      <b-container>
        <p></p>
      </b-container>
    </b-modal>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationStatus from '../components/ApplicationStatus'
import ApplicationSteps from '../components/ApplicationSteps'
import Emergencies from '../components/Emergencies'

export default {
  name: 'ApplyStep7',
  components: { ApplicationStatus, ApplicationSteps, Emergencies },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ]),
    allCompleted () {
      return true // this.CurrentApplication && this.CurrentApplication.energyAccounts && this.CurrentApplication.energyAccounts.length > 0
    }
  },
  created () {
    if (!this.CurrentApplication) {
      this.$router.push('Home')
    } else if (this.CurrentApplication.emergencies) {
      this.emergencies = {...this.CurrentApplication.emergencies}
      var clientAccounts = this.CurrentApplication.energyAccounts.map(ea => ea.id)
      // add missing accounts
      clientAccounts.forEach(a => {
        var foundDisconnect = this.emergencies.disconnects.find(d => d.account_id === a)
        if (!foundDisconnect) this.emergencies.disconnects.push({ account_id: a, wasNotified: false, date: null })
        var foundShutOff = this.emergencies.shutOffs.find(s => s.account_id === a)
        if (!foundShutOff) this.emergencies.shutOffs.push({ account_id: a, wasNotified: false, date: null })
      })
      // remove deleted accounts
      this.emergencies.disconnects = this.emergencies.disconnects.filter(d => clientAccounts.includes(d.account_id))
      this.emergencies.shutOffs = this.emergencies.shutOffs.filter(d => clientAccounts.includes(d.account_id))
    } else {
      this.emergencies = {
        pastDueAccounts: [],
        disconnects: this.CurrentApplication.energyAccounts.map(ea => ({ account_id: ea.id, wasNotified: false, date: null })),
        shutOffs: this.CurrentApplication.energyAccounts.map(ea => ({ account_id: ea.id, wasShutOff: false, date: null })),
        lowTank: false,
        lowTankLevel: null
      }
    }
  },
  methods: {
    onSaveEmergency () {
      this.$store.dispatch('saveEmergencies', this.emergencies)
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep8')
      } else {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      editId: null,
      curStep: '7',
      backLabel: 'Energy Companies',
      submitLabel: 'Home Heating',
      backTo: 'ApplyStep6',
      emergencies: null
    }
  }
}
</script>
