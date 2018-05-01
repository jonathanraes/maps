<template>
    <div class="modal">
        <div v-on:click="skipVideo()" class="skip-video"><p>{{ $t("message.skip") }}</p></div>
        <div class="middle">
            <div class="video">
                <div id="ytplayer"></div>
            </div>
        </div>
    </div>
</template>

<script>
    var YouTubeIframeLoader = require('youtube-iframe')
    import MapsComponent from "../components/MapsComponent"
    var player; //Youtube player

    export default {
        name: "youtube-modal",
        methods: {
            skipVideo: function () {
                MapsComponent.methods.skipVideo();
            }
        },
        mounted () {
            YouTubeIframeLoader.load(function(YT) {
                player = new YT.Player('ytplayer', {
                    height: '100%',
                    width: '100%',
                    videoId: 'LIfkOvApku0'
                })
                player.addEventListener("onStateChange", function(state){
                    if(state.data === 0){
                        MapsComponent.methods.skipVideo()
                    }
                });
                hideOnClickOutside(document.getElementById("ytplayer"))
            })
        }
    }

    function hideOnClickOutside(element) {
        const outsideClickListener = event => {
            if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
                if (isVisible(element)) {
                    MapsComponent.methods.skipVideo()
                    removeClickListener()
                }
            }
        }

        const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener)
        }

        document.addEventListener('click', outsideClickListener)
    }

    const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

</script>

<style lang="sass" scoped>

    .skip-video
        width: 10%
        height: 5%
        padding: 5px
        background-color: red
        position: absolute
        top: 30%
        left: 90%
        align-self: end
        z-index: 9
        text-align: center
        font-size: 16px
        color: white
        border-bottom-left-radius: 5px
        border-top-left-radius: 5px
        min-height: 10vh

        p
            position: relative
            top: 50%
            transform: translateY(-50%)

    .modal
        display: table /* Hidden by default */
        position: fixed /* Stay in place */
        z-index: 1 /* Sit on top */
        left: 0
        top: 0
        width: 100% /* Full width */
        height: 100% /* Full height */
        overflow: auto /* Enable scroll if needed */
        background-color: rgb(0,0,0) /* Fallback color */
        background-color: rgba(0,0,0,0.4) /* Black w/ opacity */

        .middle
            display: table-cell
            vertical-align: middle

            .video
                margin-left: auto
                margin-right: auto
                width: 90vw
                height: 50.625vw
                max-height: 90vh
                max-width: 160vh

                /*top: 5vh*/
                /*left: 5vw*/

                #ytplayer
                    width: 100%
                    height: 100%
</style>