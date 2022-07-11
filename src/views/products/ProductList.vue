<template>
  <div class="ProductList" v-if="!isLoading">
    <el-button
      style="align-self: flex-start; margin-bottom: 15px;"
      type="primary"
      size="mini"
      @click="$router.push('/products/new')"  v-if="hasPermission('create:product')">New product</el-button>
    <el-table
      :data="products"
      height="40%"
      size="mini"
      >
      <el-table-column prop="code" label="Code" width="100"></el-table-column>
      <el-table-column prop="description" label="Description" width="150"></el-table-column>
      <el-table-column prop="price" label="Price" width="150"></el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-view"
            size="mini"
            @click="$router.push(`/products/detail/${scope.row.code}`)"
            v-if="hasPermission('read:product')">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="loading" v-else v-loading></div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductList',
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState('products', ['products']),
    ...mapGetters(['hasPermission']),
  },
  methods: {
    ...mapActions('products', ['getProductsHttp']),
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getProductsHttp();
      this.isLoading = false;
    } catch (err) { this.$message.error(err); }
  },
};

</script>

<style scoped>
  .ProductList { width: 34%; min-width: 510px; align-self: center; display: flex; flex-direction: column;}
</style>
