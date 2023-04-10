<template>
  <div id="residents">
    <b-row class="pb-2" align-h="center"
      v-for="_resident in residents"
      :key="_resident.id"
    >
      <ResidentTemplate :resident="_resident" :editResident="editResident" />
    </b-row>
    <b-modal id="modal-resident-edit" v-model="showEditor" title="Edit Household Member" hide-footer size="lg">
      <div class="sheet">
        <Resident :resident="curResident" :isApplicant="false" />
      </div>
      <b-row class="justify-content-center pb-4">
        <b-button @click="saveResident" variant="success" class="mx-2"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Household Member</b-button>
        <b-button @click="removeResident" variant="danger" class="mx-2"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Remove Household Member</b-button>
      </b-row>
    </b-modal>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import Resident from './Resident'
import ResidentTemplate from '../components/ResidentTemplate'

export default {
  name: 'Residents',
  props: {
    residents: {
      type: Array
    }
  },
  components: { Resident, ResidentTemplate },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication'
    ])
  },
  methods: {
    saveResident () {
      this.$store.dispatch('saveResident', this.curResident)
      this.showEditor = false
    },
    removeResident () {
      this.showEditor = false
      this.$store.dispatch('removeResident', this.curResident)
      this.curResident = null
    },
    editResident (resident) {
      this.curResident = {...resident}
      this.showEditor = true
    }
  },
  data () {
    return {
      curResident: null,
      showEditor: false
    }
  }
}
</script>
