<template>
  <section>
    <div class="wrapper">
      <router-link tag="a" :to="{ path: 'map'}" class="skip-video">Skip video</router-link>
      <div class="video-container">
        <div class="video">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/g6iDZspbRMg"
                  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Page2',
  data () {
    return {
      title: 'new user form'
    }
  },
  computed: {

  },
  methods: {
    skipvideo () {

    }
  },
  mounted () {
    // Do something
  }
}
</script>

<style lang="sass" scoped>

.wrapper
  display: flex
  flex-direction: column
  justify-content: center
  width: 100vw
  height: 90vh

  .skip-video
    width: 10vw
    height: 10vh
    background-color: red
    position: absolute
    align-self: end

  .video-container
    height: 100vh
    display: flex
    flex-direction: row
    justify-content: center

    .video
      align-self: center

</style>
