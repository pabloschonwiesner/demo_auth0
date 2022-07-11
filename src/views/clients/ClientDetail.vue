<template>
  <div class="ClientDetail">
    <client-form></client-form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import ClientForm from './widgets/ClientForm.vue';

export default {
  name: 'ClientDetail',
  components: { ClientForm },
  methods: {
    ...mapMutations('clients', ['SELECT_CLIENT']),
    ...mapActions('clients', ['getClientHttp']),
  },
  async created() {
    await this.getClientHttp(this.$route.params.id);
  },
};

</script>

<style scoped>
  .ClientDetail { width: 34%; min-width: 500px; display: flex; flex-direction: column; align-items: center; align-self: center;}

</style>
