<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="professor-index" v-for="professor in professors">
      <h2>{{ professor.name }}</h2>
      <p>{{ professor.title }}</p>
      <p>{{ professor.school }}</p>
      <p>{{ professor.department }}</p>
      <p>{{ professor.subject }}</p>
    </div>
    <form class="professor-create" v-on:submit.prevent="createProfessor()">
      <h2>New Professor</h2>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Professor's Name: </label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Title: </label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label>School: </label>
        <input type="text" class="form-control" v-model="school" />
      </div>
      <div>
        <label>Department: </label>
        <input type=text class="form-control" v-model="department" />
      </div>
      <div>
        <label>Subject: </label>
        <input type=text class="form-control" v-model="subject" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create" />
    </form>
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
  data: function() {
    return {
      message: "Welcome to rate my professor! This is a change.",
      professors: [],
      reviews: [],
      name: "",
      title: "",
      school: "",
      department: "",
      subject: ""
    };
  },
  created: function() {
    axios.get("/professors").then(response => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
    });
    axios.get("/reviews").then(response => {
      console.log("All Reviews", response.data);
      this.reviews = response.data;
    });
  },
  methods: {
    createProfessor: function() {
      var params = {
        name: this.name,
        title: this.title,
        school: this.school,
        department: this.department,
        subject: this.subject
      };
      axios
        .post("professors", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/professors");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
