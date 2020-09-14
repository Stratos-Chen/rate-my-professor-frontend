<template>
  <div class="Professor Index">
    <div class="professor-table">
    <table class ="professor-labels" style="width:95%;">
      <tr>
        <td style="width:250px">Professor's Name</td>
        <td style="width:200px">Title</td>
        <td style="width:300px">School</td>
        <td style="width:300px">Department</td>
        <td style="width:300px">subject</td>
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
        <td style="width:300px">{{ professor.department }}</td>
        <td style="width:300px">{{ professor.subject }}</td>
      </tr>
    </table>
    </div>
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
    };
  },
  created: function () {
    axios.get("/professors").then((response) => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
    });
  },
  methods: {},
};
</script>
