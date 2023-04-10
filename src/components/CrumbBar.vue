<template>
    <div id="crumbbar" v-if="crumbs">
      <b-row id="status-row-large" :style="largeRowStyle()">
        <b-col
            v-for="_section in crumbs"
            :key="_section.name"
            :class="stepIsActive(_section) ? 'active-part' : ''"
        >
          <div v-if="stepIsActive(_section)">
            {{ _section.name }}
            <b-icon icon="pencil-fill" class="status-icon"/>
            <b-icon v-if="sectionIsComplete(_section)" icon="check2-circle" class="status-icon"/>
          </div>
          <div v-if="stepIsActive(_section) !== true">
            <b-link
              :class="disableStep(_section) ? 'label-disabled' : 'label'"
              :to="_section.routeTo"
              @click="_section.action"
              :disabled="disableStep(_section)"
            >
              {{ _section.name }}
            </b-link>
            <b-icon v-if="sectionIsComplete(_section)" icon="check2-circle" class="status-icon"/>
          </div>
        </b-col>
      </b-row>
      <b-row id="status-row-small" :style="smallRowStyle()" >
        <b-col
            v-for="_section in crumbs"
            :key="_section.name"
            :class="stepIsActive(_section) ? 'active-part' : ''"
        >
            <b-link
              class="label"
              :to="_section.routeTo"
              :click="_section.action"
              :disabled="disableStep(_section)"
            >
              {{ _section.name }}
            </b-link>
        </b-col>
    </b-row>
  </div>
</template>
<style scoped>
#status-row-large {
  color: #224277;
  background-color: #FFFFFF;
  margin: 0px !important;
  flex-grow: 1;
  text-align: center;
}
#status-row-small {
  color: #224277;
  background-color: #FFFFFF;
  margin: auto !important;
  flex-grow: 1;
  text-align: center;
}
.status-icon {
  display: float;
  margin-left: 3px;
}
.active-part {
  font-weight: bold;
  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-color: #224277;
  /* margin-top: -5px; */
}
.label {
  color: #224277 !important;
  font-weight: bolder;
}
.label-disabled {
  color: #AAAAAA !important;
  cursor: not-allowed;
  text-decoration: none !important;
}
.label-disabled
  a:hover {
    cursor: not-allowed;
    text-decoration: none !important;
}
.col {
  padding-left: 9px;
  padding-right: 9px;
}

@media only screen and (max-width: 768px)
{
  #status-row-large {
    display: none !important;
  }
  #status-row-small {
    display: flex !important;
  }
  .active-part {
    border-bottom-width: 2px;
  }
  .col {
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 7px;
  }
  .row-btn {
      padding: 7px !important;
  }
}

@media only screen and (min-width: 768px)
{
  #status-row-large {
    display: flex !important;
  }
  #status-row-small {
    display: none !important;
  }
}
</style>

<script>

export default {
  name: 'CrumbBar',
  props: {
    activeStep: 0,
    stepsCompleted: 0,
    crumbs: null,
    size: ''
  },
  methods: {
    stepIsActive (section) {
      return section.steps.includes(this.activeStep)
    },
    sectionIsComplete (section) {
      var lastStep = Math.max(...section.steps)
      return this.stepsCompleted >= lastStep
    },
    disableStep (section) {
      var firstStep = Math.min(...section.steps)
      return this.stepsCompleted < (firstStep - 1)
    },
    largeRowStyle () {
      if (this.size === 'small') {
        return {
          'font-size': '14px',
          'padding': '5px'
        }
      }
      return {
        'font-size': '17px',
        'padding': '9px'
      }
    },
    smallRowStyle () {
      if (this.size === 'small') {
        return {
          'font-size': '11px',
          'padding': '2px'
        }
      }
      return {
        'font-size': '14px',
        'padding': '5px'
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
