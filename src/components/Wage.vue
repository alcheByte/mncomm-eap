<template>
  <div id="wage">
    <b-form-group
      label="Employer:"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm="6"
      content-cols-lg="7"
    >
      <b-form-input
        v-model="wage.employer"
        type="text"
        placeholder="Employer name"
        autofocus
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="3-Month Total:"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm="6"
      content-cols-lg="7"
    >
      <b-form-input
        v-model="wage.amount"
        type="text"
        placeholder="Enter gross monthly wages for the previous 3 months"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Wage',
  props: {
    wage: null,
    resident: null,
    wageComplete: null
  },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication',
      'LastThreeMonths'
    ])
  },
  methods: {
  },
  data () {
    return {
      showEditor: false
    }
  }
}
</script>
