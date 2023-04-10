<template>
    <div id="signin" class="centered">
        <b-card >
            <div style="padding: 11px;">
              To access your application, <b>Sign In</b> to see your account...
            </div>
            <b-form @submit="onSignIn">
                <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="input-1"
                  description="We'll never share your email with anyone else."
                  label-cols-sm="3"
                  label-cols-lg="2"
                  content-cols-sm
                  content-cols-lg="8"
                >
                    <b-form-input
                        id="input-1"
                        v-model="email"
                        type="email"
                        placeholder="Enter email"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                  label="Password:"
                  label-cols-sm="3"
                  label-cols-lg="2"
                  content-cols-sm
                  content-cols-lg="8"
                >
                    <b-form-input
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-button class="mx-auto" type="submit">Sign In</b-button>
                <div style="padding: 11px;">
                  If you don't have an account yet, <b>Apply Now</b> now to see if you are eligible...
                </div>
                <b-button to="CreateAccount" class="mx-auto" type="submit">Apply Now</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SignIn',
  computed: {
    ...mapGetters([
      'CurrentUser',
      'UserIsAuthenticated'
    ]),
    ...mapActions([
      'signOn'
    ])
  },
  methods: {
    onSignIn (event) {
      event.preventDefault()
      this.$store.commit('signOn', { email: this.email, password: this.password })
      if (this.UserIsAuthenticated) {
        this.$router.push('Home')
      }
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
