<template v-loading="isLoading">
  <div class="ClientList" v-if="!isLoading">
    <el-button
      style="align-self: flex-start; margin-bottom: 15px;"
      type="primary"
      size="mini"
      @click="$router.push('/clients/new')" v-if="hasPermission('create:client')">New client</el-button>
    <el-table
      :data="clients"
      height="40%"
      size="mini"
      >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="Name" width="150"></el-table-column>
      <el-table-column prop="surname" label="Surname" width="150"></el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-view"
            size="mini"
            @click="$router.push(`/clients/detail/${scope.row.id}`)"
            v-if="hasPermission('read:client')">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'ClientList',
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState('clients', ['clients']),
    ...mapGetters(['hasPermission']),
  },
  methods: {
    ...mapActions('clients', ['getClientsHttp']),
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getClientsHttp();
      this.isLoading = false;
    } catch (err) { this.$message.error(err); }
  },
};
</script>

<style scoped>
  .ClientList { width: 34%; min-width: 510px; align-self: center; display: flex; flex-direction: column;}
</style>
