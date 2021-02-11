<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{name: 'dashboard'}" class="navbar-brand">
      <img src="../src/assets/logoApps.png" class="img-logo ml-3">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{name: 'register'}" class="nav-link" href="">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'login'}" class="nav-link" href="#">Login</router-link>
        </li>
        <li @click.prevent="logout" class="nav-item">
          <router-link :to="{name: 'login'}" class="nav-link" href="#">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<script>

export default {
}
</script>

<style>
  body {
    background: #e9ecef !important;
  }
</style>
