<template>
  <div id="applicationsteps">
    <b-container fluid>
      <b-row class="btn-row">
        <b-col sm="auto" class="flex-center">
          <b-button to="Home" variant="info" @click="saveApplication" class="p-3 m-2"><b>Save and Continue Later</b><b-icon icon="cloud-check" style="margin-left: 9px;"/></b-button>
        </b-col>
        <b-col>
          <b-row class="nav-buttons">
            <b-button v-if="backTo" :to="backTo" class="p-3 m-2 back-button"><b-icon icon="arrow-left-circle" style="margin-right: 9px"/>Back: {{ backLabel }}</b-button>
            <b-button type="submit" :disabled="disableSubmit" class="p-3 m-2 next-button" variant="success">Next: {{ submitLabel }}<b-icon icon="arrow-right-circle" style="margin-left: 9px"/></b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.btn-row {
    flex-wrap: wrap-reverse;
}
.nav-buttons {
    flex-wrap: wrap-reverse;
    justify-content: end;
}
.back-button {
  min-width: 200px;
}
.next-button {
  min-width: 200px;
}
@media only screen and (max-width: 475px) {
  .nav-buttons {
      justify-content: center;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ApplicationSteps',
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  props: {
    curStep: null,
    backTo: null,
    backLabel: null,
    submitLabel: null,
    disableSubmit: null
  },
  methods: {
    saveApplication () {
      var app = JSON.stringify(this.CurrentApplication, null, 1)
      if (navigator.clipboard) {
        this.copy(`const CurrentApplication = ${app}`)
      }
      console.log(app)
    },
    async copy (s) {
      await navigator.clipboard.writeText(s)
      alert('EAP Application JSON copied to clipboard!')
    }
  },
  data () {
    return {
    }
  }
}
</script>
