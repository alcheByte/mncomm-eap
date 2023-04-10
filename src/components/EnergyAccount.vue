<template>
  <div id="energy-account">
    <b-row class="justify-content-center py-2" no-gutters>
      <v-autocomplete
        class="account"
        :items="filteredVendors"
        v-model="selectedVendor"
        :get-label="labelVendor"
        :component-item="templateVendor"
        :input-attrs="inputAttrs"
        :min-len="2"
        :auto-select-one-item="false"
        @update-items="updateVendors"
      />
    </b-row>
    <b-row v-if="selectedVendor" class="justify-content-center py-2" no-gutters>
        <b-form-group
          class="account"
          label="Name on Account"
          :invalid-feedback="accNameFeedback"
          :state="accNameState"
          label-align-sm="right"
          label-cols-sm="4"
        >
          <b-form-input
              v-model="accountName"
              type="text"
              :placeholder="hintAccountName()"
              @input="checkAccountName"
              required
          />
        </b-form-group>
    </b-row>
    <b-row v-if="selectedVendor" class="justify-content-center pb-2" no-gutters>
        <b-form-group
          class="account"
          label="Account Number"
          :invalid-feedback="accNumberFeedback"
          :state="accNumberState"
          label-align-sm="right"
          label-cols-sm="4"
        >
          <b-form-input
              v-model="accountNumber"
              type="text"
              :placeholder="hintAccountNumber()"
              @input="checkAccountNumber"
          />
        </b-form-group>
    </b-row>
    <b-row v-if="selectedVendor" class="justify-content-center pb-2" no-gutters>
      <div class="center-h">
        <p>{{ labelFuels }}</p>
        <b-form-group class="flex-center">
          <b-form-checkbox
            v-for="_option in getVendorFuels()"
            v-model="selectedFuels"
            :key="_option.value"
            :value="_option.value"
          >
            {{ _option.text }}
          </b-form-checkbox>
        </b-form-group>
      </div>
    </b-row>
    <b-row v-if="selectedVendor" class="justify-content-center py-1" no-gutters>
      <div class="centered">
        <b-button @click="saveEnergyAccount" :disabled="accountInvalid" variant="success" class="mb-2">
          <b-icon :icon="saveIcon()" style="margin-right: 9px" />{{ labelSave() }}
        </b-button>
        <b-button @click="removeEnergyAccount" v-if="!isNewAccount" variant="danger">
          <b-icon icon="x-circle" style="margin-right: 9px" />Remove Energy Account
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<style scoped>
#energy-account {
  min-height: 300px;
}
.account {
  width: 100%;
  max-width: 450px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import EnergyVendorTemplate from './EnergyVendorTemplate'

export default {
  name: 'EnergyAccount',
  components: {},
  props: {
    account: null,
    onComplete: null
  },
  computed: {
    ...mapGetters(['CurrentApplication', 'SPEnergyProviders', 'VendorFuels', 'ServiceProvider']),
    accNumberState () {
      return this.accountNumber && this.accountNumber.length >= 4
    },
    accNumberFeedback () {
      if (this.accountNumber && this.accountNumber.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter an account number for ' + this.selectedVendor.vendor_name
    },
    accNameState () {
      return this.accountName && this.accountName.length >= 4
    },
    accNameFeedback () {
      if (this.accountName && this.accountName.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter a name for the account at ' + this.selectedVendor.vendor_name
    },
    labelFuels () {
      return `What type(s) of fuel does ${this.selectedVendor.vendor_name} provide to your home?`
    }
  },
  created () {
    this.filteredVendors = this.SPEnergyProviders
    if (this.account) {
      this.selectedVendor = this.SPEnergyProviders.find(
        (v) => v.vendor_id === this.account.vendor_id
      )
      this.accountNumber = this.account.accountNumber
      this.accountName = this.account.accountName
      this.selectedFuels = this.account.fuels
      this.isNewAccount = false
      this.accountInvalid = false
    }
    var fuels = this.VendorFuels.map(vf => vf.fuel_type)
    var unique = [...new Set(fuels)]
    this.uniqueFuels = unique.map(f => ({ text: f, value: f }))
  },
  methods: {
    saveIcon () {
      return this.isNewAccount ? 'plus-circle' : 'check-circle'
    },
    labelSave () {
      return this.isNewAccount ? 'Add Energy Account' : 'Save Energy Account'
    },
    labelVendor (item) {
      if (item) return item.vendor_name
      return null
    },
    updateVendors (text) {
      if (!text || text.length < 2) {
        this.filteredVendors = this.SPEnergyProviders
      } else {
        this.filteredVendors = this.SPEnergyProviders.filter(
          (p) => p.vendor_name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      }
      if (this.filteredVendors.length < 1) {
        var unlistedVendor = { sp_id: this.ServiceProvider.sp_id, vendor_id: -1, vendor_name: text }
        this.filteredVendors.push(unlistedVendor)
      }
    },
    getVendorFuels () {
      if (this.selectedVendor) {
        if (this.selectedVendor.vendor_id === -1) {
          return this.uniqueFuels
        }
        return this.VendorFuels
          .filter(vf => vf.vendor_id === this.selectedVendor.vendor_id)
          .map(vf => ({ text: vf.fuel_type, value: vf.fuel_type }))
      }
    },
    hintAccountNumber () {
      if (this.selectedVendor) { return 'Enter account number with ' + this.selectedVendor.vendor_name }
      return 'Select an energy vendor'
    },
    checkAccountNumber () {
      this.accountInvalid =
        !this.accountNumber || this.accountNumber.length < 4
    },
    hintAccountName () {
      if (this.selectedVendor) { return 'Enter account name with ' + this.selectedVendor.vendor_name }
      return 'Select an energy vendor'
    },
    checkAccountName () {
      this.accountInvalid =
        !this.accountName || this.accountName.length < 4
    },
    saveEnergyAccount () {
      this.$store.dispatch('saveEnergyAccount', {
        id: this.account ? this.account.id : null,
        vendor_id: this.selectedVendor.vendor_id,
        vendor_name: this.selectedVendor.vendor_name,
        accountNumber: this.accountNumber,
        accountName: this.accountName,
        fuels: this.selectedFuels
      })
      if (this.onComplete) this.onComplete()
    },
    removeEnergyAccount () {
      this.$store.dispatch('removeEnergyAccount', {
        id: this.account.id
      })
      if (this.onComplete) this.onComplete()
    }
  },
  data () {
    return {
      templateVendor: EnergyVendorTemplate,
      inputAttrs: {
        placeholder: 'Enter company name'
      },
      uniqueFuels: [],
      filteredVendors: [],
      selectedVendor: null,
      accountInvalid: true,
      accountName: '',
      accountNumber: '',
      selectedFuels: [],
      isNewAccount: true
    }
  }
}
</script>
