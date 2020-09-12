<template>
  <div class="about">
    <button v-on:click="changeView()">Switch</button>
    <h1>This is an about page</h1>
    <div v-show="pagelabel">

    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: function () {
    return {
      pagelabel: true,
    };
  },
  methods: {
    changeView: function () {
      if (this.pagelabel === true) {
        this.pagelabel = false;
      } else if (this.pagelabel === false) {
        this.pagelabel = true;
      }
      console.log(this.pagelabel);
    },
  },
};
</script>
