<template>
  <div id="applystep8" class="grid-fill">
    <b-card v-if="CurrentApplication" header-tag="header">
      <template #header>
        <ApplicationStatus :curStep="8" />
      </template>
      <b-form @submit="onUpdateHeating" class="app-form">
        <div class="sheet">
          <b-row class="justify-content-center pb-3">
            <div><h3><b-icon v-b-modal.modal-heating icon="info-circle" class="title-icon"/>Home Heating</h3></div>
          </b-row>
          <b-row class="pb-2" no-gutters>
            <p class="sub-title center-h">Where does most of your heat come from?</p>
          </b-row>
          <b-row align-h="center" >
            <b-form-group>
              <b-form-radio-group v-model="primaryFuel" :options="vendorFuels" stacked @input="selectPrimaryFuel" />
            </b-form-group>
          </b-row>
          <div v-if="showElectric">
            <b-row  class="justify-content-center">
              Most homes in Minnesota do not have electric heat. Click "Yes" below only if your home has:
            </b-row>
            <b-row class="justify-content-center pb-3">
              <ul>
                <li>One or more living spaces where space heaters are the only source of heat</li>
                <li>Electric baseboard heat</li>
                <li>In-floor electric heat</li>
              </ul>
            </b-row>
            <b-row class="justify-content-center">
              <b-button @click="hasElectricHeat(true)" variant="success" class="mr-2">
                <b-row class="justify-content-center" style="font-size: 1.5rem;">Yes</b-row>
                <b-row class="justify-content-center p-2" style="font-size: .8rem;">My home has electric heat</b-row>
              </b-button>
              <b-button @click="hasElectricHeat(false)" variant="success">
                <b-row class="justify-content-center" style="font-size: 1.5rem;">No</b-row>
                <b-row class="justify-content-center p-2" style="font-size: .8rem;">My home does not have electric heat</b-row>
              </b-button>
            </b-row>
          </div>
        </div>
        <ApplicationSteps :curStep="curStep" :submitLabel="submitLabel" :disableSubmit="!allCompleted" :backLabel="backLabel" :backTo="backTo"/>
      </b-form>
    </b-card>
    <b-modal id="modal-heating" title="Home Heating Instructions:" ok-only size="lg">
      <b-container>
        <p></p>
      </b-container>
    </b-modal>
  </div>
</template>

<style scoped>
.emph-1 {
  font-size: 1.25em;
}
</style>

<script>
import { mapGetters } from 'vuex'
import ApplicationStatus from '../components/ApplicationStatus'
import ApplicationSteps from '../components/ApplicationSteps'

export default {
  name: 'ApplyStep8',
  components: {
    ApplicationStatus,
    ApplicationSteps
  },
  computed: {
    ...mapGetters([
      'CurrentApplication',
      'VendorFuels'
    ]),
    vendorFuels () {
      if (this.CurrentApplication && this.CurrentApplication.energyAccounts) {
        var fuels = this.CurrentApplication.energyAccounts.flatMap(a => a.fuels)
        var unique = [...new Set(fuels)]
        return unique.map(f => ({ text: f, value: f }))
      }
      return []
    },
    allCompleted () {
      return this.primaryFuel &&
            ((this.primaryFuel === 'Electricity' && this.electricHeatVerified) ||
            (this.primaryFuel !== 'Electricity'))
    }
  },
  created () {
    if (this.CurrentApplication) {
      this.primaryFuel = this.CurrentApplication.primaryFuel
    } else {
      this.$router.push('Home')
    }
  },
  methods: {
    selectPrimaryFuel () {
      this.showElectric = false
      this.showBioFuels = false
      // this.electricHeatVerified = null
      switch (this.primaryFuel) {
        case 'Electricity':
          // this.showElectric = true
          break
        case 'Wood':
        case 'Biofuel':
          this.showBioFuels = true
          break
          // case 'Propane / LP':
          // case 'Metered Propane/LP':
          // case 'Natural Gas':
          // case 'Oil':
          // case 'Muni.Steam':
          // case 'St.Paul Dist.Htg':
          // break
      }
    },
    hasElectricHeat (ans) {
      this.electricHeatVerified = ans
      if (ans === false) {
        this.primaryFuel = null
      }
      this.showElectric = false
    },
    onUpdateHeating () {
      this.$store.dispatch('updateHeating', this.primaryFuel)
      if (this.CurrentApplication) {
        this.$router.push('ApplyStep9')
      } else {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      curStep: '8',
      backLabel: 'Heat Emergency',
      submitLabel: 'Housing',
      backTo: 'ApplyStep7',
      showElectric: false,
      showBioFuels: false,
      selectedFuels: [],
      primaryFuel: null,
      electricHeatVerified: true
    }
  }
}
</script>
