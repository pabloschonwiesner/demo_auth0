<template>
  <div class="ProductForm">
    <div class="column" v-if="product.code > 0">
      <div class="label">Code</div>
      <el-input :value="product.code" disabled></el-input>
    </div>
    <div class="column">
      <div class="label">Description</div>
      <el-input :value="product.description"  @input="PRODUCT_PROP({property: 'description', value: $event})" :disabled="!hasPermission(['update:product', 'create:product'])"></el-input>
    </div>
    <div class="column">
      <div class="label">Price</div>
      <el-input-number
        :value="product.price"
        @input="PRODUCT_PROP({property: 'price', value: $event})"
        :disabled="!hasPermission(['update:product', 'create:product'])"
        :min="0"
        :controls="false"></el-input-number>
    </div>

    <div class="row">
      <el-button icon="el-icon-arrow-left" type="primary" size="mini" @click="$router.go(-1)"></el-button>
      <el-button
        icon="el-icon-check"
        type="success"
        size="mini"
        @click="saveProduct"
        v-if="hasPermission(['update:product', 'create:product'])"
        :disabled="!(product.description != '' && product.price > 0)"></el-button>
      <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteProduct" v-if="product.code > 0 && hasPermission(['update:product', 'create:product'])"></el-button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'ProductForm',
  computed: {
    ...mapGetters(['hasPermission']),
    ...mapState('products', ['product']),
  },
  methods: {
    ...mapMutations('products', ['ADD_PRODUCT', 'PRODUCT_PROP', 'CLEAR_PRODUCT', 'UPDATE_PRODUCT', 'DELETE_PRODUCT']),
    ...mapActions('products', ['updateProductHttp', 'createProductHttp', 'deleteProductHttp']),
    async deleteProduct() {
      await this.deleteProductHttp();
      this.$router.go(-1);
    },
    async saveProduct() {
      if (this.product.code > 0) {
        await this.updateProductHttp();
      } else {
        await this.createProductHttp();
      }
      this.$router.go(-1);
    },
  },
  beforeDestroy() {
    this.CLEAR_PRODUCT();
  },
};
</script>

<style scoped>
  .column { margin-bottom: 25px; }
  .column /deep/ .el-input { width: 150px}
</style>
