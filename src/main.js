// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { BootstrapVue, IconsPlugin, LayoutPlugin, ModalPlugin, FormPlugin, FormGroupPlugin, FormInputPlugin, ButtonPlugin, CardPlugin, LinkPlugin, ListGroupPlugin, DropdownPlugin, TablePlugin } from 'bootstrap-vue'
import Autocomplete from 'v-autocomplete'
import App from './App'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'v-autocomplete/dist/v-autocomplete.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(FormPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(ButtonPlugin)
Vue.use(CardPlugin)
Vue.use(LinkPlugin)
Vue.use(ListGroupPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(Autocomplete)

Vue.config.productionTip = false
Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
