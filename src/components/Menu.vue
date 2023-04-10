<template>
    <div class="navbar menu-inverse hidden-print" id="menu">
        <div class="container">
            <a id="nav-toggle" @click="onToggleMenu" href="#nav-menu" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="nav-menu">
              <b-icon icon="justify" class="menu-toggle"/>
            </a>
            <b-link class="navbar-brand" to="/" exact><b-icon class="menu-home" icon="house-door-fill" style="margin-right: 7px;"/>eHEAT Home</b-link>
        </div>
        <div id="nav-menu" ref="nav_menu" class="navbar" data-parent="#menu" v-show="showMenu">
            <ul class="nav navbar-nav">
                <b-nav-item to="SignIn" class="brand-link" v-if="UserIsAuthenticated !== true">Log In</b-nav-item>
                <b-nav-item to="Home" class="brand-link" v-if="UserIsAuthenticated">My Account</b-nav-item>
                <!-- <b-nav-item to="Apply" class="brand-link indent" v-if="UserIsAuthenticated && HasApplied !== true">Apply Now</b-nav-item>
                <b-nav-item to="Apply" class="brand-link" v-if="UserIsAuthenticated !== true && HasApplied !== true">Apply Now</b-nav-item> -->
                <b-nav-item @click="onSignOut" class="brand-link indent" v-if="UserIsAuthenticated">Sign Out</b-nav-item>
                <!-- <b-nav-item class="brand-link">More Info</b-nav-item> -->
                <!-- <b-nav-item to="Rights" class="brand-link indent">Rights &amp; Responsibilities</b-nav-item> -->
                <b-nav-item to="Privacy" class="brand-link indent">Privacy Notice</b-nav-item>
            </ul>
        </div>
    </div>
</template>

<style>
.menu-toggle {
  width: 29px;
  height: 29px;
  color: #EEEEEE;
}
.menu-inverse {
    background-color: #003567;
    color: #EEEEEE;
    border: 0px;
    padding: 7px !important;
}
    .menu-inverse .navbar-brand {
        color: #EEEEEE;
    }
    .menu-inverse .navbar-nav > li > a {
        color: #EEEEEE;
    }
    .menu-inverse .navbar-toggle .icon-bar {
    background-color: #EEEEEE;
}
.navbar-toggle .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
}

@media only screen and (max-width: 768px)
{
  .navbar-collapse {
    display: none !important;
  }
  .menu-home {
    display: none !important;
  }
}

@media only screen and (min-width: 768px)
{
  .navbar-collapse {
    display: block !important;
  }
  #nav-toggle {
    display: none !important;
  }
  #nav-menu {
    display: block !important;
  }
}

</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'CanApplyThisYear',
      'UserIsAuthenticated'
    ])
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    onSignOut (event) {
      event.preventDefault()
      this.$store.dispatch('signOut')
      this.$router.push('Welcome')
    },
    onToggleMenu (event) {
      event.preventDefault()
      this.showMenu = this.showMenu !== true
      // this.$refs.nav_menu.setAttribute()
    }
  },
  created () {
    // if (this.$store.state.users.UserIsAuthenticated !== true) {
    //   this.$router.push('Welcome')
    // }
  }
}
</script>
