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
      <h4>Author: {{ review.author }}</h4>
      <p>Date: {{ review.date }}</p>
      <p>Review: {{ review.text }}</p>
      <p>Score: {{ review.score }}</p>
      <p>Professor:{{ getProfessorName(review.professor_id) }}</p>
      <button v-on:click="editReview(review)">Edit Review</button>
      <button v-on:click="deleteReview(review.id)">Delete Review</button>
    </div>

    <form id="review-create">
      Author:<input type ="text" v-model="newReviewAuthor"></input>
      Date:<input type ="date" v-model="newReviewDate"></input>
      Text:<input type ="text" v-model="newReviewText"></input>
      Score:<input type ="number" step="0.1" v-model="newReviewScore"></input>
      Professor_Id:<input type ="number" v-model="newReviewProfessorId"></input>
      <button v-on:click="createReview()">Create Review</button>
    </form>

    <dialog id="review-edit">
      Author:<input type ="text" v-model="currentReview.author"></input><br>
      Text:<input type ="text" v-model="currentReview.text"></input><br>
      Score:<input type ="number" step="0.1" v-model="currentReview.score"></input><br>
      Professor_Id:<input type ="number" v-model="currentReview.professor_id"></input><br>
      <button v-on:click="updateReview()">Update Review</button><br>
    </dialog>
    
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
      newReviewAuthor: "",
      newReviewDate: "",
      newReviewText: "",
      newReviewScore: "",
      newReviewProfessorId: "",
      currentReview: [],
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
  methods: {
    createReview: function () {
      var params = {
        author: this.newReviewAuthor,
        date: this.newReviewDate,
        text: this.newReviewText,
        score: this.newReviewScore,
        professor_id: this.newReviewProfessorId,
      };
      axios
        .post("/reviews", params)
        .then((response) => {
          console.log("Review Created", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    deleteReview: function (id) {
      axios.delete(`/reviews/${id}`).then((response) => {
        console.log("Review Deleted");
      });
    },
    getProfessorName: function (professorId) {
      var index = this.professors.find((x) => x.id === professorId);
      return index.name;
    },
    editReview: function (review) {
      this.currentReview = review;
      document.querySelector("#review-edit").showModal();
    },
  },
};
</script>
