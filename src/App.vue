<template>
  <div id="app">
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
</style>
