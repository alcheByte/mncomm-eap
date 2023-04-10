<template>
  <div id="resident" v-if="resident">
    <!-- First Name -->
    <b-form-group
      label="First Name:"
      label-cols="4"
      content-cols="8"
    >
        <b-form-input
          v-model="resident.firstname"
          type="text"
          placeholder="First name"
          required
          autofocus
        ></b-form-input>
    </b-form-group>
    <!-- Middle Initial -->
    <b-form-group
      label="Middle Initial:"
      label-cols="4"
      content-cols="8"
    >
        <b-form-input
          v-model="resident.middlename"
          type="text"
          placeholder="(optional)"
        ></b-form-input>
    </b-form-group>
    <!-- LastName -->
    <b-form-group
      label="Last Name:"
      label-cols="4"
      content-cols="8"
    >
        <b-form-input
          v-model="resident.lastname"
          type="text"
          placeholder="Last name"
          required
        ></b-form-input>
    </b-form-group>
    <!-- Suffix -->
    <b-form-group
      label="Suffix:"
      label-cols="4"
      content-cols="8"
    >
        <b-form-input
          v-model="resident.suffix"
          type="text"
          placeholder="(optional)"
        ></b-form-input>
    </b-form-group>
    <!-- Id Type -->
    <b-form-group
      label="Proof of Identity:"
      label-cols="4"
      content-cols="8"
    >
      <div style="display: flex;">
        <b-form-select v-model="resident.idenType" :options="idTypes" @change="changeIdType" required></b-form-select>
        <!-- <b-icon v-b-modal.modal-gender icon="info-circle-fill" class="input-icon" tabindex="-1"/> -->
      </div>
    </b-form-group>
    <!-- Id -->
    <b-form-group
      v-if="resident.idenType"
      :label="idLabel()"
      label-cols="4"
      content-cols="8"
    >
      <div style="display: flex;">
        <b-form-input
          v-model="resident.idenNumber"
          type="text"
          :placeholder="idPlaceholder()"
          :formatter="formatID"
          required
        ></b-form-input>
        <b-icon v-b-modal.modal-ssn icon="info-circle-fill" class="input-icon" tabindex="-1"/>
      </div>
    </b-form-group>
    <!-- Gender -->
    <b-form-group
      label="Gender:"
      label-cols="4"
      content-cols="8"
    >
      <div style="display: flex;">
        <b-form-select v-model="resident.gender" :options="genders" placeholder="Applicant's gender" required></b-form-select>
        <!-- <b-icon v-b-modal.modal-gender icon="info-circle-fill" class="input-icon" tabindex="-1"/> -->
      </div>
    </b-form-group>
    <!-- Gender Other -->
    <b-form-group
    v-if="resident.gender === 'enter'"
      label="Describe:"
      label-cols="4"
      content-cols="8"
    >
        <b-form-input
          v-model="resident.genderOther"
          type="text"
          placeholder="enter gender here"
        ></b-form-input>
    </b-form-group>
    <!-- Date of Birth -->
    <b-form-group
      label="Date of Birth:"
      label-cols="4"
      content-cols="8"
    >
      <b-form-input
        v-model="DOB"
        type="text"
        placeholder="MM/DD/YYYY"
        :formatter="formatDOB"
        required
      ></b-form-input>
    </b-form-group>
    <!-- Phone -->
    <b-form-group v-if="isApplicant"
      label="Phone:"
      label-cols="4"
      content-cols="8"
    >
      <div style="display: flex;">
        <b-form-input
          v-model="resident.phonenumber"
          type="text"
          placeholder="(###) ###-####"
          :formatter="formatPhone"
          required
        ></b-form-input>
        <b-icon v-b-modal.modal-phone icon="info-circle-fill" class="input-icon" tabindex="-1"/>
      </div>
    </b-form-group>
    <!-- Race/Ethnicity -->
    <b-form-group>
      <RaceEthnicity :resident="resident"/>
    </b-form-group>
    <!-- Modals -->
    <b-modal id="modal-race" title="Race" ok-only size="lg">
    </b-modal>
    <b-modal id="modal-ssn" title="Social Security Numbers" ok-only size="lg">
      <ul>
        <li>Social security numbers (SSN) are required for all household members and will be verified</li>
        <li>If a valid SSN is not available, another form of documentation will be required</li>
        <li>If any household members are ineligible non-citizens, your household may still receiveassistance if at least 1 household member is a citizen or eligible non-citizen</li>
        <li>Your SSN will be used to obtain wage and unemployment compensation information</li>
      </ul>
      <b-container>
        <div class="subtext">
            <p>Social Security Numbers (SSNs): SSNs are required for all applicants unless you are applying as an eligible non-citizen (for example, a permanent resident, asylee, refugee, etc.).</p>
            <p>If you do not provide verifiable social security numbers or valid immigration documentation, your application cannot be processed.</p>
            <p>If you are an eligible non-citizen, you may be able to apply without an SSN.</p>
            <p>Contact your Service Provider for information on the required documentation.</p>
            <p>If you or some member(s) of your household are ineligible non-citizens, your household may still receive assistance if any household member is a citizen or eligible non-citizen.</p>
            <p>Contact your Service Provider for details.</p>
            <p>AUTHORITY: Section 205(c)(2)(C)(i) of the Social Security Act, 42 U.S.C. § 405(c)(2)(C)(i).</p>
            <p>USE: The State will use SSNs in the administration of EAP to check identity, prevent duplicate participation, and determine eligibility for public benefits.</p>
            <p>Your SSN will also be used to obtain wage and unemployment compensation information from the Minnesota Department of Employment and Economic Development (DEED), verify information supplied on the application, and to prevent, detect, and correct fraud, waste, and abuse.</p>
        </div>
      </b-container>
    </b-modal>
    <b-modal id="modal-phone" title="Phone Number Usage" ok-only size="lg">
    </b-modal>
  </div>
</template>

<style scoped>
#resident {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
input[type=number]::-webkit-inner-spin-button
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>

<script>
import { mapGetters } from 'vuex'
import RaceEthnicity from './RaceEthnicity'

export default {
  name: 'Resident',
  components: { RaceEthnicity },
  props: {
    resident: { required: true },
    isApplicant: { typeof: Boolean, required: true }
  },
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CurrentAccount',
      'CurrentApplication',
      'IdentityTypes'
    ])
  },
  watch: {
    DOB: function (ans) {
      if (ans.length === 10) {
        this.resident.dateofbirth = new Date(ans)
      }
    }
  },
  created () {
    if (this.resident.dateofbirth) {
      var date = this.resident.dateofbirth.toJSON().slice(0, 10)
      this.DOB = date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(0, 4)
    }
    if (this.resident.phonenumber) {
      this.resident.phonenumber = this.formatPhone(this.resident.phonenumber)
    }
    this.idTypes = this.IdentityTypes.map(it => ({ value: it.type, text: it.desc }))
  },
  methods: {
    changeIdType () {
      this.resident.idenNumber = null
    },
    formatID (value) {
      switch (this.resident.idenType) {
        case 'SSN': return this.formatSSN(value)
        case 'I-551': return this.formatI551(value)
        case 'I-94': return this.formatI94(value)
        case 'I-766': return this.formatI766(value)
        case 'I-179':
        case 'I-197': return this.format6Digits(value)
      }
      return value
    },
    formatSSN (value) {
      var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/)
      return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    formatI551 (value) {
      var x = value.replace(/\D/g, '').match(/(\d{0,9})/)
      return x[1]
    },
    formatI94 (value) {
      var x = value.match(/(\d{0,9})(\w{0,1})(\d{0,1})/)
      return x[1] + x[2].toUpperCase() + x[3]
    },
    formatI766 (value) {
      var x = value.match(/(\D{0,3})(\d{0,10})/)
      return x[1].toUpperCase() + x[2]
    },
    format6Digits (value) {
      var x = value.replace(/\D/g, '').match(/(\d{0,6})/)
      return x[1]
    },
    formatPhone (value) {
      var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    formatDOB (value) {
      var curYear = new Date().getFullYear()
      var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/)
      if (!x[2]) {
        if (x[1] / 1 > 12) return x[1][0]
      } else {
        if (x[2] / 1 > 31) {
          return x[1] + '/' + x[2][0]
        } else if (x[3] / 1 > curYear) {
          var part = x[3].slice(0, 3)
          return x[1] + '/' + x[2] + '/' + part
        }
      }
      return !x[2] ? x[1] : x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '')
    },
    idLabel () {
      if (this.resident.idenType) {
        if (this.resident.idenType === 'SSN') return 'SSN:'
        return this.resident.idenType + ' ID Number:'
      }
      return null
    },
    idPlaceholder () {
      switch (this.resident.idenType) {
        case 'SSN': return '###-##-####'
        case 'I-551': return '########/#'
        case 'I-94': return '#########?#'
        case 'I-766': return 'XXX##########'
        case 'I-179':
        case 'I-197': return '######'
      }
      return 'Enter ID Number'
    }
  },
  data () {
    return {
      genders: [
        { value: 'na', text: 'Prefer not to say' },
        { value: 'F', text: 'Female' },
        { value: 'M', text: 'Male' },
        { value: 'enter', text: 'Not listed here...' }
      ],
      DOB: null
    }
  }
}
</script>
