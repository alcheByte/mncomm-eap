<template>
  <b-card header-tag="header">
    <template #header>
       <b-row class="justify-content-center">
            Income Summary
        </b-row>
    </template>
    <b-container class="pt-2">
      <b-row
        v-for="_missing in missingIncomeInfo"
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
        <!-- Member Incomes -->
        <div v-for="_resident in CurrentApplication.residents"
          :key="_resident.id"
          class="summary-panel m-3"
        >
          <b-row class="justify-content-center px-3 pt-2">
            <h5>{{ _residentFullName(_resident) }}</h5>
          </b-row>
          <b-row class="justify-content-center pb-2">
            had income from
          </b-row>
          <b-row
            class="missing-info px-2"
            v-for="_missing in missingIncomeInfo.filter(mi => mi.resId === _resident.id && !mi.type)"
            :key="_missing.id"
          >
            {{ _missing.desc }} <b-icon icon="exclamation-octagon-fill" class="emphasize center-v ml-1"/>
          </b-row>
          <div class="p-2" v-if="_resident.income">
            <b-row v-if="_resident.income.hasIncome === false" class="justify-content-center pb-1">
              No Income
            </b-row>
            <b-row
              v-for="_src in _resident.income.sources"
              :key="_src.type"
              class="justify-content-center pb-1"
              no-gutters
            >
                {{ _getIncomeTitle(_src.type) }}
                <b-icon v-if="_isMissingInfo(_resident, _src.type)" :title="_getMissingInfo(_resident, _src.type)" icon="exclamation-triangle" class="missing-info center-v ml-1"/>
            </b-row>
          </div>
          <b-row class="justify-content-center p-2">
            <b-button :to="_getEditRoute(_resident)">
              <b-icon icon="pencil-fill" class="icon"/> Edit
            </b-button>
          </b-row>
        </div>
      </b-row>
    </b-container>
    <!-- modals -->
    <b-modal id="modal-edit-income" v-model="showEdit" title="Edit Member Income" hide-footer size="md">
      <Income v-if="!isMinor(curResident)" :income="curIncome" :resident="curResident" :onComplete="incomeCompleted" class="p-3 mb-4" />
      <ChildIncome v-if="isMinor(curResident)" :income="curIncome" :resident="curResident" :onComplete="incomeCompleted" class="p-3 mb-4" />
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
import Income from './Income'
import ChildIncome from './ChildIncome'

export default {
  name: 'ReviewIncome',
  components: { Income, ChildIncome },
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentApplication',
      'IncomeSources'
    ])
  },
  created () {
    this._loadMissingInfo()
  },
  methods: {
    _loadMissingInfo () {
      if (this.CurrentApplication) {
        this.missingIncomeInfo = this.CurrentApplication.missingInfo.filter(mi => mi.section === 'INCOME' && mi.needsDoc !== true)
      }
    },
    _getEditRoute (resident) {
      return { name: 'ApplyStep5', params: { editId: resident.id } }
    },
    _validateIncomeSource (src) {
    },
    _getIncomeTitle (_src) {
      var source = this.IncomeSources.find(s => s.type === _src)
      if (source) return source.title
    },
    _isMissingInfo (resident, type) {
      return this.missingIncomeInfo.findIndex(mi => mi.resId === resident.id && mi.type === type) > -1
    },
    _getMissingInfo (resident, type) {
      var missing = this.missingIncomeInfo.find(mi => mi.resId === resident.id && mi.type === type)
      if (missing) return missing.desc
    },
    _residentFullName (res) {
      return res.firstname + ' ' + (res.middlename ? res.middlename + ' ' + res.lastname : res.lastname)
    },
    incomeCompleted () {
      this.showEdit = false
      this.curResident = null
      this.curIncome = null
      this.$store.dispatch('updateMissingInfo')
      this._loadMissingInfo()
    },
    isMinor (resident) {
      if (!resident) return false
      var age = this._calculateAge(resident.dateofbirth)
      return age < 18
    },
    _calculateAge (birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    fix (missing) {
      var res = this.CurrentApplication.residents.find(r => r.id === missing.resId)
      if (res) {
        this.curResident = {...res}
        this.curIncome = res.income
        this.showEdit = true
      }
    }
  },
  data () {
    return {
      missingIncomeInfo: [],
      showEdit: false,
      curIncome: null,
      curResident: null
    }
  }
}
</script>
