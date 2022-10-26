<template>
  <div>
    <div>
      <router-link to="/">home</router-link>
      <span style="margin: 0 20px">|</span>
      <router-link to="/about">about</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
