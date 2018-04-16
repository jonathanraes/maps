<template>
    <section>
        <div class="outside-menu-wrapper">

            <transition name="slide" >

                <div id="menu" class="wrapper" v-show="showmenu">

                <div class="location-error" v-show="locationError">
                    {{ $t("message.locationError") }}
                </div>
                <div class="inner-menu-wrapper" v-show="selectedExhibit">
                    <transition name="expand" >
                            <div v-if="showDestinationImage">
                                <div class="destination-image-wrapper">
                                    <div class="destination-reached-text">{{ $t("message.destination_looks_like") }}</div>
                                    <div class="destination-image">
                                        <img src="../assets/img/storefront.png" >
                                    </div>
                                </div>
                            </div>
                        </transition>
                    <div class="expand-button" id="expand-drag" v-on:click="toggleDestinationImage" draggable="true">
                    </div>

                    <div class="text-wrapper"  v-on:click="toggleTextExpand">

                        <div class="exhibit-info" v-if="selectedExhibit">
                        <div>
                            <div class="exhibit-info-top" v-if="selectedExhibit">
                                <div class="selected-location-title">
                                    <div class="exhibit-title">{{ selectedExhibit.objectName }}</div>
                                    <div class="selected-location-title">{{ selectedExhibit.formatted_address }} <br><em>{{ selectedExhibit.storeName }}</em></div>
                                </div>
                                <!--<div class="routebutton-wrapper" v-if="!locationError">-->
                                    <!--<button class="routebutton" v-on:click="routeTo(selectedExhibit)" v-if="selectedExhibit != destinationExhibit">{{ $t("message.route") }}</button>-->
                                <!--</div>-->
                            </div>
                            <br>
                            <div class="selected-location-body">
                                <div v-if='language == "en"'>
                                    <pre>{{ selectedExhibit.infoText }}</pre>
                                </div>
                                <div v-else-if='language == "nl"'>
                                    <pre>{{ selectedExhibit.infoText }}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>
    </section>
</template>

<script>
    import i18n from "../lang/lang.js";
    import MapsComponent from "../components/MapsComponent"
    require('jquery-ui-dist/jquery-ui');
    // var tp = require('jquery-ui-touch-punch');


    export default {
        components: {},
        name: "MenuComponent",
        created() {
            !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
        },
        mounted () {
            const wrapper = document.getElementsByClassName("wrapper")[0];

            var prevPosition = 0;
            $('.wrapper').draggable({
                cancel : '.expand-button',
                start: function (event, ui) {
                    prevPosition = window.innerHeight - ui.offset.top;
                    wrapper.style.maxHeight = wrapper.offsetHeight + 'px';
                },
                drag: function (event, ui) {
                    wrapper.style.removeProperty('top');
                    wrapper.style.removeProperty('left');

                    ui.position.top = "unset";
                    ui.position.left = "unset";

                    var change = -(prevPosition - (window.innerHeight - ui.offset.top));
                    wrapper.style.maxHeight = (wrapper.offsetHeight + change) + "px";
                    prevPosition = window.innerHeight - ui.offset.top;
                },
                stop: function (event, ui) {
                },
            });
            // let element = document.getElementsByClassName("selected-location-body")[0];
            // function setMaxSize() {
            //     // if (document.getElementsByClassName("selected-location-body-expanded").length > 0)
            //     document.getElementsByClassName("selected-location-body")[0].style.maxHeight = document.getElementsByClassName("selected-location-body")[0].clientHeight + "px";
            //     console.log("anim done set to " + document.getElementsByClassName("selected-location-body")[0].clientHeight + "px");
            // }
            //
            // element.addEventListener("webkitTransitionEnd", setMaxSize, false);
            // element.addEventListener("transitionend", setMaxSize, false);
            // element.addEventListener("otransotionend", setMaxSize, false);
        },
        data () {
            return {
                showDestinationImage: false,
                textExpanded: false,
            }
        },
        methods: {
            toggleDestinationImage () {
                this.showDestinationImage = !this.showDestinationImage
                // if (this.showDestinationImage) {
                //     document.getElementsByClassName("wrapper")[0].style.maxHeight = (document.getElementsByClassName("wrapper")[0].offsetHeight + 0.25 * window.innerHeight) + 'px';
                // }
            },
            toggleTextExpand () {
                // this.textExpanded = !this.textExpanded;
                // if (this.textExpanded) {
                //     document.getElementsByClassName("selected-location-body")[0].style.removeProperty("max-height");
                //     document.getElementsByClassName("selected-location-body")[0].classList.add("selected-location-body-expanded");
                // } else {
                //     document.getElementsByClassName("selected-location-body")[0].style.removeProperty("max-height");
                //     document.getElementsByClassName("selected-location-body")[0].classList.remove("selected-location-body-expanded");
                // }
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
            locationError() {
                return this.$store.state.locationError;
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

    /*.selected-location-body div pre*/


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
        justify-content: space-between

        .routebutton-wrapper
            display: flex
            margin: 10px

            .routebutton
                -moz-box-shadow: inset 0px 1px 0px 0px #54a3f7
                -webkit-box-shadow: inset 0px 1px 0px 0px #54a3f7
                box-shadow: inset 0px 1px 0px 0px #54a3f7
                background-color: #007dc1
                -moz-border-radius: 3px
                -webkit-border-radius: 3px
                border-radius: 3px
                border: 1px solid #124d77
                display: inline-block
                cursor: pointer
                color: #ffffff
                padding: 6px 24px
                text-decoration: none
                text-shadow: 0px 1px 0px #154682

                @media only screen and (max-width: 1024px)
                    font-size: 2rem

            .routebutton:hover
                background-color: #0061a7

            .routebutton:active
                position: relative
                top: 1px

    .text-wrapper
        padding: 20px 30px 20px 30px

    .outside-menu-wrapper
        display: flex
        justify-content: center

    .location-error
        text-align: center
        align-self: center
        font-size: 2rem

        @media only screen and (max-width: 1024px)
            font-size: 3rem

        @media only screen and (max-height: 1024px) and (orientation: landscape)
            font-size: 2rem

    .inner-menu-wrapper
        display: flex
        flex-direction: column

    .wrapper
        max-height: 10vh
        width: 80%
        bottom: -10px
        background-color: #E6E6E6
        color: black
        display: flex
        text-align: justify
        flex-flow: column
        border-radius: 40px 40px 0px 0px
        border-style: solid
        position: fixed
        font-size: 1rem
        align-self: center

        @media only screen and (max-width: 1024px)
            font-size: 2rem

        @media only screen and (max-height: 1024px) and (orientation: landscape)
            font-size: 1rem

        .selected-location-body
            font-size: 1rem
            -webkit-transition: all 1.5s
            -moz-transition: all 1.5s
            -ms-transition: all 1.5s
            -o-transition: all 1.5s
            transition: all 1.5s

            pre
                color: black
                background: transparent
                padding: 0
                white-space: pre-wrap
                word-wrap: break-word
                font-family: inherit

            @media only screen and (max-width: 1024px) and (orientation: portrait)
                font-size: 2rem

        .exhibit-title
            font-size: 2rem
            font-weight: bold
            text-align: left

            @media only screen and (max-width: 1024px) and (orientation: portrait)
                font-size: 3rem

        .expand-button
            bottom: 100%
            position: absolute
            background-color: #CDEFF7
            width: 15vmin
            height: 13vmin
            align-self: center
            border-top-left-radius: 9vmin
            border-top-right-radius: 9vmin
            border-bottom: 0
            background-image: url("../assets/img/dragbutton.png")
            background-repeat: no-repeat
            background-size: 100%

            @media only screen and (max-width: 1024px)
                width: 22vmin
                height: 20vmin

    .slide-enter-active,
    .slide-leave-active
        transition: all 1.5s
        transform: translateY(0%)

    .slide-enter,
    .slide-leave-to
        transform: translateY(100%)


    .expand-enter-active
        transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.99, .01, .99, .01)
        -webkit-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.99, .01, .99, .01)
        -moz-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.99, .01, .99, .01)
        -ms-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.99, .01, .99, .01)
        -o-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.99, .01, .99, .01)
        height: $destinationreachedimageheight
        opacity: 1

    .expand-leave-active
        transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.01, .99, .01, .99)
        -webkit-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.01, .99, .01, .99)
        -moz-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.01, .99, .01, .99)
        -ms-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.01, .99, .01, .99)
        -o-transition: height 1.5s ease-in-out, opacity 1.5s cubic-bezier(.01, .99, .01, .99)
        height: $destinationreachedimageheight
        opacity: 1

    .expand-enter,
    .expand-leave-to
        height: 0px
        opacity: 0

    [draggable=true]
        -khtml-user-drag: element

</style>
