<template>
  <div>{{time}}</div>
</template>

<script>
export default {
  props: ["dateTime"],
  data() {
    return {
      //   time: ""
    };
  },
  /*  mounted() {
    var d = new Date(this.dateTime);
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var ri = d.getDate();
    this.time = year + "/" + mon + "/" + ri;
  }, */
  computed: {
    time() {
      var d = new Date(this.dateTime);
      var year = d.getFullYear();
      var mon = d.getMonth() + 1;
      var ri = d.getDate();
      return year + "/" + mon + "/" + ri;
    }
  }
};
</script>

<style>
</style>