<template>
  <div id="landlord">
    <b-form-group
      label="Name:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input
        v-model="landlord.name"
        type="text"
        placeholder="Landlord's name"
        required
      />
    </b-form-group>
    <Address :address="landlord.address" :onComplete="addressComplete" />
  </div>
</template>

<style scoped>
#landlord {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import { mapGetters } from 'vuex'
import Address from '../components/Address'

export default {
  name: 'Landlord',
  components: { Address },
  props: {
    landlord: null,
    onComplete: { type: Function }
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
    addressComplete () {
      if (this.onComplete) this.onComplete()
    }
  },
  data () {
    return {
    }
  }
}
</script>
