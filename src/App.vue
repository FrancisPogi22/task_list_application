<template>
  <section id="header">
    <div class="wrapper">
      <div class="header-con">
        <img src="./assets/img/Logo.png" alt="Logo" />
        <ul class="navbar">
          <li><RouterLink to="/">Task List</RouterLink></li>
        </ul>
      </div>
    </div>
  </section>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView,
  },
};
</script>

<style scoped>
#header {
  position: fixed;
  width: 100%;
  background: #ffffff;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

#header .wrapper {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
}

#header .header-con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

#header .header-con ul {
  display: flex;
  gap: 20px;
}

#header .header-con img {
  width: 50px;
}

#header .header-con a {
  color: #1d1e20;
  transition: 0.2s;
  font-weight: 500;
}

#header .header-con a:hover {
  opacity: 0.7;
}

@media screen and (max-width: 1920px) {
  #header .header-con {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>