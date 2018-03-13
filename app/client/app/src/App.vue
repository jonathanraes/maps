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
          <router-view name="menu"></router-view>
        </div>
      </transition>
    </section>

</div>
</template>

<script>

export default {
  name: '',
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
