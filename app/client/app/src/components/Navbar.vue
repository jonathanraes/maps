<template>
  <!--<nav class="navbar navbar-default" role="navigation" aria-label="main navigation">-->
      <!--<div class="container-fluid">-->
              <!--<a class="navbar-left navbar-logo" href="#">-->
                <!--&lt;!&ndash;<img class="navbar-logo" src="../assets/img/logo_delft.svg">&ndash;&gt;-->
              <!--</a>-->
              <!--<a class="navbar-brand" href="#">-->
                   <!--Delft Techniek Tour-->
              <!--</a>-->
          <!--<ul class="nav navbar-nav navbar-right">-->
              <!--<li><div v-on:click="changeLanguage" class="lang-setting">{{ language }}</div></li>-->
          <!--</ul>-->

      <!--</div>-->
  <!--</nav>-->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header delftlogo">
                <a class="navbar-brand" href="#"></a>
            </div>

            <div class="navbar-header tulogo">
                <a class="navbar-brand" href="#"></a>
            </div>

            <div class="navbar-header">
                <a class="navbar-brand" href="#">Techniek Tour</a>
            </div>

            <ul class="nav navbar-nav navbar-right">
                <li><div v-on:click="changeLanguage" class="lang-setting">{{ language }}</div></li>
            </ul>
        </div>
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

.navbar
  background-color: $nav-background
  border-bottom: solid 1px #dbdbdb
  height: 100px

.navbar-header
    height: 100%

.page-title
  font-weight: normal
  position: relative
  top: 50%
  transform: translateY(-50%)

.navbar-brand
    height: 100%
    width: 200px
    padding-top: 0
    padding-bottom: 0

.delftlogo
    background: url(../assets/img/logo_delft.svg) center / contain no-repeat

.tulogo
    background: url(../assets/img/logo-tudelft.svg) center / contain no-repeat

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
