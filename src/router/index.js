import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/Welcome'
import Emergency from '@/views/Emergency'
import Home from '@/views/Home'
import SignIn from '@/views/SignIn'
import CreateAccount from '@/views/CreateAccount'
import Eligibility from '@/views/Eligibility'
import ApplyStep2 from '@/views/ApplyStep2'
import ApplyStep3 from '@/views/ApplyStep3'
import ApplyStep4 from '@/views/ApplyStep4'
import ApplyStep5 from '@/views/ApplyStep5'
import ApplyStep6 from '@/views/ApplyStep6'
import ApplyStep7 from '@/views/ApplyStep7'
import ApplyStep8 from '@/views/ApplyStep8'
import ApplyStep9 from '@/views/ApplyStep9'
import ApplyStep10 from '@/views/ApplyStep10'
import ApplySubmitted from '@/views/ApplySubmitted'
import ApplicationSummary from '@/views/ApplicationSummary'
import Privacy from '@/views/Privacy'
import Rights from '@/views/Rights'

Vue.use(Router)
var _routes = [
  {
    path: '/',
    component: Welcome
  },
  {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/emergency',
    component: Emergency
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/createaccount',
    component: CreateAccount
  },
  {
    path: '/eligibility',
    component: Eligibility
  },
  {
    name: 'ApplyStep2',
    path: '/applystep2',
    component: ApplyStep2
  },
  {
    name: 'ApplyStep3',
    path: '/applystep3',
    component: ApplyStep3
  },
  {
    name: 'ApplyStep4',
    path: '/applystep4',
    component: ApplyStep4
  },
  {
    name: 'ApplyStep5',
    path: '/applystep5',
    component: ApplyStep5
  },
  {
    name: 'ApplyStep6',
    path: '/applystep6',
    component: ApplyStep6
  },
  {
    name: 'ApplyStep7',
    path: '/applystep7',
    component: ApplyStep7
  },
  {
    name: 'ApplyStep8',
    path: '/applystep8',
    component: ApplyStep8
  },
  {
    name: 'ApplyStep9',
    path: '/applystep9',
    component: ApplyStep9
  },
  {
    name: 'ApplyStep10',
    path: '/applystep10',
    component: ApplyStep10
  },
  {
    path: '/applysubmitted',
    component: ApplySubmitted
  },
  {
    path: '/ApplicationSummary',
    component: ApplicationSummary
  },
  {
    path: '/privacy',
    component: Privacy
  },
  {
    path: '/rights',
    component: Rights
  }
]

export default new Router({
  routes: _routes
})
