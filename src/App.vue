<template>
  <div id="app" class="container-fluid unpadded">
    <div id="header" class="hidden-print">
      <router-link to="Welcome">
        <b-img id="logo" height="37px" style="margin: 17px;" :src="require('./assets/mn-commerce-logo.png')"/>
      </router-link>
    </div>
    <div id="content" class="container unpadded">
      <router-view/>
      <div id="layout-error" v-if="HasError">
        {{ErrorMessage}}
      </div>
    </div>
    <div id="layout-footer">
      <b-row class="footer" v-if="UserIsAuthenticated">
        <b-col sm="auto" class="centered">
          <b-link v-b-modal.modal-rights>Rights &amp; Responsibilities</b-link>
        </b-col>
        <b-col sm="auto" class="centered">
          <b-link v-b-modal.modal-privacy>Privacy Notice</b-link>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-rights" title="Your Rights and Responsibilities" ok-only size="lg">
      <Rights/>
    </b-modal>
    <b-modal id="modal-privacy" title="Privacy Notice" ok-only size="lg">
      <Privacy/>
    </b-modal>
  </div>
</template>

<style scoped>
#app {
  font-family: "Calibri", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#header {
  background-image: url("./assets/mn_eap_header_background.png");
  background-size: cover;
  background-repeat: no-repeat;
}
#content {
  background-color: #e9f6ff;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  display: grid;
}
#layout-error {
  padding-top: 7px;
  color: crimson;
  text-align: center;
}
.footer {
  justify-content: center !important;
  padding-bottom: 15px !important;
  margin: 0px !important;
}
#modal-rights {
  max-width: 700px !important;
}
#modal-privacy {
  max-width: 700px !important;
}

@media only screen and (max-width: 768px) {
  #content {
    max-width: unset !important;
  }
  #header {
    display: none !important;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import Menu from './components/Menu'
import Rights from './views/Rights'
import Privacy from './views/Privacy'

export default {
  name: 'App',
  components: { Menu, Rights, Privacy },
  computed: {
    ...mapGetters([
      'HasError',
      'ErrorMessage',
      'UserIsAuthenticated'
    ])
  }
}
</script>
