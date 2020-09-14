<template>
  <div class="Professor Index">
    <table style="width:1000px">
      <tr>
        <td style="width:200px">Professor's Name</td>
        <td style="width:200px">Title</td>
        <td style="width:200px">School</td>
        <td style="width:200px">Department</td>
        <td style="width:200px">subject</td>
      </tr>
    </table>

    <table
      v-for="professor in filterBy(professors, nameFilter, 'name')"
      style="width:1000px"
    >
      <tr>
        <td style="width:200px">
          <router-link v-bind:to="`/professors/${professor.id}`">{{
            professor.name
          }}</router-link>
        </td>
        <td style="width:200px">{{ professor.title }}</td>
        <td style="width:200px">{{ professor.school }}</td>
        <td style="width:200px">{{ professor.department }}</td>
        <td style="width:200px">{{ professor.subject }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      professors: [],
      nameFilter: "",
    };
  },
  created: function() {
    axios.get("/professors").then((response) => {
      console.log("All Professors:", response.data);
      this.professors = response.data;
    });
  },
  methods: {},
};
</script>
