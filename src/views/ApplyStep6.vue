<template>
  <div id="applystep6" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
          <ApplicationStatus :curStep="6" />
      </template>
      <b-form @submit="onUpdateProviders" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-heat-sources icon="info-circle" class="title-icon"/>Energy Companies</h3></div>
          </b-row>
          <b-row class="pb-3" no-gutters>
            <p class="sub-title center-h">What energy companies supply heat and electricity to your home?</p>
          </b-row>
          <EnergyAccounts :editId="editId"/>
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
import EnergyAccounts from '../components/EnergyAccounts'

export default {
  name: 'ApplyStep6',
  components: { ApplicationStatus, ApplicationSteps, EnergyAccounts },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication'
    ]),
    allCompleted () {
      return true // this.CurrentApplication && this.CurrentApplication.energyAccounts && this.CurrentApplication.energyAccounts.length > 0
    }
  },
  created () {
    if (!this.CurrentApplication) {
      this.$router.push('Home')
    }
    if (this.$route.params) this.editId = this.$route.params.editId
  },
  methods: {
    onUpdateProviders () {
      this.$store.dispatch('finishEnergyAccounts')
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep7')
      } else {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      editId: null,
      curStep: '6',
      backLabel: 'Income',
      submitLabel: 'Heat Emergency',
      backTo: 'ApplyStep5'
    }
  }
}
</script>
