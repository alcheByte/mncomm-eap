<template>
  <div id="service-provider">
    <b-container>
      <b-row class="justify-content-center provider">Your local energy assistance office is <b>&nbsp;{{ServiceProvider.organization}}</b></b-row>
      <b-row class="justify-content-center provider">If you need help completing your application, you can call them at <b>&nbsp;{{ServiceProvider.contact}}</b>.</b-row>
    </b-container>
  </div>
</template>

<style scoped>
.provider {
  color: saddlebrown;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceProvider',
  props: {
    landlord: null
  },
  computed: {
    ...mapGetters([
      'ServiceProvider'
    ])
  },
  watch: {
  },
  created () {
  },
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>
