<template>
  <div class="professorshow">

    <!-- Professor Card -->
  
    <div class="professor">
      <div class="professor-info">
        <div class="rating">
          <h1 id="score">{{ professorScore }}</h1>
          <i class="material-icons">star_rate</i><i class="material-icons">star_rate</i><i class="material-icons">star_rate</i><i class="material-icons">star_rate</i>
          <p>{{ professor.title }}</p>
        </div>
        <h1>{{ professor.name }}</h1>
        <h3>{{ professor.school }}</h3>
        <p>{{ professor.department }}</p>
        <p>{{ professor.subject }}</p>
        <div class="image"></div>
      </div>
    </div>



    <!-- Review Index -->

    <div class="reviews">
      <div class="row reviews-bar">
        <h2>REVIEWS</h2><br>
        <div class=buttonholder>
          <button class="btn-tertiary" style="color:#505050;">Sort<i class="material-icons">arrow_drop_down</i></button>
          <button class="btn-tertiary" style="color:#505050;">Filter<i class="material-icons">arrow_drop_down</i></button>
          <button v-on:click="addReview()"><i class="material-icons" style="font-size:1.2em;font-weight:900;">add</i>Add Review</button>
        </div>
      </div>
      <div class="review-index" v-for="review in reviews">
        <h4>{{ review.author }} - {{ review.date | moment('MMM DD, YYYY')}}</h4>
        <p>Score: {{ review.score }}</p>
        <p>{{ review.text }}</p> 
        <button class="btn-secondary" v-on:click="editReview(review)"><i class="material-icons" style="font-size:1.2em;">edit</i>Edit Review</button>
        <button class="btn-tertiary" v-on:click="deleteReview(review.id)">Delete Review</button>
      </div>
      <h2 v-if="reviews.length===0" style="text-align: center;font-weight:300;"><br>No Reviews Yet!</h2>
    </div>

    <!-- New Review Modal -->

    <dialog id="reviewnew">
      <form id="review-create">
        Author:<input type ="text" v-model="newReviewAuthor"></input>
        Date:<input type ="date" v-model="newReviewDate"></input>
        Text:<input type ="text" v-model="newReviewText"></input>
        Score:<input type ="number" step="0.5" v-model="newReviewScore"></input>
        Professor_Id:<input type ="number" v-model="newReviewProfessorId"></input>
        <button v-on:click="createReview()">Create Review</button>
      </form>
    </dialog>

    <!-- Edit Review Modal -->

    <dialog id="review-edit">
      <form>
        Author:<input type ="text" v-model="currentReview.author"></input><br>
        Text:<input type ="text" style="height: 200px;width: 200px;" v-model="currentReview.text"></input><br>
        Score:<input type ="number" step="0.5" v-model="currentReview.score"></input><br>
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
  box-shadow: 6px 14px 29px 0px rgba(41, 41, 41, 0.08);
  /* line-height: 1.33em; */
}

.professor #score {
  font-size: 4em;
  color: #999999;
  letter-spacing: -10%;
  font-kerning: none;
  text-align: center;
}

.professor i {
  color: #dc9731;
}

.professor h1 {
  font-weight: 900 !important;
}

.professor .image {
  height: 64px;
  width: 64px;
  background-color: gray;
  margin: 3rem auto 1rem auto;
}

.professor .rating {
  text-align: center;
  margin-bottom: 6rem;
}

.reviews {
  display: inline-block;
  width: 45%;
  text-align: left;
  padding: 1.5em 6.5em 2.5em 3.5em;
  margin: 2.5em;
  background-color: #ffffff;
  border-radius: 7px;
  box-shadow: 8px 20px 33px 0px rgba(41, 41, 41, 0.08);
}

.reviews h4 {
  text-transform: uppercase;
  margin-top: 4em;
  margin-bottom: 0;
  line-height: 0.1em;
}

.reviews-bar {
  width: 100%;
}

.reviews-bar h2 {
  float: left;
  width: 100px;
}

.reviews p {
  line-height: 1.6em;
}

.review-index button {
  margin-right: 1.3em;
}

.buttonholder {
  width: 450px;
  text-align: right;
  display: block;
  margin: 0 0 0 auto;
}

.buttonholder button {
  align-content: top;
  margin-left: 1.1rem;
}

button {
  background-color: #73a2fd;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  border-radius: 3px;
  border-style: none;
  padding: 0.6rem;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
}

i {
  padding-right: 0.3em;
  vertical-align: bottom;
}

.btn-secondary {
  background-color: #cccccc;
}

.btn-tertiary {
  background-color: rgba(0, 0, 0, 0);
  color: #999999;
}

dialog {
  height: 650px;
  width: 400px;
}

dialog form {
  text-align: left;
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
  mounted: function () {},
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
      if (confirm("Are you sure you want to delete this review?")) {
        axios.delete(`/reviews/${id}`).then((response) => {
          console.log("Review Deleted");
        });
      }
    },
    editReview: function (review) {
      this.currentReview = review;

      document.querySelector("#review-edit").showModal();
    },
    updateReview: function () {
      var params = {
        id: this.currentReview.id,
        text: this.currentReview.text,
        score: this.currentReview.score,
      };
      axios
        .put(`/reviews/${this.currentReview.id}`, params)
        .then((response) => {
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
      var result = sumTotal / this.reviews.length;
      console.log("Rating:", result);
      if (!isNaN(result)) {
        this.professorScore = result.toFixed(1);
      }
    },
  },
};
</script>
