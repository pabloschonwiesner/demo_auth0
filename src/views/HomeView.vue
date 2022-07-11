<template>
  <div class="HomeView">
    <nav>
      <router-link to="/clients/list" v-if="hasPermission('read:clients')">Clients</router-link> |
      <router-link to="/products/list" v-if="hasPermission('read:products')">Products</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png" width="150" height="150">
    <log-out></log-out>
    <div class="row">
      <div class="column">
        <div class="label">User</div>
        <div class="userProperty" v-for="(prop, index) in user" :key="index">
          <span class="property">Property: {{prop.property}}</span>
          <span class="value">Value: {{prop.value}}</span>
        </div>
      </div>
      <div class="column">
        <div class="label">Roles</div>
        <div class="userProperty" v-for="(rol, index) in roles" :key="index">
          <span class="value">{{rol}}</span>
        </div>
      </div>
      <div class="column">
        <div class="label">Permissions</div>
        <div class="userProperty" v-for="(permission, index) in permissions" :key="index">
          <span class="value">{{permission}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LogOut from '@/components/LogOut.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: { LogOut },
  computed: {
    ...mapState(['user', 'roles', 'permissions']),
    ...mapGetters(['hasPermission']),
  },
  methods: {
    ...mapActions(['setSessionData']),
  },
  async mounted() {
    await this.setSessionData();
  },
};
</script>

<style scoped>
  .HomeView { display: flex; flex-direction: column; align-items: center; width: 100%}
  .row { width: 100%; }
  .column { width: 33%; border: 1px solid #eee; border-radius: 8px; padding: 8px; margin: 8px }
  .label { font-size: 1.35rem; }
  .userProperty { margin-top: 15px; }
  .property { color: #bbb; display: block; font-size: 12px; }
  .value { font-size: 12px;}
</style>
