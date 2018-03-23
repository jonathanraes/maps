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
            selectedExhibit() {
                return this.$store.state.selectedExhibit
            },
            destinationExhibit() {
                return this.$store.state.destinationExhibit
            },
            atDestination() {
                return this.$store.state.atDestination
            },
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
    $destinationreachedimageheight: 20vh

    .destination-image-wrapper
        text-align: center
        align-content: center
        padding: 10px
        height: $destinationreachedimageheight

        .destination-image
            height: 100%

            img
                height: 100%

    .main-menu
        display: flex
        flex-direction: row

        img
            max-height: $menuheight
            padding-left: 1rem
            padding-right: 1rem

    .text-wrapper
        padding: 10px 50px 20px 50px

    .menu-wrapper
        display: flex
        justify-content: center

    .wrapper
        width: 40%
        //left: 10%
        bottom: -10px
        //bottom: -$menuheight
        background-color: #E6E6E6
        /*background-color: #0d54ca*/
        color: black
        //height: $menuheight
        display: flex
        text-align: justify
        flex-flow: column
        border-radius: 40px 40px 0px 0px
        border-style: solid
        position: fixed
        font-size: 1.2vmax

        .exhibit-title
            font-size: 2vmax
            font-weight: bold

    .animation-enter
        /*animation-fill-mode: forwards*/
        /*animation-name: slidein*/
        /*animation-duration: 4s*/

        .selected-location-body
            font-size: 2vh
            font-family: $family-primary

    .expand-button
        bottom: 100%
        position: absolute
        background-color: green
        width: 8em
        height: 4em
        align-self: center
        border-top-left-radius: 110px /* 100px of height + 10px of border */
        border-top-right-radius: 110px /* 100px of height + 10px of border */
        border-bottom: 0

    .slide-enter-active,
    .slide-leave-active
        transition: all 2s
        transform: translateY(0%)

    .slide-enter,
    .slide-leave-to
        transform: translateY(100%)


    .expand-enter-active
        transition: height 1s ease-in-out, opacity 1s cubic-bezier(.99, .01, .99, .01)
        height: $destinationreachedimageheight
        opacity: 1

    .expand-leave-active
        transition: height 1s ease-in-out, opacity 1s cubic-bezier(.01, 1, .01, 1)
        height: $destinationreachedimageheight
        opacity: 1

    .expand-enter,
    .expand-leave-to
        height: 0px
        opacity: 0

</style>
