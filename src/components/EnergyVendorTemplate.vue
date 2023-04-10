<template>
  <b-row no-gutters>
    <div v-if="item.vendor_id === -1">
      <!-- <b>#{{item.vendor_id}}</b> -->
      <span>Add unlisted vendor '{{ item.vendor_name }}'</span>
    </div>
    <div v-if="item.vendor_id !== -1">
      <!-- <b>#{{item.vendor_id}}</b> -->
      <span>{{ item.vendor_name }}</span>
      <abbr>{{ item.vendor_id }}</abbr>
    </div>
  </b-row>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>
