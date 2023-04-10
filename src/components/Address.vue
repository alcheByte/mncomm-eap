<template>
  <div id="address">
    <b-form-group
      label="Address:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input
        v-model="address.line1"
        type="text"
        placeholder="House Number and Street"
        required
        :autofocus="autofocus"
        @input="checkComplete"
      />
    </b-form-group>
    <b-form-group
      v-if="showAddress2"
      label="Address 2:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input
        v-model="address.line2"
        type="text"
        placeholder="Apt#, Suite#, etc. (optional)"
      />
    </b-form-group>
    <b-form-group
      label="City:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input
        v-model="address.city"
        type="text"
        placeholder="City"
        required
        @input="checkComplete"
      />
    </b-form-group>
    <b-form-group
      label="State:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input
        v-model="address.state"
        type="text"
        placeholder="State"
        :disabled="disableState"
        @input="checkComplete"
      />
    </b-form-group>
    <b-form-group
      label="Zip Code:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input
        v-model="address.zipcode"
        type="text"
        placeholder="Zip Code"
        required
        @input="checkComplete"
      />
    </b-form-group>
  </div>
</template>

<style scoped>
#address {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Address',
  props: {
    address: null,
    disableState: false,
    showAddress2: true,
    onComplete: { type: Function },
    autofocus: false
  },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  watch: {
  },
  created () {
  },
  methods: {
    checkComplete () {
      if (!this.onComplete) return
      if (this.address.line1 && this.address.city && this.address.state && this.address.zipcode) {
        this.onComplete()
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
