<template>
  <b-card :header="_residentFullName(resident)">
    <b-row class="centered" no-gutters>
      <b-col>
        <div>Gender:</div>
        <div class="bold">{{ _gender () }}</div>
      </b-col>
      <b-col>
        <div>Age:</div>
        <div class="bold">{{ this._calculateAge(resident.dateofbirth) }}</div>
      </b-col>
      <b-col sm="auto" class="center-v">
        <b-button @click="editResident(resident)">
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
    font-size: 1.2em;
}
@media only screen and (max-width: 475px) {
  .card {
      min-width: unset;
      width: 100%;
  }
}
</style>

<script>
export default {
  props: {
    resident: { required: true },
    editResident: { required: true }
  },
  methods: {
    _gender () {
      switch (this.resident.gender) {
        case 'enter': return this.resident.genderOther
        case 'na': return 'N/A'
        case 'F': return 'Female'
        case 'M': return 'Male'
      }
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
    }
  }
}
</script>
