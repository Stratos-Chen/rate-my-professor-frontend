<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data: function() {
    return {
      message: "Welcome to rate my professor! This is a change."
    };
  },
  created: function() {},
  methods: {}
};
</script>
