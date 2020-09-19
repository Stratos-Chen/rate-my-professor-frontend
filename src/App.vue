<template>
  <div id="app">
        <div class="header">
      <div class="searchbar">
        <h1>Grade My Professor</h1>
        <h3>Get their grade before you get the grade</h3>
        <form role="search" method="get" class="search-form" action="">
          <label>
            <span class="screen-reader-text"></span>
            <input type="search" v-model="nameFilter" class="search-field" />
            <input type="submit" value="Search" class="search-button" />
          </label>
        </form>
        <br />
      </div>
    </div>
    <!-- <h1>Rate My Professor</h1> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style>
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}

/* table,
tr,
td {
  border: 1px solid black;
  border-collapse: collapse;
  background-color: floralwhite;
} */
body {
  background-color: #ededed;
  font-family: "Avenir", sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background-color: #73a2fd;
  font-family: "Avenir", sans-serif;
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

.btn-secondary {
  background-color: #cccccc;
}

.btn-tertiary {
  background-color: rgba(0, 0, 0, 0);
  color: #505050;
}

.btn-tertiary:hover {
  color: #999999 !important;
}
.btn-tertiary:active {
  border-color: white;
}

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

.searchbar .search-field {
  display: inline-block;
  width: 75%;
  height: 1.5em;
  font-size: 1.9em;
  border-style: solid;
  border-color: white;
  border-radius: 4px;
}

.search-button {
  font-family: "Avenir";
  text-transform: uppercase;
  font-weight: 800;
  display: inline-block;
  margin: 0 1rem;
  transform: translateY(-6px);
  border-style: none;
  border-radius: 4px;
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
</style>
