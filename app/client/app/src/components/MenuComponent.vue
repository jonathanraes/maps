<template>
    <section>
        <div class="menu-wrapper">
            <transition name="slide" >
            <div id="menu" class="wrapper" v-if="showmenu">

                <template v-if="selectedExhibit">
                    <transition name="expand" >
                        <div v-if="showDestinationImage">
                            <div class="destination-image-wrapper">
                                <div class="destination-reached-text">{{ $t("message.destination_looks_like") }}</div>
                                <div class="destination-image">
                                    <img src="../assets/img/destination.jpg" >
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="expand-button" v-on:click="toggleDestinationImage"></div>
                    <div class="text-wrapper">
                        <div class="exhibit-info">
                        <div>
                            <div class="exhibit-info-top">
                                <div class="selected-location-title">
                                    <div class="exhibit-title">Naam object</div>
                                    <div class="selected-location-title">{{ selectedExhibit.formatted_address }} <em>  {{ selectedExhibit.storeName }}</em></div>
                                </div>
                                <div class="routebutton">
                                    <button class="btn btn-primary" v-on:click="routeTo(selectedExhibit)" v-if="selectedExhibit != destinationExhibit">{{ $t("message.route") }}</button>
                                </div>
                            </div>
                            <br>
                            <div class="selected-location-body">
                                <!--<details>-->
                                <div v-if='language == "en"'>
                                    EN Lorem ipsum hac malesuada facilisis volutpat posuere, felis erat inceptos fermentum morbi pellentesque, vehicula proin sodales sociosqu aptent nibh ac ornare nunc dapibus hendrerit congue dolor curabitur quisque, cras ultrices conubia massa ipsum varius nam commodo duis, donec varius primis imperdiet nisi lacus imperdiet nostra mi interdum dictumst fusce curabitur id habitasse id mi lacinia non netus dolor velit mattis, ad duis mattis posuere mi vehicula mattis justo tristique taciti eros sem urna cubilia pellentesque semper justo vehicula feugiat malesuada suscipit vel, mauris luctus pretium eleifend tempus velit pretium cras quisque accumsan, convallis fames nisi lacus nisl per velit blandit.
                                <!--</details>-->
                                </div>
                                <div v-else-if='language == "nl"'>
                                    NL Lorem ipsum hac malesuada facilisis volutpat posuere, felis erat inceptos fermentum morbi pellentesque, vehicula proin sodales sociosqu aptent nibh ac ornare nunc dapibus hendrerit congue dolor curabitur quisque, cras ultrices conubia massa ipsum varius nam commodo duis, donec varius primis imperdiet nisi lacus imperdiet nostra mi interdum dictumst fusce curabitur id habitasse id mi lacinia non netus dolor velit mattis, ad duis mattis posuere mi vehicula mattis justo tristique taciti eros sem urna cubilia pellentesque semper justo vehicula feugiat malesuada suscipit vel, mauris luctus pretium eleifend tempus velit pretium cras quisque accumsan, convallis fames nisi lacus nisl per velit blandit.
                                    <!--</details>-->
                                </div>
                            </div>
                        </div>
                    </div>
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
    import MapsComponent from "../components/MapsComponent"

    export default {
        components: {},
        name: "MenuComponent",
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
                MapsComponent.methods.routeTo(exhibit);
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
    $destinationreachedimageheight: 25vh

    .destination-image-wrapper
        text-align: center
        align-content: center
        padding: 10px 10px 20px 10px
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

    .exhibit-info-top
        display: flex

        .routebutton
            display: flex
            margin-left: 10px

    .text-wrapper
        padding: 10px 50px 20px 50px

    .menu-wrapper
        display: flex
        justify-content: center

    .wrapper
        width: 80%
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
        /*font-size: 1.2vmax*/
        font-size: 1rem

        .exhibit-title
            font-size: 2rem
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
        width: 18vmin
        height: 9vmin
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
