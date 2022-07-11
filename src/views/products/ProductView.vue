<template>
  <div class="ProductsView">
    <div style="display: flex; align-items: center; justify-content: flex-start; width: 34px; min-width: 500px">
      <el-button icon="el-icon-back" @click="$router.push('/')" size="mini">Home</el-button>
      <h4 style="margin-left: 150px">Products</h4>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProductView',
  methods: {
    ...mapActions(['setSessionData']),
  },
  async mounted() {
    await this.setSessionData();
  },
};

</script>

<style scoped>
  .ProductsView { display: flex; flex-direction: column; align-items: center;}
</style>
