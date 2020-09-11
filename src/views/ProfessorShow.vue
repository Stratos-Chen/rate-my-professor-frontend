<template>
  <div class="professorshow">
    <!-- Index Professors -->
    
    <div class="professor">
      <div class="professor-info">
        <h1 id="score">{{ professorScore }}</h1>
        <p>{{ professor.title }}</p>
        <h1>{{ professor.name }}</h1>
        <h3>{{ professor.school }}</h3>
        <p>{{ professor.department }}</p>
        <p>{{ professor.subject }}</p>
      </div>
    </div>



    <!-- Review Index -->
    <div class="reviews">
      <h2>REVIEWS</h2>
      <button v-on:click="addReview()">Add Review</button>
      <div class="review-index" v-for="review in reviews">
        <h4>{{ review.author }} - {{ review.date | moment('MMM Do, YYYY')}}</h4>
        <p>Score: {{ review.score }}</p>
        <p>{{ review.text }}</p>
        <button v-on:click="editReview(review)">Edit Review</button>
        <button v-on:click="deleteReview(review.id)">Delete Review</button>
      </div>
    </div>

    <!-- Create Review -->
    <dialog id="reviewnew">
      <form id="review-create">
        Author:<input type ="text" v-model="newReviewAuthor"></input>
        Date:<input type ="date" v-model="newReviewDate"></input>
        Text:<input type ="text" v-model="newReviewText"></input>
        Score:<input type ="number" step="0.1" v-model="newReviewScore"></input>
        Professor_Id:<input type ="number" v-model="newReviewProfessorId"></input>
        <button v-on:click="createReview()">Create Review</button>
      </form>
    </dialog>

    <!-- Edit Review -->
    <dialog id="review-edit">
      <form>
        Author:<input type ="text" v-model="currentReview.author"></input><br>
        Text:<input type ="text" v-model="currentReview.text"></input><br>
        Score:<input type ="number" step="0.1" v-model="currentReview.score"></input><br>
        Professor_Id:<input type ="number" v-model="currentReview.professor_id"></input><br>
        <button v-on:click="updateReview()">Update Review</button><br>
      </form>
    </dialog>

        <!-- Edit Professor Modal -->
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
    
  </div>
</template>
<style scoped>
.professor {
  text-transform: uppercase;
  text-align: left;
  display: inline-block;
  width: 20%;
  padding: 2.5rem;
  margin: 2.5rem;
  background-color: #ffffff;
  align-items: top;
  border-radius: 7px;
  vertical-align: top;
  letter-spacing: 0.18em;
}

.professor #score {
  font-size: 4em;
  color: #999999;
  letter-spacing: -10%;
  font-kerning: none;
  text-align: center;
}

.reviews {
  display: inline-block;
  width: 45%;
  text-align: left;
  padding: 2.5em;
  margin: 2.5em;

  background-color: #ffffff;
  border-radius: 7px;
}

.reviews h4 {
  text-transform: uppercase;
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
import axios from "axios";
import VueMoment from "vue-moment";

export default {
  name: "Home",
  components: {},
  data: function () {
    return {
      message: "Welcome to rate my professor! This is a change.",
      professor: {},
      reviews: [],
      professorScore: "",
      newReviewAuthor: "",
      newReviewDate: "",
      newReviewText: "",
      newReviewScore: "",
      newReviewProfessorId: "",
      currentReview: [],
      currentProfessor: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/professors/${this.$route.params.id}`).then((response) => {
      console.log("Data:", response.data);
      this.professor = response.data.professors[0];
      this.reviews = response.data.reviews;
      this.calculateScore();
    });
  },
  methods: {
    addReview: function () {
      document.querySelector("#reviewnew").showModal();
    },
    createReview: function () {
      var params = {
        author: this.newReviewAuthor,
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
    // getProfessorName: function (professorId) {
    //   var index = this.professors.find((x) => x.id === professorId);
    //   return index.name;
    // },
    editReview: function (review) {
      this.currentReview = review;

      document.querySelector("#review-edit").showModal();
    },
    updateReview: function () {
      var params = {
        author: this.currentReviewAuthor,
        date: this.currentReviewDate,
        text: this.currentReviewText,
        score: this.currentReviewScore,
        professor_id: this.currentReviewProfessorId,
      };
      axios.put(`reviews/${this.review.id}`, params).then((response) => {
        console.log("");
      });
    },
    editProfessor: function (professor) {
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
    deleteProfessor: function (id) {
      if (confirm("Are you sure you want to delete this entry?")) {
        axios.delete(`professors/${id}`).then((response) => {
          console.log("Successfully destroyed", response.data);
          this.$router.push("/");
        });
      }
    },
    calculateScore: function () {
      var sumTotal = 0;
      this.reviews.forEach(function (index) {
        sumTotal += index.score;
      });
      console.log(sumTotal);
      var result = sumTotal / this.reviews.length;
      console.log("Rating:", result);
      this.professorScore = result;
    },
  },
};
</script>
