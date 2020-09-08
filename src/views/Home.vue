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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  data: function() {
    return {
      message: "Welcome to rate my professor! This is a change.",
      professors: []
    };
  },
  created: function() {
    this.indexProfessors();
  },
  methods: {
    indexProfessors: function() {
      axios.get("/professors").then(response => {
        console.log("All Professors:", response.data);
        this.professors = response.data;
      });
    }
  }
};
</script>
