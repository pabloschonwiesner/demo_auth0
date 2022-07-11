<template>
  <div class="ProductNew">
    <h5>New Product</h5>
    <product-form></product-form>
  </div>
</template>

<script>
import ProductForm from './widgets/ProductForm.vue';

export default {
  name: 'ProductNew',
  components: { ProductForm },
};

</script>

<style scoped>
  .ProductNew { width: 34%; min-width: 500px; display: flex; flex-direction: column; align-items: center; align-self: center;}
</style>
