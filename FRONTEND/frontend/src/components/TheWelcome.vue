<script setup>
  import { RouterLink } from 'vue-router'; 
</script>

<template>
  <main>
    <h1>Selamat Datang</h1>
    <RouterLink to="/login" class="link">Login</RouterLink>
  </main>
</template>

<style scoped>
  main {
    padding: 1rem;
    color: white;
  }

  h1 {
    margin-bottom: 1rem;
  }

  .link {
    background-color: rgb(31, 148, 31);
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }
</style>