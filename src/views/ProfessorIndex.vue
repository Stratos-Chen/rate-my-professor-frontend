<template>
  <div class="Professor Index">
    <table>
      <tr>
        <td>Professor's Name</td>
        <td>Title</td>
        <td>School</td>
        <td>Department</td>
        <td>subject</td>
      </tr>
    </table>

    <table v-for="professor in filterBy(professors, nameFilter, 'name')">
      <tr>
        <td>{{ professor.name }}</td>
        <td>{{ professor.title }}</td>
        <td>{{ professor.school }}</td>
        <td>{{ professor.department }}</td>
        <td>{{ professor.subject }}</td>
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
