<template>
  <div class="ClientForm">
    <div class="column" v-if="client.id > 0">
      <div class="label">ID</div>
      <el-input :value="client.id" disabled ></el-input>
    </div>
    <div class="column">
      <div class="label">Name</div>
      <el-input :value="client.name" @input="CLIENT_PROP({property: 'name', value: $event})" :disabled="!hasPermission(['update:client', 'create:client'])"></el-input>
    </div>
    <div class="column">
      <div class="label">Surname</div>
      <el-input :value="client.surname" @input="CLIENT_PROP({property: 'surname', value: $event})" :disabled="!hasPermission(['update:client', 'create:client'])"></el-input>
    </div>

    <div class="row">
      <el-button icon="el-icon-arrow-left" type="primary" size="mini" @click="$router.go(-1)"></el-button>
      <el-button
        icon="el-icon-check"
        type="success"
        size="mini"
        @click="saveClient"
        v-if="hasPermission(['update:client', 'create:client'])"
        :disabled="!(client.name != '' && client.surname != '')"></el-button>
      <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteClient" v-if="client.id > 0 && hasPermission(['delete:client'])"></el-button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'ClientForm',
  computed: {
    ...mapGetters(['hasPermission']),
    ...mapState('clients', ['client']),
  },
  methods: {
    ...mapMutations('clients', ['ADD_CLIENT', 'CLIENT_PROP', 'CLEAR_CLIENT', 'UPDATE_CLIENT', 'DELETE_CLIENT']),
    ...mapActions('clients', ['createClientHttp', 'updateProductHttp', 'deleteClientHttp']),
    async deleteClient() {
      await this.deleteClientHttp();
      this.$router.go(-1);
    },
    async saveClient() {
      if (this.client.id > 0) {
        await this.updateProductHttp();
      } else {
        await this.createClientHttp();
      }
      this.$router.go(-1);
    },
  },
  beforeDestroy() {
    this.CLEAR_CLIENT();
  },
};
</script>

<style scoped>
  .column { margin-bottom: 25px; }
  .column /deep/ .el-input { width: 150px}
</style>
