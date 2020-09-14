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
          <td style="width:250px">
            <button class="btn-tertiary" v-on:click="sortProfessorByName()">
              Name<i class="material-icons">arrow_drop_down</i>
            </button>
          </td>
          <td style="width:200px">Title</td>
          <td style="width:300px">School</td>
          <td style="width:200px">Department</td>
          <td style="width:200px">subject</td>
          <td style="width: 85px">Action</td>
        </tr>
      </table>

      <table
        class="professor-information"
        v-for="professor in filterBy(professors, nameFilter, 'name')"
        style="width:100%;"
      >
        <tr>
          <td style="width:250px">
            <router-link v-bind:to="`/professors/${professor.id}`">{{
              professor.name
            }}</router-link>
          </td>
          <td style="width:200px">{{ professor.title }}</td>
          <td style="width:300px">{{ professor.school }}</td>
          <td style="width:200px">{{ professor.department }}</td>
          <td style="width:200px">{{ professor.subject }}</td>
          <td style="width: 85px">
            <button
              class="btn-tertiary"
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
  margin: 3rem auto 0 auto;
  text-align: left;
  width: 60%;
}

.searchbar h1 {
  font-size: 3em;
  line-height: 0em;
}

.searchbar input {
  display: inline-block;
  width: 60%;
  height: 2;
  font-size: 1.9em;
}

.search-button {
  display: inline-block;
  margin: 0 2rem 2rem 2rem;
  width: 100px;
  color: rgb(48, 48, 48);
  background: linear-gradient(
    90deg,
    rgba(244, 247, 40, 1) 0%,
    rgba(255, 160, 0, 1) 100%
  );
  box-shadow: 4px 6px 6px -3px rgba(41, 41, 41, 0.25),
    6px 8px 8px -4px rgba(41, 41, 41, 0.25);
}

.add-professor-button {
  margin-top: 3rem;
  padding: 0.75em;
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
  font-size: 1.2em;
}

.professor-table {
  width: 90%;
  margin: 5rem auto;
  border-radius: 11px;
  background-color: white;
  padding: 2rem;
}

table {
  border-width: 0px;
}

td {
  height: 3em;
  border-style: 0px;
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

.professor-information tr:nth-child(even) {
  background: #919191;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      professors: [],
      nameFilter: "",
      newProfessorName: "",
      newProfessorTitle: "",
      newProfessorSchool: "",
      newProfessorDepartment: "",
      newProfessorSubject: "",
      errors: [],
      name: "",
      title: "",
      school: "",
      department: "",
      subject: "",
    };
  },
  created: function() {
    axios.get("/professors").then((response) => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
    });
  },
  methods: {
    addProfessor: function() {
      document.querySelector("#professor-new").showModal();
    },
    createProfessor: function() {
      var params = {
        name: this.newProfessorName,
        title: this.newProfessorTitle,
        school: this.newProfessorSchool,
        department: this.newProfessorDepartment,
        subject: this.newProfessorSubject,
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
    deleteProfessor: function(id) {
      if (confirm("Are you sure you want to delete this professor?")) {
        axios.delete(`/professors/${id}`).then((response) => {
          console.log("Professor Deleted", response.data);
          this.$router.push("/professors");
        });
      }
    },
    // sortProfessorByName: function() {
    //   this.sortVariable = "name";
    //   if (this.professorSort === 1) {
    //     this.professorSort = -1;
    //   } else if (this.professorSort === -1) {
    //     this.professorSort = 1;
    //   }
    // },
  },
};
</script>
