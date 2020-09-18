<template>
  <div class="professorshow">
    <div class="backbutton">
    <router-link to="../professors" class="btn-tertiary backbutton"><i class="material-icons" >keyboard_arrow_left
      </i>BACK TO SEARCH</router-link></div>
    <!-- Professor Card -->
    
    <div class="professor">
      
      <div class="professor-info">
        <div class="rating">
          <h1 id="score" style="font-weight:500 !important;">{{ professorScore }}</h1>
          <div class="starrating" v-show="professorScore">
            <star-rating v-model="professorScore" :increment="0.1" :star-size="23" :padding="9" active-color="#da952e" :read-only="true" :show-rating="false"></star-rating>
          </div>
        </div>
        <div class="image"><img :src="`//logo.clearbit.com/${professor.url}?size=54`" style="border-radius: 3px;">
        </div>
        <p style="text-align: center;">{{ professor.school }}</p>
        <div class="professor-details">
          <h1>{{ professor.name }}</h1>
          <h4><strong>{{ professor.title }}</strong></h4>
          <h6>{{ professor.department }}</h6>
          <p>{{ professor.subject }}</p>
        </div>
      </div>

      <div class="professor-reviews" v-show="this.reviews.length > 0">
        <ul>  
          <li><i class="material-icons" >star</i><i class="material-icons" >star</i><i class="material-icons" >star</i><i class="material-icons" >star</i><i class="material-icons" >star</i>
            <div class="progress-bar">
              <div class="progress-fill" :style="`width:${reviewPercentage(5)}%;`">
              </div>
            </div>
          </li>
          <li><i class="material-icons" >star</i><i class="material-icons" >star</i><i class="material-icons" >star</i><i class="material-icons" >star</i> 
            <div class="progress-bar">
              <div class="progress-fill" :style="`width:${reviewPercentage(4)}%;`">
              </div>
            </div>
          </li>
          <li><i class="material-icons" >star</i><i class="material-icons" >star</i><i class="material-icons" >star</i>
            <div class="progress-bar">
              <div class="progress-fill" :style="`width:${reviewPercentage(3)}%;`">
              </div>
            </div>
          </li>
          <li><i class="material-icons" >star</i><i class="material-icons" >star</i>
            <div class="progress-bar">
              <div class="progress-fill" :style="`width:${reviewPercentage(2)}%;`">
              </div>
            </div>
          </li>
          <li><i class="material-icons" >star</i>
            <div class="progress-bar">
              <div class="progress-fill" :style="`width:${reviewPercentage(1)}%;`">
              </div>
            </div>
          </li>
        </ul>
      </div>

      <button class="btn-tertiary" id="professor-edit-btn" v-on:click="editProfessor()" ><i class="material-icons" style="font-size:1.2em;color: #CCCCCC;">create</i>edit</button>

    </div>

    



    <!-- Review Index -->

    <div class="reviews">
      
      <div class="row reviews-bar">
        <h2>REVIEWS</h2><br>
        <div class=buttonholder>
          <button class="btn-tertiary" style="color:#505050;" v-on:click="sortScoreReview()">Score<i class="material-icons" >arrow_drop_down</i></button>

          <button class="btn-tertiary" style="color:#505050;" v-on:click="sortDateReview()">Date<i class="material-icons">arrow_drop_down</i></button>
          
          <button class="btn-tertiary" v-on:click="filterArray()">Stars ({{ratingFilter}})<i class="material-icons">arrow_drop_down</i></button>
          <button class="btn-primary" v-on:click="addReview()"><i class="material-icons" style="font-size:1.2em;font-weight:900;">add</i>Add Review</button>
        </div>
      </div>
      
      <div class="review-index" v-for="review in  orderBy(reviewDisplay, sortVariable, reviewSort)">

        <h4>{{ review.author }} - {{ review.date | moment('MMM DD, YYYY')}}</h4>
        <p>Score: {{ review.score }}</p>
          <star-rating v-model="review.score" :increment="0.1" :star-size="15" :padding="5" active-color="#da952e" :read-only="true" :show-rating="false"></star-rating>
        <p>{{ review.text }}</p> 
        <button class="btn-secondary" v-on:click="editReview(review)"><i class="material-icons" style="font-size:1.2em;">edit</i>Edit Review</button>
        <button class="btn-tertiary like-button" v-on:click="likeReview(review.id)"><i class="material-icons" style="font-size:1.2em;">thumb_up</i>{{review.likes}}</button>
        <button class="btn-tertiary delete" v-on:click="deleteReview(review.id)">Delete Review</button>
        
      </div>
      <h2 v-if="reviews.length===0" style="text-align: center;font-weight:300;"><br>No Reviews Yet!</h2>
    </div>

    <!-- New Review Modal -->

    <dialog id="reviewnew">
      <h3>New Review: {{ professor.name }} </h3>
      <form id="review-create">
       <label>Author:</label>
       <input type ="text" v-model="newReviewAuthor">
        <label>Text:</label>
        <textarea class="review-text" v-model="newReviewText"></textarea>
        <label style="line-height: 0.5em;">Score:</label>
        <!-- <input type ="number" step="0.5" v-model="newReviewScore"> -->

        <div class="star-rater">
          <star-rating text-class="star-score" @rating-selected="setRating" :increment="0.5" :star-size="31" :padding="12" ></star-rating>
        </div>
        
        <button class="dialog-button" v-on:click="createReview()">Create Review</button>
      </form>
    </dialog>

    <!-- Edit Review Modal -->

    <dialog id="review-edit">
      <form>
        <label>Author:</label><input type ="text" v-model="currentReview.author"></input>
        <label>Text:</label><textarea class="review-text" v-model="currentReview.text"></textarea>
        <div class="star-rater">
          <star-rating v-model="currentReview.score" @rating-selected="setRating" :increment="0.5" :star-size="31" :padding="12"></star-rating>
        </div>
        <button class="dialog-button" v-on:click="updateReview()">Update Review</button><br>
      </form>
    </dialog>

    <!-- Edit Professor Modal -->

    <dialog id="professor-edit">
      <h2>Edit Professor</h2>
      <form>
        <label>Professor's Name: </label>
        <input type="text" class="form-control" v-model="professor.name" />
        <label>Title: </label>
        <input type="text" class="form-control" v-model="professor.title" />
        <label>School: </label>
        <input type="text" class="form-control" v-model="professor.school" />
        <label>Department:</label>
        <input type=text class="form-control" v-model="professor.department" />
        <label>Subject:</label>
        <input type=text class="form-control" v-model="professor.subject" />
        <label>URL:</label>
        <input type=text class="form-control" v-model="professor.url" />
      <button class="dialog-button" v-on:click="updateProfessor()">Update Professor</button>
      </form>
    </dialog>

    <a href="https://clearbit.com" class="credits">Logos provided by Clearbit</a>
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
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.071),
    0 20px 40px -20px rgba(0, 0, 0, 0.4), 0 70px 50px -30px rgba(0, 0, 0, 0.05),
    0 30px 60px -5px rgba(203, 14, 39, 0.036);
  /* line-height: 1.33em; */
}

.professor #score {
  font-size: 5em;
  color: #999999;
  letter-spacing: -10%;
  font-kerning: none;
  text-align: center;
  margin-block-end: 0.5px;
}

.professor i {
  color: #dc9731;
}

.professor .rating {
  text-align: center;
  margin-bottom: 2rem;
}

.professor .starrating {
  display: inline-block;
  margin: 0 auto 0 9px;
  align-content: center;
  text-align: center;
}

.professor h1 {
  font-weight: 900 !important;
}

.professor .image {
  height: 54px;
  width: 54px;
  margin: 4rem auto 0rem auto;
  box-shadow: 4px 6px 6px -3px rgba(41, 41, 41, 0.25),
    6px 8px 8px -4px rgba(41, 41, 41, 0.25);
}

.professor-details {
  margin-top: 5rem;
  padding: 0.5rem;
  border-radius: 6px;
}

.professor-details h1 {
  display: inline-block;
  margin-bottom: 0;
}

.professor-details h4 {
  margin-top: 0;
}

.professor-details h6 {
  margin-top: 4em;
  margin-bottom: 0em;
  line-height: 0em;
  font-weight: 900;
}
.professor-details p {
  line-height: 0em;
}

.professor-reviews {
  width: 100%;
  margin: 3rem 0 0;
}

.professor-reviews ul {
  list-style: none;
  margin: 0 auto;
  text-align: right;
  padding: 0 10%;
  padding-inline-start: 0;
}

.professor-reviews li {
  margin: 0 auto;
  font-size: 1em;
}

.professor-reviews li i {
  font-size: 1em;
}

.progress-bar {
  width: 65%;
  display: inline-block;
  background-color: lightgray;
  border-radius: 6px;
  margin-left: 5px;
  margin-bottom: 5px;
}

.progress-fill {
  background-color: #9289c2;
  /* width: 75%; */
  height: 4.5px;
  border-radius: 6px;
}

#professor-edit-btn {
  display: block;
  color: #cccccc;
  padding-left: 0px;
  font-weight: 400;
  margin: 3rem auto 0 auto;
}

.reviews {
  display: inline-block;
  width: 45%;
  text-align: left;
  padding: 1.5em 6.5em 2.5em 3.5em;
  margin: 2.5em;
  background-color: #ffffff;
  border-radius: 7px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.071),
    0 20px 40px -20px rgba(0, 0, 0, 0.4), 0 70px 50px -30px rgba(0, 0, 0, 0.05),
    0 30px 60px -5px rgba(203, 14, 39, 0.036);
  /* box-shadow: 8px 20px 33px 0px rgba(41, 41, 41, 0.08); */
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
  width: 600px;
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
  outline: none;
}

.btn-primary:hover {
  background-color: #a4c2ff;
}

button i {
  padding-right: 0.3em;
  vertical-align: bottom;
}

.btn-secondary {
  background-color: #cccccc;
}

.btn-secondary:hover {
  background-color: #e1e1e1;
}

.btn-tertiary {
  background-color: rgba(0, 0, 0, 0);
  color: #505050;
}

.btn-tertiary:hover {
  color: #999999;
}
.btn-tertiary:active {
  border-color: white;
}

.backbutton {
  margin-left: 4%;
  text-decoration: none;
  padding: 1.2em;
  letter-spacing: 0.18em;
  text-align: left;
}

.backbutton button {
  vertical-align: middle;
  color: #b1b1b1;
  padding: 1.2em;
  font: "avenir";
}

.backbutton i {
  vertical-align: bottom;
}

.delete:hover {
  color: #bf3100 !important;
}

.like-button {
  text-align: right;
  color: #888787;
}

.like-button:hover {
  background-color: #ebebeb;
}

dialog {
  font-family: "Lato", sans-serif;
  height: 60rem;
  width: 600px;
  text-transform: uppercase;
  border-radius: 10px;
  border-width: 0px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.071),
    0 20px 40px -20px rgba(0, 0, 0, 0.4), 0 70px 50px -30px rgba(0, 0, 0, 0.05),
    0 30px 60px -5px rgba(203, 14, 39, 0.036);
}

#review-edit {
  height: 49rem;
}

form label {
  padding-bottom: 0.5em;
}

dialog form {
  /* align-content: left; */
  text-align: left;
  line-height: 5em;
}

dialog input,
dialog textarea {
  padding-left: 0.4em;
  margin: 0 auto;
  width: 95%;
  display: block;
  height: 2em;
  background-color: #ededed;
  border-radius: 6px;
  border-style: none;
  align-items: top;
  font-size: 1.3em;
}

dialog .star-rater {
  display: block;
  margin: 0 auto;
  text-align: center;
  /* align-items: center;
  align-content: center; */
  width: 230px;
}

.star-score {
  font-weight: 900;
  font-family: serif;
  margin-bottom: 2em;
}

.dialog-button {
  display: block;
  margin: 2em auto 0 auto;
  text-align: center;
}

.review-text {
  height: 400px;
  line-height: 1.6em;
  overflow: scroll;
}

.credits {
  text-align: center;
  display: block;
  color: rgb(172, 167, 182);
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
import axios from "axios";
import VueMoment from "vue-moment";
import Vue2Filters from "vue2-filters";

export default {
  name: "Home",
  mixins: [Vue2Filters.mixin],
  components: {},
  data: function () {
    return {
      message: "Welcome to rate my professor! This is a change.",
      professor: {},
      reviews: [],
      reviewsDisplay: [],
      professorScore: "",
      newReviewAuthor: "",
      newReviewText: "",
      newReviewScore: "",
      newReviewProfessorId: "",
      currentReview: [],
      reviewSort: -1,
      currentProfessor: {},
      errors: [],
      schoolUrl: "nyu.edu",
      ratingFilter: 0,
      sortVariable: "",
    };
  },
  created: function () {
    axios.get(`/professors/${this.$route.params.id}`).then((response) => {
      console.log("Data:", response.data);
      this.professor = response.data.professors[0];
      this.reviews = response.data.reviews;
      this.reviewDisplay = this.reviews;
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
        professor_id: this.professor.id,
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
        author: this.currentReview.author,
        date: this.currentReview.date,
        text: this.currentReview.text,
        score: this.currentReview.score,
        professor_id: this.currentReview.professor_id,
      };
      axios
        .put(`/reviews/${this.currentReview.id}`, params)
        .then((response) => {
          this.$router.push(`/professors/${this.professor.id}`);
        });
    },
    editProfessor: function (professor) {
      this.currentProfessor = professor;
      document.querySelector("#professor-edit").showModal();
    },
    updateProfessor: function (id) {
      var params = {
        name: this.professor.name,
        title: this.professor.title,
        school: this.professor.school,
        department: this.professor.department,
        subject: this.professor.subject,
        url: this.professor.url,
      };
      axios
        .put(`/professors/${this.professor.id}`, params)
        .then((response) => {
          this.$router.push(`/professors/${this.professor.id}`);
        })
        .catch((error) => {
          this.error = error.response.data.errors;
        });
    },
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
        this.professorScore = +result.toFixed(1);
      }
    },
    sortDateReview: function () {
      this.sortVariable = "date";
      if (this.reviewSort === 1) {
        this.reviewSort = -1;
      } else if (this.reviewSort === -1) {
        this.reviewSort = 1;
      }
    },
    sortScoreReview: function () {
      this.sortVariable = "score";
      if (this.reviewSort === 1) {
        this.reviewSort = -1;
      } else if (this.reviewSort === -1) {
        this.reviewSort = 1;
      }
    },
    filterArray: function () {
      this.ratingFilter += 1;
      if (this.ratingFilter === 6) {
        this.ratingFilter = 0;
        this.reviewDisplay = this.reviews;
      }
      this.reviewDisplay = this.reviewDisplay.filter(
        (index) => index["score"] >= this.ratingFilter
      );
    },
    reviewPercentage: function (rating) {
      var count = 0;
      this.reviews.forEach((review) => {
        if (review.score >= rating && review.score < rating + 1) {
          count++;
        }
        console.log("Score", (count / this.reviews.length) * 100);
      });
      return (count / this.reviews.length) * 100;
    },
    setRating: function (rating) {
      this.newReviewScore = rating;
    },
    likeReview(id) {
      axios.put(`/reviews/${id}/like`).then((response) => {
        console.log("Review Liked:", response.data);
        this.reviews.find((x) => x.id === id).likes = response.data[0].likes;
      });
    },
  },
};
</script>
