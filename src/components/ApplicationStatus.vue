<template>
  <div id="applicationstatus">
    <b-row class="panel-header" no-gutters>
      <b-col>Apply for Energy Assistance</b-col>
      <b-col sm="auto" class="flex-center p-1">
        <b-progress v-if="CurrentApplication" :max="totalSteps" variant="success">
          <b-progress-bar :value="CurrentApplication.stepsCompleted">
            {{ percentComplete () }}
          </b-progress-bar>
        </b-progress>
      </b-col>
      <b-col sm="auto" class="flex-center p-1">
        <b-button variant="info" v-b-modal.modal-help>I Need Help<b-icon icon="question-circle" class="ml-2"/></b-button>
      </b-col>
    </b-row>
    <CrumbBar v-if="CurrentApplication"
      :crumbs="appSections"
      :activeStep="curStep"
      :stepsCompleted="CurrentApplication.stepsCompleted"
      :size="crumbSize"
    />
    <b-modal id="modal-help" title="Service Provider Contact Info" ok-only size="md">
      <b-container class="p-4">
        <ServiceProvider />
      </b-container>
    </b-modal>
  </div>
</template>

<style scoped>
.progress {
  font-size: .85rem;
  line-height: 1.5;
  height: 100%;
  width: 231px;
}

@media only screen and (max-width: 768px)
{
  .progress {
    font-size: .85rem;
    line-height: 1.5;
    height: 100%;
    min-height: 31px;
    max-width: 231px;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import CrumbBar from './CrumbBar.vue'
import ServiceProvider from './ServiceProvider.vue'

export default {
  name: 'ApplicationStatus',
  components: { CrumbBar, ServiceProvider },
  props: {
    curStep: 0
  },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication'
    ])
  },
  methods: {
    stepIsActive (steps) {
      return steps.includes(this.curStep)
    },
    partIsComplete (lastStep) {
      return this.CurrentApplication && this.CurrentApplication.stepsCompleted >= lastStep
    },
    disableStep (step) {
      return !this.CurrentApplication || this.CurrentApplication.stepsCompleted < step
    },
    percentComplete () {
      if (this.CurrentApplication) {
        var percent = this.CurrentApplication.stepsCompleted / this.totalSteps * 100
        return percent + '% complete'
      }
      return ''
    },
    showSPInfo () {
      this.showHelp = true
    }
  },
  data () {
    return {
      crumbSize: 'large',
      totalSteps: 10,
      showHelp: false,
      appSections: [
        {
          name: 'Household',
          steps: [2, 3, 4],
          routeTo: 'ApplyStep2',
          action: () => {}
        },
        {
          name: 'Income',
          steps: [5],
          routeTo: 'ApplyStep5',
          action: () => {}
        },
        {
          name: 'Heat Sources',
          steps: [6, 7, 8],
          routeTo: 'ApplyStep6',
          action: () => {}
        },
        {
          name: 'Housing',
          steps: [9],
          routeTo: 'ApplyStep9',
          action: () => {}
        },
        {
          name: 'Review',
          steps: [10],
          routeTo: 'ApplyStep10',
          action: () => {}
        }
      ]
    }
  }
}
</script>
