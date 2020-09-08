<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <article v-for="professor in professors">
      <h2>{{ professor.name }}</h2>
      <p>{{ professor.title }}</p>
      <p>{{ professor.school }}</p>
      <p>{{ professor.department }}</p>
      <p>{{ professor.subject }}</p>
    </article>
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
      professors: [],
      reviews: [],
    };
  },
  created: function () {
    axios.get("/professors").then((response) => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
    });
    axios.get("/reviews").then((response) => {
      console.log("All Reviews", response.data);
      this.reviews = response.data;
    });
  },
  methods: {},
};
</script>
