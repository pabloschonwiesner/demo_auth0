<template>
  <div class="ProductDetail">
    <product-form></product-form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import ProductForm from './widgets/ProductForm.vue';

export default {
  name: 'ProductDetail',
  components: { ProductForm },
  methods: {
    ...mapMutations('products', ['SELECT_PRODUCT']),
    ...mapActions('products', ['getProductHttp']),
  },
  async created() {
    await this.getProductHttp(this.$route.params.code);
  },
};

</script>

<style scoped>
  .ProductDetail { width: 34%; min-width: 500px; display: flex; flex-direction: column; align-items: center; align-self: center;}
</style>
