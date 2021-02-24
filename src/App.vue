<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #ebeef6;
}

html, body {
  height: 100%;
  background-color: #ebeef6;
}

button:focus {
  outline: none;
  box-shadow: none;
}

.box {
  padding: 20px 0 20px 0;
  margin-bottom: 0.875rem;
  background-color: #fff;
  transition: all .5s ease-in-out;
  position: relative;
  border: 0px solid transparent;
  border-radius: 1.275rem;
  box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
