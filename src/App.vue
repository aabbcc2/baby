<template>
  <div id="app">
    <header-group></header-group>
     <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import HeaderGroup from "@/common/HeaderGroup";
export default {
  name: 'App',
   components: {
    HeaderGroup
  },
  methods:{
    go() {
      console.log("go");
      console.log("this.router", this.$router);

      this.$router.go(1);
    },
    goback() {
      console.log("goback");
      this.$router.go(-1);
    },
    gohome() {
      console.log("push");

      this.$router.push("/");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
