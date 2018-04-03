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
    <nav class="navbar navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="https://delft.com"><img src="../assets/img/logo_delft.svg" /></a>

                <!--<a class="navbar-brand" href="#"></a>-->
            </div>

            <div class="navbar-header">
                <a href="https://tudelft.nl"><img src="../assets/img/logo-tudelft.svg" /></a>
                <!--<a class="navbar-brand" href="#"></a>-->
            </div>

            <div class="navbar-header page-title">
                <a href="/">Techniek Tours</a>
            </div>

            <div class="lang-setting">
                <div v-on:click="changeLanguage">{{ language }}</div>
            </div>
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
  height: 80px
  display: flex
  justify-content: space-evenly

  @media only screen and (max-width: 1024px) and (orientation: portrait)
      height: 140px

  .container-fluid
      height: 100%

.navbar-header
    height: 100%
    width: auto
    max-width: 25vw
    cursor: pointer

    img
        height: 100%

.page-title
  font-weight: normal
  position: relative
  display: flex
  align-items: center
  font-size: 2rem

  @media only screen and (max-width: 1024px) and (orientation: portrait)
      font-size: 3rem

.navbar-brand
    height: 100%
    width: 300px
    padding-top: 0
    padding-bottom: 0
    max-height: 100%

.lang-setting
    position: relative
    font-size: 2rem
    width: 50px
    display: flex
    align-items: center
    margin-right: 10px
    cursor: pointer

    @media only screen and (max-width: 1024px) and (orientation: portrait)
        font-size: 3rem

.nav-item img
  max-height: 80px
  padding:

  @media only screen and (max-width: 1024px) and (orientation: portrait)
    max-height: 161px

.navbar
  padding: 0

</style>
