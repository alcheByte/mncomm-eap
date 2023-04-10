<template>
  <div id="applystep4" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
          <ApplicationStatus :curStep="4"/>
      </template>
      <b-form @submit="onUpdateResidents" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-info-residents icon="info-circle" class="title-icon"/>Household Members</h3></div>
          </b-row>
          <b-row class="pb-3" no-gutters>
            <p class="sub-title center-h">List each of your household members, including children.</p>
          </b-row>
          <Residents :residents="CurrentApplication.residents"/>
          <div class="centered">
            <b-button @click="addResident" variant="success"><b-icon icon="plus-circle" style="margin-right: 9px;"/>Add Household Member</b-button>
          </div>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :backLabel="backLabel" :backTo="backTo"/>
      </b-form>
    </b-card>
    <b-modal id="modal-resident-new" v-model="showEditor" title="Add Household Member" hide-footer size="lg">
      <div class="sheet">
        <Resident :resident="newResident" :isApplicant="false"/>
      </div>
      <b-row class="justify-content-center pb-4">
        <b-button @click="saveNewResident" variant="success"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Household Member</b-button>
      </b-row>
    </b-modal>
    <b-modal id="modal-info-residents" title="Residents Instructions:" ok-only size="lg">
      <b-container>
        <p>Fill in all the information for everyone living in your home.</p>
        <p>ALL people living in the home are household members if they share the kitchen or other living areas in the home.</p>
        <p>Live-in care providers are not counted as household members if you have proof from a health care provider that daily medical care is required.</p>
        <p>Non-custodial parents may include their minor children as household members.</p>
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
import Residents from '../components/Residents'
import Resident from '../components/Resident'

export default {
  name: 'ApplyStep4',
  components: { ApplicationStatus, ApplicationSteps, Residents, Resident },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication'
    ])
  },
  created () {
    if (!this.CurrentApplication) {
      this.$router.push('Home')
    }
  },
  methods: {
    onUpdateResidents (event) {
      event.preventDefault()
      this.$store.dispatch('finishResidents')
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep5')
      } else {
        this.$router.push('Home')
      }
    },
    addResident () {
      var nextId = Math.max(...this.CurrentApplication.residents.map(r => r.id)) + 1
      this.newResident = {
        id: nextId,
        firstname: '',
        lastname: '',
        dateofbirth: '',
        ssn: '',
        isapplicant: false,
        income: {
          hasDecreased: null,
          hasIncome: null,
          isComplete: null,
          sources: []
        }
      }
      this.showEditor = true
    },
    saveNewResident () {
      this.$store.dispatch('addResident', this.newResident)
      this.showEditor = false
    }
  },
  data () {
    return {
      newResident: null,
      showEditor: false,
      curStep: '4',
      backLabel: 'Address',
      submitLabel: 'Household Income',
      backTo: 'ApplyStep3'
    }
  }
}
</script>
