<template>
  <section>
    <div class="background-image">

    </div>
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
    name: 'TourSelect',
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
  height: 40vh
  width: 40vw
  border-radius: 30px
  background-color: #E6E6E6
  color: black
  display: flex
  text-align: justify
  flex-flow: column
  border: 3px solid black
  font-size: 4rem


.background-image
  min-width: 100%
  min-height: 100%
  max-width: unset
  max-height: unset
  z-index: 0
  position: fixed
  background-image: url(../assets/img/plattegrond_delft.png)
  background-repeat: no-repeat
  background-position: center
  background-size: 100% auto

  @media only screen and (orientation: portrait)
    background-size: auto 100%



.title
  margin-top: 10vh
  z-index: 9
  font-size: 3rem
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white

</style>
