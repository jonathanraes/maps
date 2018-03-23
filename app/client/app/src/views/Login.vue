<template>
  <section>
    <img src="../assets/img/plattegrond_delft.png">
    <div class="level">
      <div class="level-item has-text-centered">
        <h1 class="title">{{ $t("message.select_tour") }}</h1>
      </div>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <router-link tag="a" :to="{ path: 'map'}" class="button">Techniek Tour</router-link>
      </div>
    </div>

  </section>
</template>

<script>

import MainMenu from "../components/MainMenu";

export default {
    components: { MainMenu },
    name: 'Login',
  data () {
    return {

    }
  },
  computed: {

  },
  destroyed: function () {
       this.$store.commit('showMenu', false)
  }
}
</script>

<style lang="sass" scoped>

.button
  height: 300px
  width: 200px
  background-color: #A2D762

img
  width: 100%
  z-index: 0
  position: fixed

.title
  margin-top: 10vh
  z-index: 9
</style>
