<template>
  <b-card header-tag="header">
    <template #header>
      <b-row class="justify-content-center">
        Payments
      </b-row>
    </template>
    <b-container class="pt-2">
    </b-container>
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
export default {
  name: 'Payments',
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication) {
    }
  },
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>
