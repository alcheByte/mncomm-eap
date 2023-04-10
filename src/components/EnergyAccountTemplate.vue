<template>
  <b-card :header="account.vendor_name">
    <b-row class="pb-2 centered" no-gutters>
      <b-col class="p-2">
        <div>Account #:</div>
        <div class="bold">{{ account.accountNumber }}</div>
      </b-col>
      <b-col class="p-2">
        <div>Name:</div>
        <div class="bold">{{ account.accountName }}</div>
      </b-col>
      <b-col class="p-2">
        <div>Fuels:</div>
        <div class="bold">{{ account.fuels.join() }}</div>
      </b-col>
    </b-row>
    <b-row class="justify-content-center p-2">
      <b-button @click="editAccount(account)">
        <b-icon icon="pencil-fill" class="center-v icon"/> Edit
      </b-button>
    </b-row>
  </b-card>
</template>

<style scoped>
.card {
  color: #224277;
  background-color: #FFFFFF;
  font-size: 16px;
  margin: 9px;
  margin-top: 0px;
  min-width: 413px;
}
.card-header {
  color: #224277;
  background-color: #a1c2e3 !important;
  padding: 0.7rem;
}
.icon {
    height: 100%;
    font-size: 1.4em;
}
@media only screen and (max-width: 475px) {
  .card {
    min-width: unset;
    width: 100%;
  }
}
</style>

<script>
export default {
  props: {
    account: { required: true },
    editAccount: { required: true }
  }
}
</script>
