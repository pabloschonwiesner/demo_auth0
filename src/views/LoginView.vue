<template>
  <div class="LoginView">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <h4>Login</h4>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <el-button v-if="!$auth.isAuthenticated" @click="login">Log in</el-button>
      <!-- show logout when authenticated -->
      <el-button v-if="$auth.isAuthenticated" @click="logout">Log out</el-button>
    </div>
  </div>
</template>

<script>
// .. imports removed for brevity

export default {
  name: 'LoginView',
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
  mounted() {
    this.login();
  },
};
</script>
