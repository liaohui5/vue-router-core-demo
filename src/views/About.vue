<template>
  <div>
    <div>about</div>
    <div>
      <router-link to="/about/a">about-a</router-link>
      <span style="margin: 0 20px">|</span>
      <router-link to="/about/b">about-b</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "about",
};
</script>
