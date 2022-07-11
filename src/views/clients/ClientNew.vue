<template>
  <div class="ClientNew">
    <h5>New Client</h5>
    <client-form></client-form>
  </div>
</template>

<script>
import ClientForm from './widgets/ClientForm.vue';

export default {
  name: 'ClientNew',
  components: { ClientForm },
};

</script>

<style scoped>
  .ClientNew { width: 34%; min-width: 500px; display: flex; flex-direction: column; align-items: center; align-self: center;}
</style>
