<template>
  <div id="applystep10" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
          <ApplicationStatus :curStep="10" />
      </template>
      <b-form @submit="onSubmitApplication" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-2">
            <div><h3>Review and Submit Application</h3></div>
          </b-row>
          <b-row no-gutters>
            <p class="sub-title center-h">Please review your information before submitting your application</p>
          </b-row>
          <div v-if="CurrentApplication.missingInfo.filter(mi => mi.severity === 'required').length > 0">
            <b-alert show variant="warning" class="w-100">
                We will need the information marked with <b-icon icon="exclamation-triangle-fill" class="emphasize"/> below to process your application.
                <br/>
                If you do not submit it here, we will contact you to request it.
            </b-alert>
          </div>
          <b-row class="justify-content-center pb-2" no-gutters>
            <ReviewDocuments />
          </b-row>
          <div v-if="CurrentApplication.missingInfo.filter(mi => mi.severity === 'critical').length > 0">
            <b-alert show variant="danger" class="w-100">
                The information marked with <b-icon icon="exclamation-octagon-fill" class="emphasize"/> below is required to submit your application.
            </b-alert>
          </div>
          <b-row class="justify-content-center pb-2" no-gutters>
            <ReviewHousehold/>
          </b-row>
          <b-row class="justify-content-center pb-2" no-gutters>
            <ReviewIncome/>
          </b-row>
          <b-row class="justify-content-center pb-2" no-gutters>
            <ReviewHeatSources/>
          </b-row>
          <b-row class="justify-content-center pb-2" no-gutters>
            <ReviewHousing/>
          </b-row>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :backLabel="backLabel" :backTo="backTo" :disableSubmit="DisableSubmit"/>
      </b-form>
    </b-card>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationStatus from '../components/ApplicationStatus'
import ApplicationSteps from '../components/ApplicationSteps'
import ReviewDocuments from '../components/ReviewDocuments'
import ReviewHousehold from '../components/ReviewHousehold'
import ReviewIncome from '../components/ReviewIncome'
import ReviewHeatSources from '../components/ReviewHeatSources'
import ReviewHousing from '../components/ReviewHousing'

export default {
  name: 'ApplyStep10',
  components: { ApplicationStatus, ApplicationSteps, ReviewDocuments, ReviewHousehold, ReviewIncome, ReviewHeatSources, ReviewHousing },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ]),
    DisableSubmit () {
      return this.CurrentApplication.missingInfo.filter(mi => mi.severity === 'critical').length > 0
    }
  },
  created () {
    if (!this.CurrentApplication) {
      this.$router.push('Home')
    } else {
      this.$store.dispatch('updateMissingInfo')
    }
  },
  methods: {
    onSubmitApplication () {
      this.$store.dispatch('submitApplication', {
      })
      if (this.CurrentApplication) {
        this.$router.push('ApplySubmitted')
      } else {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      curStep: '10',
      backLabel: 'Housing',
      submitLabel: 'Submit Application to EAP',
      backTo: 'ApplyStep9'
    }
  }
}
</script>
