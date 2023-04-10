<template>
  <b-container>
    <b-row class="justify-content-center pb-2">What racial/ethnic group(s) do you identify as (select all that apply)?</b-row>
    <b-row>
      <b-form-tags
        id="race-groups"
        v-model="selectedGroups"
        size="lg"
        class="mb-2"
        add-on-change
        no-outer-focus
        @input="onSelectGroup"
      >
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >
                {{ tag }}
              </b-form-tag>
            </li>
          </ul>
          <b-form-select
            v-if="showGroupSelect"
            v-bind="inputAttrs"
            v-on="inputHandlers"
            :disabled="disabled || availableGroups.length === 0"
            :options="availableGroups"
          >
            <template #first>
              <!-- This is required to prevent bugs with Safari -->
              <option value="" disabled>{{ tags.length > 0 ? 'Select another group...' : 'Select a group...' }}</option>
            </template>
          </b-form-select>
        </template>
      </b-form-tags>
    </b-row>
    <b-form-group
      v-if="enterGroup"
      label="Description:"
      label-cols="3"
      content-cols="9"
    >
      <b-form-input v-model="resident.race_ethnicity_groups[0].otherGroup" />
    </b-form-group>
    <div
      v-for="sub in availableSubGroups"
      :key="sub.group"
    >
      <b-row class="justify-content-center centered pb-2">You identified as {{ sub.groupName }}.<br/> If you like, you can further identify yourself below (select all that apply)</b-row>
      <b-row>
        <b-form-tags
          id="race-subgroups"
          v-model="sub.selections"
          size="lg"
          class="mb-2"
          add-on-change
          no-outer-focus
          @input="onSelectSubGroup(sub.group)"
        >
          <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
            <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
              <li v-for="tag in tags" :key="tag" class="list-inline-item">
                <b-form-tag
                  @remove="removeTag(tag)"
                  :title="tag"
                  :disabled="disabled"
                  variant="info"
                >
                  {{ tag }}
                </b-form-tag>
              </li>
            </ul>
            <b-form-select
              v-if="showOptions(sub)"
              v-bind="inputAttrs"
              v-on="inputHandlers"
              :disabled="disabled"
              :options="getSubGroupOptions(sub.group)"
            >
              <template #first>
                <!-- This is required to prevent bugs with Safari -->
                <option value="" disabled>{{ tags.length > 0 ? 'Select another sub-group...' : 'Select a sub-group...' }}</option>
              </template>
            </b-form-select>
          </template>
        </b-form-tags>
      </b-row>
      <b-form-group
       v-if="showOther(sub)"
        label="Description:"
        label-cols="3"
        content-cols="9"
      >
        <b-form-input v-model="sub.otherSubGroup" @input="editOther(sub)" />
      </b-form-group>
    </div>
  </b-container>
</template>

<style scoped>
#race-groups, #race-subgroups {
  border: 0px;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RaceEthnicity',
  components: { },
  props: {
    resident: { required: true }
  },
  computed: {
    ...mapGetters(['RaceEthnicityGroups']),
    availableGroups () {
      return this.RaceEthnicityGroups.filter(g => !this.selectedGroups.includes(g.desc)).map(g => g.desc)
    }
  },
  watch: {

  },
  created () {
    if (this.resident && this.resident.race_ethnicity_groups) {
      var groups = this.resident.race_ethnicity_groups.map(g => g.group)
      this.selectedGroups = this.RaceEthnicityGroups.filter(g => groups.includes(g.group)).map(g => g.desc)
      this.showGroupSelect = !groups.includes(0) && !groups.includes(10)
      this.enterGroup = groups.includes(10)
      this.setAvailableSubGroups()
    }
  },
  methods: {
    onSelectGroup () {
      this.enterGroup = false
      if (this.selectedGroups.length === 0) {
        this.resident.race_ethnicity_groups = []
        this.showGroupSelect = true
      } else if (this.selectedGroups.includes('Prefer not to answer')) {
        this.selectedGroups = ['Prefer not to answer']
        this.resident.race_ethnicity_groups = [{ group: 0, subGroups: [] }]
        this.showGroupSelect = false
      } else if (this.selectedGroups.includes('Prefer to self-describe')) {
        this.selectedGroups = ['Prefer to self-describe']
        this.resident.race_ethnicity_groups = [{ group: 10, subGroups: [] }]
        this.showGroupSelect = false
        this.enterGroup = true
      } else {
        var selected = this.RaceEthnicityGroups.filter(g => this.selectedGroups.some(d => d === g.desc))
        if (!this.resident.race_ethnicity_groups) {
          this.resident.race_ethnicity_groups = selected.map(g => ({ group: g.group, subGroups: null }))
        } else {
          // remove deleted
          this.resident.race_ethnicity_groups = this.resident.race_ethnicity_groups.filter(g => selected.findIndex(s => s.group === g.group) !== -1)
          // add any missing
          selected.forEach(sel => {
            var found = this.resident.race_ethnicity_groups.find(g => g.group === sel.group)
            if (!found) this.resident.race_ethnicity_groups.push({ group: sel.group, subGroups: null })
          })
        }
      }
      this.setAvailableSubGroups()
    },
    setAvailableSubGroups () {
      if (!this.resident.race_ethnicity_groups) {
        this.availableSubGroups = []
      } else {
        var availableSubs = []
        this.resident.race_ethnicity_groups.forEach(g => {
          var _group = this.RaceEthnicityGroups.find(t => t.group === g.group)
          if (_group.sub_groups.length) {
            if (g.subGroups) {
              var selected = _group.sub_groups.filter(sg => g.subGroups.includes(sg.subGroup)).map(sg => sg.desc)
              availableSubs.push({ group: g.group, groupName: _group.desc, otherGroup: g.otherGroup, selections: selected, otherSubGroup: g.otherSubGroup })
            } else {
              availableSubs.push({ group: g.group, groupName: _group.desc, otherGroup: g.otherGroup, selections: [], otherSubGroup: g.otherSubGroup })
            }
          }
        })
        this.availableSubGroups = availableSubs
      }
    },
    onSelectSubGroup (group) {
      var found = this.resident.race_ethnicity_groups.find(g => g.group === group)
      if (found) {
        var subGroup = this.availableSubGroups.find(sg => sg.group === group)
        var allSubGroups = this.RaceEthnicityGroups.find(g => g.group === group).sub_groups
        var selectedSubGroups = allSubGroups.filter(g => subGroup.selections.some(o => o === g.desc)).map(so => so.subGroup)
        if (selectedSubGroups.includes(0)) {
          found.subGroups = [0]
          subGroup.selections = [allSubGroups.find(sg => sg.subGroup === 0).desc]
        } else if (selectedSubGroups.includes(10)) {
          found.subGroups = [10]
          subGroup.selections = [allSubGroups.find(sg => sg.subGroup === 10).desc]
          found.otherSubGroup = group.otherSubGroup
        } else {
          found.subGroups = selectedSubGroups
        }
      }
    },
    getSubGroupOptions (group) {
      var allOptions = this.RaceEthnicityGroups.find(g => g.group === group).sub_groups.map(sg => sg.desc)
      var subGroup = this.availableSubGroups.find(sg => sg.group === group)
      if (subGroup.selections.length === 0) return allOptions
      var selectedOptions = subGroup.selections
      return allOptions.filter(o => !selectedOptions.some(s => s === o))
    },
    showOptions (subGroup) {
      var hidden = this.RaceEthnicityGroups.find(g => g.group === subGroup.group).sub_groups.filter(sg => sg.subGroup === 0 || sg.subGroup === 10).map(sg => sg.desc)
      return !subGroup.selections.some(s => hidden.some(h => h === s))
    },
    showOther (subGroup) {
      var hidden = this.RaceEthnicityGroups.find(g => g.group === subGroup.group).sub_groups.filter(sg => sg.subGroup === 10).map(sg => sg.desc)
      return subGroup.selections.some(s => hidden.some(h => h === s))
    },
    editOther (subGroup) {
      var found = this.resident.race_ethnicity_groups.find(g => g.group === subGroup.group)
      if (found) found.otherSubGroup = subGroup.otherSubGroup
    }
  },
  data () {
    return {
      selectedGroups: [],
      availableSubGroups: [],
      showGroupSelect: true,
      enterGroup: false
    }
  }
}
</script>
