<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="review-index" v-for="review in reviews">
      <p>{{ review.id }}</p>
      <h4>{{ review.author }}</h4>
      <p>{{ review.date }}</p>
      <p>{{ review.text }}</p>
      <p>{{ review.score }}</p>
      <p>{{ review.professor_id }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  data: function () {
    return {
      message: "Welcome to rate my professor! This is a change.",
      reviews: [],
    };
  },
  created: function () {
    axios.get("/reviews").then((response) => {
      console.log("All Reviews", response.data);
      this.reviews = response.data;
    });
  },
  methods: {},
};
</script>
