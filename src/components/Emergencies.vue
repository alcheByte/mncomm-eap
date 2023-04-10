<template>
  <div id="emergencies" v-if="emergencies">
    <b-row class="pb-3">
      <b-form-checkbox v-if="!hasPastDue" v-model="hasPastDue" size="lg" class="ml-3" @input="onTogglePastDue">
        I have a past due energy bill I can’t pay
      </b-form-checkbox>
      <b-alert v-if="hasPastDue" show variant="warning" class="w-100">
        <b-form-checkbox v-model="hasPastDue" size="lg" @input="onTogglePastDue">
          I have a past due energy bill I can’t pay
          <span v-if="clientAccounts.length > 1" class="check-all">(check all that apply)</span>
        </b-form-checkbox>
        <b-input-group
          v-for="acct in clientAccounts"
          :key="acct.val"
          class="px-5 mt-2"
        >
          <b-input-group-prepend
            v-if="clientAccounts.length > 1"
            is-text>
            <input
              type="checkbox"
              v-model="emergencies.pastDueAccounts"
              :value="acct.value" />
          </b-input-group-prepend>
          <b-input-group-prepend is-text><b>{{ acct.text }}</b></b-input-group-prepend>
        </b-input-group>
      </b-alert>
    </b-row>
    <b-row class="pb-3">
      <b-form-checkbox v-if="!hasDisconnectNotice" v-model="hasDisconnectNotice" size="lg" class="ml-3" @input="onToggleDisconnect">
        I have a disconnect notice from my energy company
      </b-form-checkbox>
      <b-alert v-if="hasDisconnectNotice" show variant="warning" class="w-100">
        <b-form-checkbox v-model="hasDisconnectNotice" size="lg" @input="onToggleDisconnect">
          I have a disconnect notice from my energy company
          <span v-if="emergencies.disconnects.length > 1" class="check-all">(check all that apply)</span>
        </b-form-checkbox>
        <b-row class="justify-content-center mt-1 mb-3 center-v">
          When is your disconnect scheduled?
        </b-row>
        <b-input-group
          v-for="disconnect in emergencies.disconnects"
          :key="disconnect.account_id"
          class="px-5 mt-2"
        >
          <b-input-group-prepend
            v-if="emergencies.disconnects.length > 1"
            is-text>
            <input
              type="checkbox"
              v-model="disconnect.wasNotified"
            />
          </b-input-group-prepend>
          <b-input-group-prepend is-text><b>{{ getAccountLabel(disconnect.account_id) }}</b></b-input-group-prepend>
          <b-form-input :disabled="!disconnect.wasNotified" v-model="disconnect.date" type="date"/>
        </b-input-group>
      </b-alert>
    </b-row>
    <b-row class="pb-3">
      <b-form-checkbox v-if="!wasShutOff" v-model="wasShutOff" size="lg" class="ml-3" @input="onToggleShutOff">
        I’ve been shut off by my energy company
      </b-form-checkbox>
      <b-alert v-if="wasShutOff" show variant="warning" class="w-100">
        <b-form-checkbox v-model="wasShutOff" size="lg" @input="onToggleShutOff">
          I’ve been shut off by my energy company
          <span v-if="emergencies.shutOffs.length > 1" class="check-all">(check all that apply)</span>
        </b-form-checkbox>
        <b-row class="justify-content-center mt-1 mb-3 center-v">
          When were you shut off?
        </b-row>
        <b-input-group
          v-for="shutOff in emergencies.shutOffs"
          :key="shutOff.account_id"
          class="px-5 mt-2"
        >
          <b-input-group-prepend
            v-if="emergencies.shutOffs.length > 1"
            is-text>
            <input
              type="checkbox"
              v-model="shutOff.wasShutOff"
            />
          </b-input-group-prepend>
          <b-input-group-prepend is-text><b>{{ getAccountLabel(shutOff.account_id) }}</b></b-input-group-prepend>
          <b-form-input :disabled="!shutOff.wasShutOff" v-model="shutOff.date" type="date" style="justify-content: end;"/>
        </b-input-group>
      </b-alert>
    </b-row>
    <b-row class="pb-3">
      <b-form-checkbox v-if="!emergencies.lowTank" v-model="emergencies.lowTank" size="lg" class="ml-3">My fuel tank is less than 20% full...</b-form-checkbox>
      <b-alert v-if="emergencies.lowTank" show variant="warning" class="w-100">
        <b-form-checkbox v-model="emergencies.lowTank" size="lg">My fuel tank is less than 20% full...</b-form-checkbox>
        <b-row class="justify-content-center mt-1 mb-3 center-v">
          How full is your tank today? <span v-if="emergencies.lowTankLevel" class="emphasize ml-2">{{ emergencies.lowTankLevel === '0' ? 'Empty' : emergencies.lowTankLevel + ' %' }}</span>
        </b-row>
        <b-input-group prepend="Empty" append="20 %" class="mt-3">
          <b-form-input v-model="emergencies.lowTankLevel" type="range" min="0" max="20" step="5"></b-form-input>
        </b-input-group>
      </b-alert>
    </b-row>
  </div>
</template>

<style scoped>
#emergencies {
  max-width: 650px;
}
.check-all {
  font-size: .75em;
  font-weight: bold;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Emergencies',
  props: {
    emergencies: { required: true }
  },
  components: { },
  computed: {
    ...mapGetters([
      'CurrentApplication'
    ])
  },
  created () {
    if (this.CurrentApplication) {
      this.clientAccounts = this.CurrentApplication.energyAccounts.map(ea => ({ value: ea.id, text: `${ea.vendor_name} (${ea.accountNumber})` }))
      this.hasPastDue = this.emergencies.pastDueAccounts.length > 0
      this.hasDisconnectNotice = this.emergencies.disconnects.some(d => d.wasNotified === true)
      this.wasShutOff = this.emergencies.shutOffs.some(d => d.wasShutOff === true)
    }
  },
  methods: {
    getAccountLabel (id) {
      var found = this.CurrentApplication.energyAccounts.find(ea => ea.id === id)
      if (found) return `${found.vendor_name} (${found.accountNumber})`
    },
    onTogglePastDue (val) {
      this.emergencies.pastDueAccounts = (this.clientAccounts.length > 1 || !this.hasPastDue) ? [] : [this.clientAccounts[0].value]
    },
    onToggleDisconnect () {
      if (this.emergencies.disconnects.length === 1) {
        this.emergencies.disconnects[0].wasNotified = this.hasDisconnectNotice
      }
    },
    onDisconnectDate (val, acctId) {
      var found = this.emergencies.disconnects.find(d => d.account_id === acctId)
      if (found) found.date = val
    },
    onToggleShutOff () {
      if (this.emergencies.shutOffs.length === 1) {
        this.emergencies.shutOffs[0].wasShutOff = this.wasShutOff
      }
    },
    onShutOffDate (val, acctId) {
      var found = this.emergencies.shutOffs.find(d => d.account_id === acctId)
      if (found) found.date = val
    }
  },
  data () {
    return {
      clientAccounts: [],
      hasPastDue: false,
      hasDisconnectNotice: false,
      wasShutOff: false
    }
  }
}
</script>
