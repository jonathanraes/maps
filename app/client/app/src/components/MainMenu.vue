<template>
    <section>
        <div class="menu-wrapper">
            <transition name="slide" >
                <div id="menu" class="wrapper" v-if="showmenu">
                    <template v-if="atMainRoute">
                        <div class="main-menu" style="width: unset">
                            <a class="" href="#">
                                <img src="../assets/img/logo_delft.svg">
                            </a>
                            <a href="#">
                                <img src="../assets/img/logo-tudelft.svg">
                            </a>
                        </div>
                    </template>
                </div>
            </transition>
        </div>
    </section>
</template>

<script>
    import i18n from "../lang/lang.js";
    //import routeTo from "MapsComponent";

    export default {
        components: {},
        name: "MainMenu",
        mounted () {
        },
        created () {

        },
        data () {
            return {
                showDestinationImage: false
            }
        },
        methods: {
            toggleDestinationImage () {
                this.showDestinationImage = !this.showDestinationImage
            },
            routeTo: function (exhibit) {
                console.log("routeto");
                routeTo(exhibit);
            }
        },
        computed: {
            atMainRoute() {
                return this.$route.path.indexOf('map') === -1
            },
            showmenu () {
                return this.$store.state.showMenu
            },
            language() {
                return i18n.locale
            }
        },
        getters: {

        },
        watch: {

        }

    }

</script>

<style lang="sass" scoped>
    $menuheight: 10vh

    .main-menu
        display: flex
        flex-direction: row
        height: $menuheight
        justify-content: space-evenly

        img
            max-height: $menuheight
            height: 100%
            padding-left: 10px
            padding-right: 10px

    .text-wrapper
        padding: 10px 50px 20px 50px

    .menu-wrapper
        display: flex
        justify-content: center

    .wrapper
        min-width: 40%
        bottom: -10px
        background-color: #E6E6E6
        color: black
        display: flex
        text-align: justify
        flex-flow: column
        border-radius: 40px 40px 0px 0px
        border-style: solid
        position: fixed
        font-size: 1.2vmax

    .slide-enter-active,
    .slide-leave-active
        transition: all 2s
        transform: translateY(0%)

    .slide-enter,
    .slide-leave-to
        transform: translateY(100%)

</style>
