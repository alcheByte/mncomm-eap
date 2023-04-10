<template>
  <div id="owner-info">
    <b-container class="py-2">
      <b-row class="justify-content-center py-1">How much is your monthly mortgage payment (enter 0 if you do not have a monthly payment)?</b-row>
      <b-row class="justify-content-center py-1">
        <b-form-input v-model="info.mortgage" type="number" style="width: 150px"/>
      </b-row>
      <b-row v-if="info.status !== null" class="justify-content-center py-1">
        <b-col md="auto">
          <b-row class="justify-content-center py-1">Do you rent out any part of your home?</b-row>
          <b-row class="justify-content-center py-1">
            <b-form-radio-group v-model="info.rented" :options="rentOptions"/>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="info.status !== null && info.rented !== null" class="justify-content-center py-1">
        <b-col md="auto">
          <b-row class="justify-content-center py-1">If you are self-employed, is the business at your home?</b-row>
          <b-row class="justify-content-center py-1">
            <b-form-radio-group v-model="info.usedForBusiness" @change="onComplete" :options="businessOptions"/>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="info.status !== null && info.rented !== null" class="justify-content-center py-1">
        <b-form-checkbox v-if="!info.heatNotWorking" v-model="info.heatNotWorking" size="lg" class="ml-3">
          My heating system is not currently working
        </b-form-checkbox>
        <b-alert v-if="info.heatNotWorking" show variant="warning">
          <b-form-checkbox v-model="info.heatNotWorking" size="lg">
            My heating system is not currently working
          </b-form-checkbox>
        </b-alert>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OwnershipInfo',
  props: {
    info: {
      type: Object
    },
    onComplete: { type: Function }
  },
  components: { },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
  },
  methods: {
  },
  data () {
    return {
      ownOptions: [
        { text: 'I pay a mortgage', value: 'mortgaged' },
        { text: 'I own my home', value: 'owned' }
      ],
      rentOptions: [
        { text: 'Yes', value: 'rented' },
        { text: 'No', value: 'not-rented' }
      ],
      businessOptions: [
        { text: 'Yes', value: 'home-office' },
        { text: 'No', value: 'none' }
      ]
    }
  }
}
</script>
