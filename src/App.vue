<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created (){
  //   // // const api = 'https://vue-course-api.hexschool.io/api/gmwu/products';
  //   // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
  //   // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
  //   // this.$http.get(api).then((response) => {
  //   //   console.log(response.data)
  //   // })
  // }
}
</script>

<style lang="scss">
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
@import "./assets/all";
</style>
