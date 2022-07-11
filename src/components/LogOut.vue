<template>
  <el-button id="LogOut" @click="logout">Logout</el-button>
</template>

<script>

export default {
  name: 'LogOut',
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};

</script>
