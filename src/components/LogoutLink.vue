<template>
  <div class="logoutlink">
    <b-nav>
      <b-nav-item @click="onSignOut" v-if="UserIsAuthenticated" class="link-text">
        <span>Log Out</span>
        <b-icon icon="door-open-fill"/>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<style>
.link-text {
  width: 100%;
}
.link-text a {
  font-size: 1.15rem;
  color: #eeeeee !important;
}
.link-text a:hover {
  text-decoration: none;
}
.nav-link {
    padding-top: 0px;
    padding-bottom: 0px;
}
@media only screen and (max-width: 768px)
{
  .link-text a {
    font-size: 0.85rem;
  }
  .logoutlink {
    font-size: 0.85rem !important;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LogoutLink',
  computed: {
    ...mapGetters([
      'CurrentUser',
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
    }
  }
}
</script>
