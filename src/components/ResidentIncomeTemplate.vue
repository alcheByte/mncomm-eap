<template>
  <b-card :header="_residentFullName(resident)">
    <b-row class="centered" no-gutters>
      <b-col sm="auto"  class="p-2">
        <div>Age:</div>
        <div class="bold">{{ this._calculateAge(resident.dateofbirth) }}</div>
      </b-col>
      <b-col class="p-2">
        <div>Income Sources:</div>
        <div>{{ this.getResidentIncomeSources(resident.income) }}</div>
      </b-col>
      <b-col sm="auto" class="center-v p-2">
        <b-button @click="editIncome(resident)">
          <b-icon icon="pencil-fill" class="icon"/> Edit
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<style scoped>
.card {
  color: #224277;
  background-color: #FFFFFF;
  font-size: 16px;
  margin: 9px;
  margin-top: 0px;
  min-width: 385px;
}
.card-header {
  color: #224277;
  background-color: #a1c2e3 !important;
  padding: 0.7rem;
}
.icon {
    height: 100%;
    font-size: 1.4em;
}
@media only screen and (max-width: 475px) {
  .card {
      min-width: unset;
      width: 100%;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    resident: { required: true },
    editIncome: { required: true }
  },
  computed: {
    ...mapGetters([
      'IncomeSources'
    ])
  },
  methods: {
    _calculateAge (birthday) { // birthday is a date
      if (birthday) {
        var ageDifMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageDifMs) // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      }
      return NaN
    },
    getResidentIncomeSources (income) {
      if (income) {
        if (income.sources && income.sources.length > 0) {
          var types = income.sources.map(s => s.type)
          return this.IncomeSources.filter(is => types.includes(is.type)).map(is => is.title).join(', ')
        } else return 'None'
      } else return 'Not Entered'
    },
    _residentFullName (res) {
      return res.firstname + ' ' + (res.middlename ? res.middlename + ' ' + res.lastname : res.lastname)
    }
  }
}
</script>
