<template>
  <section>
      <img src="../assets/img/plattegrond_delft.png">
    <div class="level">
      <div class="level-item has-text-centered">
        <h1>Selecteer een tour</h1>
      </div>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <router-link tag="a" :to="{ path: 'one'}" class="button">Techniek Tour</router-link>
      </div>
  </div>
</section>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {

    }
  },
  computed: {

  }
}
</script>

<style lang="sass" scoped>

.button
  height: 250px
  width: 150px
  background-color: #A2D762

img
  width: 100%
  z-index: 0
  position: fixed

</style>
