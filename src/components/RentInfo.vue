<template>
  <div id="rent-info">
    <!-- subsidized? -->
    <b-container class="py-2">
      <b-row class="justify-content-md-center py-1">
        <b-col md="auto">
          <b-row class="justify-content-md-center py-1">Do you get a rent subsidy or live in subsidized housing?</b-row>
          <b-row class="justify-content-md-center py-1">
            <b-form-radio-group v-model="info.subsidized" :options="yesno"/>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="info.subsidized !== null">
        <b-col>
          <b-row class="justify-content-center py-1 pt-3">How much is your monthly rent payment (enter 0 if you do not have a monthly payment)?</b-row>
          <b-row class="justify-content-center pb-2">
            <b-form-input v-model="info.monthlyAmount" type="number" style="width: 150px"/>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="info.monthlyAmount !== null">
        <b-col>
          <b-row class="justify-content-md-center py-1 pt-3">Is heat or electricity included in your rent (check all that apply)?</b-row>
          <b-row class="justify-content-md-center pb-2">
            <b-form-checkbox-group v-model="info.includes" :options="rentincludes" />
          </b-row>
          <!-- <b-row class="justify-content-md-center py-1">
            <b-button @click="saveRent" variant="success"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Rent Info</b-button>
          </b-row> -->
        </b-col>
      </b-row>
      <b-row v-if="info.monthlyAmount !== null" class="justify-content-md-center py-1 pt-3">
        <b-col>
          <p class="centered"><strong>Enter Landlord Information</strong></p>
          <Landlord :landlord="info.landlord" :onComplete="landlordComplete"/>
          <!-- <b-row class="justify-content-md-center py-1">
            <b-button @click="saveLandlord" variant="success"><b-icon icon="check-circle-fill" style="margin-right: 9px;"/>Save Landlord Info</b-button>
          </b-row> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import Landlord from '../components/Landlord'

export default {
  name: 'RentInfo',
  props: {
    info: {
      type: Object
    },
    onComplete: { type: Function }
  },
  components: { Landlord },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
  },
  methods: {
    landlordComplete () {
      if (this.onComplete) this.onComplete()
    }
  },
  data () {
    return {
      yesno: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      rentincludes: [
        { text: 'Heat', value: 'heat' },
        { text: 'Electricity', value: 'electricity' }
      ]
    }
  }
}
</script>
