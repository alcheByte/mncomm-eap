<template>
  <div id="incomes">
    <b-row class="pb-2" align-h="center"
      v-for="_resident in residents"
      :key="_resident.id"
    >
      <ResidentIncomeTemplate :resident="_resident" :editIncome="doIncome" />
    </b-row>
    <!-- modals -->
    <b-modal id="modal-income-edit" v-model="showEditor" :title="worksheetTitle()" hide-footer size="lg">
      <Income v-if="!isMinor(curResident)" :income="curIncome" :resident="curResident" :onComplete="incomeCompleted" class="p-3 mb-4" />
      <ChildIncome v-if="isMinor(curResident)" :income="curIncome" :resident="curResident" :onComplete="incomeCompleted" class="p-3 mb-4" />
    </b-modal>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import ResidentIncomeTemplate from '../components/ResidentIncomeTemplate'
import Income from './Income'
import ChildIncome from './ChildIncome'

export default {
  name: 'Incomes',
  props: {
    residents: null,
    onSaveIncome: null,
    editId: null
  },
  components: { ResidentIncomeTemplate, Income, ChildIncome },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    if (this.editId && this.residents) {
      var toEdit = this.residents.find(r => r.id === this.editId)
      if (toEdit) {
        this.doIncome(toEdit)
      }
    }
  },
  methods: {
    btnVariant (_resident) {
      return this.incomeEntered(_resident) ? '' : 'success'
    },
    iconVariant (_resident, prefix) {
      if (prefix) {
        return this.incomeEntered(_resident) ? 'pencil-fill' : 'paperclip'
      }
      return this.incomeEntered(_resident) ? 'check2-circle' : 'paperclip'
    },
    residentLabel (resident) {
      var label = this.incomeEntered(resident) ? 'Edit Income for ' : 'Enter Income for '
      label += resident.firstname + ' ' + resident.lastname
      if (resident.dateofbirth) {
        label += ', Age ' + this._calculateAge(resident.dateofbirth)
      }
      return label
    },
    worksheetTitle () {
      if (this.curResident) {
        return 'Income Sources - ' + this.curResident.firstname + ' ' + this.curResident.lastname
      }
      return ''
    },
    isMinor (resident) {
      if (!resident) return false
      var age = this._calculateAge(resident.dateofbirth)
      return age < 18
    },
    incomeEntered (resident) {
      return resident.income !== null && resident.income !== undefined
    },
    incomeCompleted () {
      this.showEditor = false
      if (this.onSaveIncome) this.onSaveIncome()
      this.curResident = null
      this.curIncome = null
    },
    addResidentIncome (resident) {
      this.curResident = resident
      this.curIncome = {
        hasDecreased: null,
        isComplete: false,
        sources: [ ]
      }
      this.readyToSave = false
      this.showEditor = true
    },
    editResidentIncome (resident) {
      this.curResident = resident
      this.curIncome = {...resident.income}
      this.curIncome.isComplete = false
      this.readyToSave = false
      this.showEditor = true
    },
    doIncome (resident) {
      if (this.incomeEntered(resident)) {
        this.editResidentIncome(resident)
      } else {
        this.addResidentIncome(resident)
      }
    },
    _calculateAge (birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
  },
  data () {
    return {
      curResident: null,
      curIncome: null,
      showEditor: false
    }
  }
}
</script>
