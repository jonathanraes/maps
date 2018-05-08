<template>
<div>

    <nav>
        <router-view name="navbar"></router-view>
    </nav>

    <section class="section">
      <transition name="fade">
        <div class="container">

          <router-view name="main"></router-view>
        </div>
      </transition>
    </section>

    <section class="section">
      <transition name="fade">
        <div class="container">
            <router-view name="mainmenu"></router-view>
        </div>
      </transition>
    </section>

</div>
</template>

<script>
// import MainMenu from 'components/MainMenu'

// Google analytics
var ua = require('universal-analytics');
var visitor = ua('UA-118879648-1');
visitor.pageview("/").send()

export default {
  name: '',
    components: {
        // 'main-menu': MainMenu
    },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style lang="sass">
    .section
        padding: 0

        .container
            width: 100%
            max-width: none
            padding: 0
</style>
