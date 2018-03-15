<template>
    <section>
    <transition name="slide" >
        <div id="menu" class="wrapper" v-if="getMenu">
            <template v-if="selectedExhibit && !atMainRoute">
                <div class="text-wrapper">
                    <template v-if="atDestination">
                        <div class="destination-reached-text">Bestemming bereikt!</div>
                        <div class="row h-100 destination-reached">
                            <div class="col-4">
                            </div>
                            <div class="streetview-image col-3">
                                <!--<img v-bind:src="imageURL" >-->
                            </div>
                            <div class="col-3">
                                <button class="btn btn-primary" v-on:click="nextDestination()">Volgende bestemming</button>
                            </div>
                        </div>
                    </template>
                    <div class="exhibit-info">
                    <div>
                        <div class="exhibit-title">Naam object</div>
                        <div class="selected-location-title">{{ selectedExhibit.formatted_address }} <em>  {{ selectedExhibit.storeName }}</em></div>
                        <br>
                        <div class="selected-location-body">
                            <!--<details>-->
                            Lorem ipsum hac malesuada facilisis volutpat posuere, felis erat inceptos fermentum morbi pellentesque, vehicula proin sodales sociosqu aptent nibh ac ornare nunc dapibus hendrerit congue dolor curabitur quisque, cras ultrices conubia massa ipsum varius nam commodo duis, donec varius primis imperdiet nisi lacus imperdiet nostra mi interdum dictumst fusce curabitur id habitasse id mi lacinia non netus dolor velit mattis, ad duis mattis posuere mi vehicula mattis justo tristique taciti eros sem urna cubilia pellentesque semper justo vehicula feugiat malesuada suscipit vel, mauris luctus pretium eleifend tempus velit pretium cras quisque accumsan, convallis fames nisi lacus nisl per velit blandit.
                            <!--</details>-->
                        </div>
                    </div>

                    <div>
                        <button class="btn btn-primary" v-on:click="routeTo(selectedExhibit)" v-if="selectedExhibit != destinationExhibit">Routebeschrijving</button>
                    </div>
                </div>
                </div>
            <div class="expand-button"></div>
            </template>
            <template v-else>
                <div class="main-menu">
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
    </section>
</template>

<script>
    import store from '../store/index'

    export default {
        components: {},
        name: "MenuComponent",
        mounted () {
        },
        created () {

        },
        data () {
            return {
            }
        },
        methods: {
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
            getMenu () {
                return this.$store.state.showMenu
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

        img
            max-height: $menuheight
            padding-left: 1rem
            padding-right: 1rem

    .text-wrapper
        padding: 10px 50px 20px 50px


    .wrapper
        width: 80%
        left: 10%
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
        position: absolute
        top: -25px
        background-color: green
        width: 50px
        height: 50px
        align-self: center
        border-radius: 50%

    .slide-enter-active,
    .slide-leave-active
        transition: all 2s
        transform: translateY(0%)

    .slide-enter,
    .slide-leave-to
        transform: translateY(100%)

</style>
