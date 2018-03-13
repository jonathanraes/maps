<template>
  <section>

    <div class="container">
      <maps-component :data="'DataFromParent'"/>
    </div>

  </section>
</template>
<script>
import MapsComponent from '../components/MapsComponent'
import MenuComponent from '../components/MenuComponent'

export default {
  name: 'Property',
  components: {
      MenuComponent,
      'maps-component': MapsComponent,
    'menu-component': MenuComponent
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
