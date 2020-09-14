<template>
  <div class="Professor Index">
    
    
    <form role="search" method="get" class="search-form" action="">
      <label>
        <span class="screen-reader-text">Search for:</span>
        <input type="search" v-model="nameFilter" class="search-field" />
      </label>
    </form>
    <br />
    <button class="dialog-button" v-on:click="addProfessor()">
      Add Professor
    </button>

    <!-- Professor Index -->
    <div class="professor-table">
    
    <table class ="professor-labels" style="width:95%;">
      <tr>
        <td style="width:250px">Name</td>
        <td style="width:200px">Title</td>
        <td style="width:300px">School</td>
        <td style="width:200px">Department</td>
        <td style="width:200px">subject</td>
        <td style="width: 85px">Action</td>
      </tr>
    </table>

    <table class="professor-information"
      v-for="professor in filterBy(professors, nameFilter, 'name')"
      style="width:95%;"
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
          class="btn-secondary"
          style="width:100px"
          v-on:click="deleteProfessor(professor.id)"
        >
          Delete Professor
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
.professor-table {
  width: 90%;
  margin: 5rem auto;
  border-radius: 11px;
  background-color: white;
}

table {
  border: none;
}

td {
  border-width: 0px;
  height: 3em;
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
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
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
  created: function () {
    axios.get("/professors").then((response) => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
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
  },
};
</script>
