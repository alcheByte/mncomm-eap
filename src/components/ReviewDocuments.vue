<template>
  <b-card header-tag="header">
    <template #header>
       <b-row class="justify-content-center">
            Required Documentation
        </b-row>
    </template>
    <div class="pt-3">
      <b-row
          v-for="_missing in missingDocs"
          :key="_missing.id"
          class="center-v"
          no-gutters
      >
        <b-alert show variant="warning" class="w-100">
          <b-button @click="upload(_missing)" variant="warning" class="mr-2">
            <b-icon icon="cloud-upload" class="emphasize"/>
            <span class="pl-1">Upload</span>
          </b-button>
          &nbsp;<b-icon icon="exclamation-triangle-fill" class="emphasize"/>
          &nbsp;{{ _missing.desc }}
        </b-alert>
      </b-row>
      <b-row
          v-for="_attached in attachedDocs"
          :key="_attached.id"
          class="center-v"
          no-gutters
      >
        <b-alert show variant="success" class="w-100">
          <b-button @click="removeAttachment(_attached)" class="mr-2"><b-icon icon="cloud-upload" class="mr-2"/>Replace</b-button>
          <b-icon icon="check-circle" class="mr-2 emphasize"/>
          {{ _attachmentInfo(_attached) }}
          <span class="emphasize">{{ _attached.origName }}</span>
        </b-alert>
      </b-row>
    </div>
    <!-- modals -->
    <b-modal id="modal-upload" v-model="showUpload" title="Upload Documentation" hide-footer size="md">
      <div class="sheet">
        <p>{{ attachDesc }}</p>
          <b-form-file
            v-if="curResident" v-model="fsoUpload"
            :placeholder="attachLabel"
            multiple
          />
      </div>
      <b-row class="justify-content-center pb-4">
        <b-button @click="uploadDocument" variant="success"><b-icon icon="check-circle-fill" class="mr-2"/>Upload</b-button>
      </b-row>
    </b-modal>
  </b-card>
</template>

<style scoped>
.card {
  color: #224277;
  background-color: #FFFFFF;
  font-size: 16px;
  margin: 9px;
  margin-top: 0px;
  width: 100%;
}
.card-header {
  color: #224277;
  background-color: #a1c2e3 !important;
  padding: 0.7rem;
  font-size: 1.2rem;
}
.icon {
  height: 100%;
  font-size: 1.4em;
}
@media only screen and (max-width: 475px) {
  .card {
      min-width: unset;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'ReviewDocuments',
  props: {
  },
  computed: {
    ...mapGetters([
      'CurrentApplication',
      'IncomeSources',
      'IdentityTypes'
    ])
  },
  created () {
    if (this.CurrentApplication) {
      this._loadMissingdocs()
    }
  },
  methods: {
    _loadMissingdocs () {
      if (!this.CurrentApplication) return
      this.missingDocs = this.CurrentApplication.missingInfo.filter(mi => mi.needsDoc === true)
      var incomeDocs = this.CurrentApplication.residents.flatMap(r => r.income.sources.filter(is => !!is.attachments).flatMap(is => is.attachments))
      var idDocs = this.CurrentApplication.residents.filter(r => r.idenDocuments).flatMap(r => r.idenDocuments)
      this.attachedDocs = idDocs.concat(incomeDocs)
    },
    _residentFullName (res) {
      return res.firstname + ' ' + (res.middlename ? res.middlename + ' ' + res.lastname : res.lastname)
    },
    _attachmentInfo (attached) {
      if (!this.CurrentApplication) return attached.origName
      var res = this.CurrentApplication.residents.find(r => r.id === attached.resId)
      if (attached.section === 'HOUSEHOLD') {
        var idType = this.IdentityTypes.find(s => s.type === attached.type)
        return 'File uploaded for ' + this._residentFullName(res) + '\'s ' + idType.requiredDoc + ' : '
      } else if (attached.section === 'INCOME') {
        var src = this.IncomeSources.find(s => s.type === attached.type)
        return 'File uploaded for ' + this._residentFullName(res) + '\'s ' + src.title + ' : '
      }
    },
    removeAttachment (attached) {
      var missing = {
        resId: attached.resId,
        section: attached.section,
        type: attached.type,
        needsDoc: true,
        desc: 'Replace ' + attached.origName
      }
      this.upload(missing)
    },
    convertAttachment (fso, missing) {
      return fso.map(fo => ({
        id: uuidv4(),
        origName: fo.name,
        fileType: fo.type,
        fileSize: fo.size,
        section: missing.section,
        type: missing.type,
        resId: missing.resId
      }))
    },
    upload (missing) {
      var res = this.CurrentApplication.residents.find(r => r.id === missing.resId)
      if (res) {
        this.curResident = {...res}
      }
      if (missing.section === 'HOUSEHOLD') {
        var idType = this.IdentityTypes.find(it => it.type === missing.type)
        this.attachLabel = 'Select ' + (idType ? idType.requiredDoc : missing.type)
        this.attachDesc = idType ? idType.desc : ''
      } else if (missing.section === 'INCOME') {
        var srcType = this.IncomeSources.find(it => it.type === missing.type)
        this.attachLabel = 'Select ' + (srcType ? srcType.requiredDoc : missing.type)
        this.attachDesc = srcType ? srcType.title : ''
      }
      this.curUpload = missing
      this.showUpload = true
    },
    uploadDocument () {
      this.showUpload = false
      if (this.curUpload.section === 'INCOME') {
        var src = this.curResident.income.sources.find(s => s.type === this.curUpload.type)
        if (src) src.attachments = this.convertAttachment(this.fsoUpload, this.curUpload)
      } else if (this.curUpload.section === 'HOUSEHOLD') {
        this.curResident.idenDocuments = this.convertAttachment(this.fsoUpload, this.curUpload)
      }
      this.$store.dispatch('saveResident', this.curResident)
      this.$store.dispatch('updateMissingInfo')
      this.curUpload = null
      this.curResident = null
      this.fsoUpload = null
      this.attachLabel = ''
      this.attachDesc = ''
      this._loadMissingdocs()
    }
  },
  data () {
    return {
      showUpload: false,
      curUpload: null,
      curResident: null,
      fsoUpload: null,
      attachLabel: '',
      attachDesc: '',
      missingDocs: [],
      attachedDocs: []
    }
  }
}
</script>
