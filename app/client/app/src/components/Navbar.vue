<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="../assets/img/logo_delft.svg">
      </a>
      <a class="navbar-item title" href="#">
           Delft Techniek Tour
      </a>
    </div>
  </nav>
</template>
<script>

export default {
  name: 'Navbar',
  data () {
    return {
      isShowing: false
    }
  },
  methods: {
      toggleShow() {
          this.isShowing = !this.isShowing;
      }
  }
}
</script>

<style lang="sass" scoped>
$navbarheight: 10vh

nav.navbar
  height: $navbarheight
  background-color: $nav-background
  border-bottom: solid 1px #dbdbdb

.navbar-brand > .navbar-item
  padding: 0
  padding-right: 2rem
  max-height: none

.title
  font-weight: normal

.navbar-item img
  max-height: $navbarheight

.navbar
  padding: 0

</style>
