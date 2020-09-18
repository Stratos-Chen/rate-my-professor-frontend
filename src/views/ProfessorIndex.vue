<template>
  <div class="Professor Index">
    <div class="header">
      <div class="searchbar">
        <h1>Grade My Professor</h1>
        <h3>Get their grade before you get the grade</h3>
        <form role="search" method="get" class="search-form" action="">
          <label>
            <span class="screen-reader-text"></span>
            <input type="search" v-model="nameFilter" class="search-field" />
            <button class="search-button">
              Search
            </button>
          </label>
        </form>
        <br />
      </div>
    </div>

    <button class="add-professor-button" v-on:click="addProfessor()">
      <i class="material-icons">
        school
      </i>
      Add Professor
    </button>

    <!-- Professor Index -->
    <div class="professor-table">
      <table class="professor-labels" style="width:100%;">
        <tr>
          <td style="width:250px;padding-left:1em;">
            <button class="btn-tertiary" v-on:click="sortProfessorByName()">
              Name<i class="material-icons">arrow_drop_down</i>
            </button>
          </td>

          <td style="width:200px">
            <button class="btn-tertiary" v-on:click="sortProfessorByScore()">
              Score<i class="material-icons">arrow_drop_down</i>
            </button>
          </td>
          <td style="width:300px">
            <button class="btn-tertiary" v-on:click="sortProfessorBySchool()">
              School<i class="material-icons">arrow_drop_down</i>
            </button>
          </td>
          <td style="width:200px">
            <button
              class="btn-tertiary"
              v-on:click="sortProfessorByDepartment()"
            >
              Department<i class="material-icons">arrow_drop_down</i>
            </button>
          </td>
          <td style="width:200px">
            <button class="btn-tertiary" v-on:click="sortProfessorBySubject()">
              subject<i class="material-icons">arrow_drop_down</i>
            </button>
          </td>
          <td style="width: 120px"></td>
        </tr>
      </table>

      <table
        class="professor-information"
        v-for="(professor, index) in filterBy(professors, nameFilter, 'name')"
        style="width:100%;"
         cellspacing="0"
      >
        <tr :class="{'evenrow': index % 2 !== 0 }">
          <td style="width:250px;padding-left:1em;">
            <a :href="`/professors/${professor.id}`">{{
              professor.name
            }}</a>
          </td>
          <td style="width:200px"><star-rating :rating="professor.avg" :increment="0.1" :star-size="17" :padding="7" active-color="#da952e" :read-only="true" :show-rating="false"></star-rating></td>
          <td style="width:300px">{{ professor.school }}</td>
          <td style="width:200px">{{ professor.department }}</td>
          <td style="width:200px">{{ professor.subject }}</td>
          <td style="width: 120px">
            <button
              class="btn-tertiary delete"

              style="width:100px"
              v-on:click="deleteProfessor(professor.id)"
            >
              <i class="material-icons">
                delete_outline
              </i>
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>

    <!-- New Professor Entry -->

    <dialog id="professor-new">
      <h2>Create New Professor</h2>
      <form id="professor-create">
        <label>Name:</label>
        <input type="text" v-model="newProfessorName" />
        <label>Title:</label>
        <input type="text" v-model="newProfessorTitle" />
        <label>School:</label>
        <input type="text" v-model="newProfessorSchool" />
        <label>Department:</label>
        <input type="text" v-model="newProfessorDepartment" />
        <label>Subject:</label>
        <input type="text" v-model="newProfessorSubject" />
        <label>URL:</label>
        <input type="text" v-model="newProfessorUrl" />

        <button class="dialog-button" v-on:click="createProfessor()">
          Add Professor
        </button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.header {
  display: inline-block;
  height: 250px;
  width: 100%;
  background: rgb(54, 54, 80);
  color: white;
  align-content: middle;
}

.searchbar {
  margin: 4.5rem auto 0 auto;
  text-align: left;
  width: 1000px;
}

.searchbar h1 {
  font-size: 3em;
  line-height: 0em;
}

.searchbar input {
  display: inline-block;
  width: 75%;
  height: 1.5em;
  font-size: 1.9em;
  border-style: solid;
  border-color: white;
  border-radius: 4px;
}

.search-button {
  display: inline-block;
  margin: 0 1rem;
  transform: translateY(-6px);
  width: 100px;
  height: 45px;
  color: rgb(48, 48, 48);
  background: linear-gradient(
    90deg,
    rgba(244, 247, 40, 1) 0%,
    rgba(255, 160, 0, 1) 100%
  );
  box-shadow: 4px 6px 8px -3px rgba(41, 41, 41, 0.297),
    6px 8px 10px -4px rgba(41, 41, 41, 0.303);
}

.search-button:hover {
  background: rgba(244, 247, 40, 1) 0%;
}

.add-professor-button {
  font-size: 1.1em;
  margin-top: 3rem;
  padding-top: 1em;
  padding-bottom: 0.75em;
}

.add-professor-button i {
  padding-right: 0.5em;
}

.add-professor-button:hover {
  background-color: #a4c2ff;
}

button i {
  vertical-align: middle;
}

.btn-tertiary {
  font-size: 1em;
  padding-left: 0px;
}

.delete {
  font-size: 0.7em;
  color: #cccccc;
}

.delete:hover {
  color: #bf3100 !important;
}

.professor-table {
  width: 90%;
  margin: 4rem auto;
  border-radius: 11px;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.071),
    0 20px 40px -20px rgba(0, 0, 0, 0.4), 0 70px 50px -30px rgba(0, 0, 0, 0.05),
    0 30px 60px -5px rgba(203, 14, 39, 0.036);
}

.professor-table a {
  text-transform: uppercase;
  text-decoration: none;
  color: #3f63ab;
  font-weight: 500;
}

.professor-table a:hover {
  color: #cccccc;
}

table {
  border-style: none;
}

td {
  height: 3em;
  border-style: none;
}

.evenrow {
  background: #f0f0f0;
}

.professor-labels {
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  border-color: white;
}

.professor-information {
  text-align: left;
  font-size: 1.2em;
}

/* .professor-information tr:nth-child(even) {
  background: #919191;
} */

.professor-information router-link {
  text-decoration: none;
  text-transform: uppercase;
}

dialog {
  font-family: "Avenir", sans-serif;
  height: 90%;
  width: 600px;
  text-transform: uppercase;
  border-radius: 10px;
  border-width: 0px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.071),
    0 20px 40px -20px rgba(0, 0, 0, 0.4), 0 70px 50px -30px rgba(0, 0, 0, 0.05),
    0 30px 60px -5px rgba(203, 14, 39, 0.036);
}

.reviewedit {
  height: 30%;
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
  width: 100%;
  display: block;
  height: 2em;
  background-color: #ededed;
  border-radius: 6px;
  border-style: none;
  align-items: top;
  font-size: 1.3em;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      professors: [],
      reviews: [],
      nameFilter: "",
      newProfessorName: "",
      newProfessorTitle: "",
      newProfessorSchool: "",
      newProfessorDepartment: "",
      newProfessorSubject: "",
      newProfessorUrl: "",
      errors: [],
      name: "",
      title: "",
      school: "",
      department: "",
      subject: "",
      nameSort: 1,
      scoreSort: 1,
      schoolSort: 1,
      departmentSort: 1,
      subjectSort: 1,
      sortIcon: "arrow_drop_down",
    };
  },
  created: function () {
    axios.get("/professors").then((response) => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
    });
    axios.get("/reviews").then((response) => {
      console.log("Reviews", response.data);
      this.reviews = response.data;
    });
  },
  methods: {
    addProfessor: function () {
      document.querySelector("#professor-new").showModal();
    },
    createProfessor: function () {
      var params = {
        name: this.newProfessorName,
        title: this.newProfessorTitle,
        school: this.newProfessorSchool,
        department: this.newProfessorDepartment,
        subject: this.newProfessorSubject,
        url: this.newProfessorUrl,
      };
      axios
        .post("/professors", params)
        .then((response) => {
          console.log("Professor Created", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    deleteProfessor: function (id) {
      if (confirm("Are you sure you want to delete this professor?")) {
        axios.delete(`/professors/${id}`).then((response) => {
          console.log("Professor Deleted", response.data);
          this.$router.push("/professors");
        });
      }
    },
    sortProfessorByName: function () {
      if (this.nameSort === 1) {
        this.nameSort = -1;
        this.professors.sort(function (a, b) {
          var result = a.name.localeCompare(b.name);
          return result;
        });
      } else if (this.nameSort === -1) {
        this.nameSort = 1;
        this.professors.sort(function (b, a) {
          var result = a.name.localeCompare(b.name);
          return result;
        });
      }
    },
    sortProfessorByScore: function () {
      if (this.scoreSort === 1) {
        this.scoreSort = -1;
        this.professors.sort(function (a, b) {
          var result = a.avg.localeCompare(b.avg);
          return result;
        });
      } else if (this.scoreSort === -1) {
        this.scoreSort = 1;
        this.professors.sort(function (b, a) {
          var result = a.avg.localeCompare(b.avg);
          return result;
        });
      }
    },
    sortProfessorBySchool: function () {
      if (this.schoolSort === 1) {
        this.schoolSort = -1;
        this.professors.sort(function (a, b) {
          var result = a.school.localeCompare(b.school);
          return result;
        });
      } else if (this.schoolSort === -1) {
        this.schoolSort = 1;
        this.professors.sort(function (b, a) {
          var result = a.school.localeCompare(b.school);
          return result;
        });
      }
    },
    sortProfessorByDepartment: function () {
      if (this.departmentSort === 1) {
        this.departmentSort = -1;
        this.professors.sort(function (a, b) {
          var result = a.department.localeCompare(b.department);
          return result;
        });
      } else if (this.departmentSort === -1) {
        this.departmentSort = 1;
        this.professors.sort(function (b, a) {
          var result = a.department.localeCompare(b.department);
          return result;
        });
      }
    },
    sortProfessorBySubject: function () {
      if (this.subjectSort === 1) {
        this.subjectSort = -1;
        this.professors.sort(function (a, b) {
          var result = a.subject.localeCompare(b.subject);
          return result;
        });
      } else if (this.subjectSort === -1) {
        this.subjectSort = 1;
        this.professors.sort(function (b, a) {
          var result = a.subject.localeCompare(b.subject);
          return result;
        });
      }
    },
    // reviewsByProfessor: function (id) {
    //   var reviewList = this.reviews
    //     .filter((obj) => obj.professor_id === id)
    //     .map((obj) => obj.score);
    //   var sum = reviewList.reduce((a, b) => a + b, 0);
    //   var result = sum / reviewList.length;
    //   if (!isNaN(result)) {
    //     return result;
    //   }
    // },
  },
};
</script>
