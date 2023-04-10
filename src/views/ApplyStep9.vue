<template>
  <div id="applystep9" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
        <ApplicationStatus :curStep="9" />
      </template>
      <b-form @submit="onUpdateHousing" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-housing icon="info-circle" class="title-icon"/>Housing Information</h3></div>
          </b-row>
          <!-- <b-row class="pb-3" no-gutters>
            <p class="sub-title center-h">Do you rent or own? What type of housing, etc.?</p>
          </b-row> -->
          <Housing :onComplete="onFinishHousing"/>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :disableSubmit="!allCompleted" :backLabel="backLabel" :backTo="backTo"/>
      </b-form>
    </b-card>
    <b-modal id="modal-housing" title="Housing Instructions:" ok-only size="lg">
      <b-container>
        <p></p>
      </b-container>
    </b-modal>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationStatus from '../components/ApplicationStatus'
import ApplicationSteps from '../components/ApplicationSteps'
import Housing from '../components/Housing'

export default {
  name: 'ApplyStep9',
  components: { ApplicationStatus, ApplicationSteps, Housing },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    if (!this.CurrentApplication) {
      this.$router.push('Home')
    }
  },
  methods: {
    onFinishHousing () {
      this.allCompleted = true
    },
    onUpdateHousing () {
      this.$store.dispatch('finishHousing')
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep10')
      } else {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      curStep: '9',
      backLabel: 'Home Heating',
      submitLabel: 'Review & Submit',
      backTo: 'ApplyStep8',
      allCompleted: false
    }
  }
}
</script>
