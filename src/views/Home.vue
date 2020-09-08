<template>
  <div class="home">
    <h1>List of Professors </h1>
    <div class="professor-index" v-for="professor in professors">
      <h2>{{ professor.name }}</h2>
      <p>{{ professor.title }}</p>
      <p>{{ professor.school }}</p>
      <p>{{ professor.department }}</p>
      <p>{{ professor.subject }}</p>
      <button class="btn btn-primary" v-on:click="editProfessor(professor)">Edit</button>
      <button class="btn btn-primary" v-on:click="deleteProfessor(professor.id)">Delete</button>
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
    <dialog id="professor-edit">
      <div class="form-group">
        <label>Professor's Name: </label>
        <input type="text" class="form-control" v-model="currentProfessor.name" />
      </div>
      <div class="form-group">
        <label>Title: </label>
        <input type="text" class="form-control" v-model="currentProfessor.title" />
      </div>
      <div class="form-group">
        <label>School: </label>
        <input type="text" class="form-control" v-model="currentProfessor.school" />
      </div>
      <div>
        <label>Department: </label>
        <input type=text class="form-control" v-model="currentProfessor.department" />
      </div>
      <div>
        <label>Subject: </label>
        <input type=text class="form-control" v-model="currentProfessor.subject" />
      </div>
      <button v-on:click="updateProfessor()">Update Professor Information</button>
    </dialog>
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
  data: function() {
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
      name: "",
      title: "",
      school: "",
      department: "",
      subject: "",
      currentProfessor: {},
      errors: []
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
    // axios.get("/professors/:id").then(response => {
    //   console.log(response.data);
    //   this.professor = response.data;
    // });
  },
  methods: {
    createReview: function() {
      var params = {
        author: this.newReviewAuthor,
        date: this.newReviewDate,
        text: this.newReviewText,
        score: this.newReviewScore,
        professor_id: this.newReviewProfessorId
      };
      axios
        .post("/reviews", params)
        .then(response => {
          console.log("Review Created", response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    deleteReview: function(id) {
      axios.delete(`/reviews/${id}`).then(response => {
        console.log("Review Deleted");
      });
    },
    getProfessorName: function(professorId) {
      var index = this.professors.find(x => x.id === professorId);
      return index.name;
    },
    editReview: function(review) {
      this.currentReview = review;
      document.querySelector("#review-edit").showModal();
    },
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
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    editProfessor: function(professor) {
      this.currentProfessor = professor;
      document.querySelector("#professor-edit").showModal();
    },
    // updateProfessor: function(id) {
    //   var params = {
    //     name: this.professor.name,
    //     title: this.professor.title,
    //     school: this.professor.school,
    //     department: this.professor.department,
    //     subject: this.professor.subject
    //   };
    //   axios
    //     .patch(`professor/${id}`, params)
    //     .then(response => {
    //       this.$router.push(`/professors/${id}`);
    //     })
    //     .catch(error => {
    //       this.error = error.response.data.errors;
    //     });
    // },
    deleteProfessor: function(id) {
      if (confirm("Are you sure you want to delete this entry?")) {
        axios.delete(`professors/${id}`).then(response => {
          console.log("Successfully destroyed", response.data);
          this.$router.push("/");
        });
      }
    }
  }
};
</script>
