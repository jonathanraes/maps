<template>
  <section>
    <youtubevid></youtubevid>

    <div class="container">
      <maps-component :data="'DataFromParent'"/>
    </div>

    <menu-component></menu-component>
  </section>
</template>
<script>
import MapsComponent from '../components/MapsComponent'
import MenuComponent from '../components/MenuComponent'
import YoutubeModal from '../components/YoutubeModal'

export default {
  name: 'Property',
  components: {
      'maps-component': MapsComponent,
      'menu-component': MenuComponent,
      'youtubevid': YoutubeModal
  },
  data () {
    return {

    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="sass" scoped>

  .container
    padding: 0
    width: 100%
    max-width: none

</style>
