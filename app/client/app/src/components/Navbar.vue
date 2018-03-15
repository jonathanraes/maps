<template>
  <nav class="navbar navbar-default" role="navigation" aria-label="main navigation">
      <a class="nav-item" href="#">
        <img src="../assets/img/logo_delft.svg">
      </a>
      <a class="nav-item page-title navbar-brand" href="#">
           Delft Techniek Tour
      </a>
      <div v-on:click="changeLanguage" class="lang-setting">{{ language }}</div>
  </nav>
</template>
<script>

import i18n from "../lang/lang.js";

export default {
  name: 'Navbar',
  data () {
    return {
      isShowing: false,
    }
  },
  methods: {
      changeLanguage () {
          if (i18n.locale === 'en') {
              this.setLang('nl')
          } else {
              this.setLang('en')
          }
      },
      setLang: function(lang){
          this.$store.dispatch('setLang', lang)
      }
  },
  computed: {
    language: function () {
        return i18n.locale
    }
  },
  beforeCreate () {
      //this.language = 'en'
  }
}
</script>

<style lang="sass" scoped>
$navbarheight: 10vh

nav.navbar
  height: $navbarheight
  background-color: $nav-background
  border-bottom: solid 1px #dbdbdb

.page-title
  font-weight: normal
  position: relative
  top: 50%
  transform: translateY(-50%)

.lang-setting
    position: relative
    top: 50%
    transform: translateY(-50%)
    font-size: 2vmax
    padding: 10px
    width: 2em


.nav-item img
  max-height: $navbarheight
  padding: 0

.navbar
  padding: 0

</style>
