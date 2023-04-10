<template>
  <div id="housing">
    <b-container class="py-2">
      <!-- housing type -->
      <b-row class="justify-content-center py-1">
        <b-col md="auto">
          <b-row class="justify-content-center py-1">What type of housing do you live in?</b-row>
          <b-row class="justify-content-center">
            <b-form-radio-group v-model="housingType" :options="housingTypes" stacked required />
          </b-row>
        </b-col>
      </b-row>
      <!-- housing date -->
      <b-row v-if="housingType !== null" class="justify-content-center py-1">
        <b-col md="auto">
          <b-row class="justify-content-center py-1">How long have you lived at this address?</b-row>
          <b-row class="justify-content-center py-1">
            <b-form-group
              label="Years:"
              label-cols="4"
              content-cols="8"
              label-align="right"
            >
              <b-form-input
                v-model="residencyYears"
                type="number"
                max="120"
                placeholder="#"
                required
                style="max-width: 100px;"
                @input="inputYears"
              />
            </b-form-group>
            <b-form-group
              v-if="showMonths"
              label="Months:"
              label-cols="6"
              content-cols="6"
              label-align="right"
            >
              <b-form-input
                v-model="residencyMonths"
                type="number"
                max="12"
                placeholder="#"
                required
                style="max-width: 100px;"
                @input="inputMonths"
              />
            </b-form-group>
          </b-row>
        </b-col>
      </b-row>
      <!-- Rent or Own -->
      <b-row v-if="typeAndDateCompleted" class="justify-content-center py-1">
        <b-col md="auto">
          <b-row class="justify-content-center py-1">Do you rent or own your home?</b-row>
          <b-row class="justify-content-center py-1">
            <b-form-radio-group v-model="ownership" :options="rentorown" required/>
          </b-row>
        </b-col>
      </b-row>
      <RentInfo v-if="ownership === 'rent'" :info="rent" :onComplete="infoCompleted"/>
      <OwnershipInfo v-if="ownership === 'own'" :info="own" :onComplete="infoCompleted"/>
    </b-container>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import RentInfo from '../components/RentInfo'
import OwnershipInfo from '../components/OwnershipInfo'

export default {
  name: 'Housing',
  components: { RentInfo, OwnershipInfo },
  props: {
    onComplete: null
  },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ]),
    allCompleted () {
      return this.ownership !== null && this.subsidized !== null && this.landlordComplete && this.rentComplete
    }
  },
  watch: {
    usesBioFuels: function (ans) {
      this.usage.usedForHeat = ans
      if (ans === false) {
        this.saveUsage(true)
      }
    }
  },
  created () {
    if (this.CurrentApplication.housing) {
      var copy = {...this.CurrentApplication.housing}
      this.housingType = copy.type
      this.ownership = copy.ownership
      this.residencyYears = copy.residencyYears
      this.residencyMonths = copy.residencyMonths
      this.rent = {...copy.rent}
      this.own = {...copy.own}
      if (this.ownership !== null) this.typeAndDateCompleted = true
      if (this.residencyYears > 2) this.showMonths = false

      if (this.onComplete) this.onComplete()
    }
  },
  methods: {
    infoCompleted () {
      var housing = {
        type: this.housingType,
        isComplete: true,
        residencyYears: this.residencyYears,
        residencyMonths: this.residencyMonths,
        ownership: this.ownership,
        rent: this.rent,
        own: this.own
      }
      this.$store.dispatch('saveHousing', housing)
      if (this.onComplete) this.onComplete()
    },
    inputYears () {
      if (this.residencyYears > 2) {
        this.showMonths = false
        this.typeAndDateCompleted = true
      } else {
        this.showMonths = true
        this.typeAndDateCompleted = false
      }
    },
    inputMonths () {
      this.typeAndDateCompleted = true
    }
  },
  data () {
    return {
      rentorown: [
        { text: 'Rent', value: 'rent' },
        { text: 'Own', value: 'own' }
      ],
      housingTypes: [
        { text: 'House', value: 'house' },
        { text: 'Apartment/Condo', value: 'apartment' },
        { text: 'Townhouse', value: 'townhouse' },
        { text: 'Mobile Home', value: 'mobile_home' },
        { text: 'Duplex', value: 'duplex' },
        { text: 'Triplex', value: 'triplex' },
        { text: 'Fourplex', value: 'fourplex' },
        { text: 'Other', value: 'other' }
      ],
      housingType: null,
      residencyYears: null,
      residencyMonths: null,
      showMonths: true,
      otherType: null,
      ownership: null,
      rent: {
        includes: [],
        monthlyAmount: null,
        subsidized: null,
        landlord: {
          name: null,
          address: {
            line1: '',
            line2: '',
            city: '',
            state: 'MN',
            zipcode: '',
            county: ''
          }
        }
      },
      own: {
        mortgage: null,
        rented: null,
        usedForBusiness: null,
        heatNotWorking: false
      },
      typeAndDateCompleted: false
    }
  }
}
</script>
