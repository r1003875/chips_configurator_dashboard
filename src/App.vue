<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
      next('/login');
    } else {
      next();
    }
  });

  function isAuthenticated() {
    // Implement your authentication logic here
    return false;
  }
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
