import Vue from 'vue'
import Router from 'vue-router'

import Navbar from './components/Navbar'
import MenuComponent from './components/MenuComponent'
import MainMenu from './components/MainMenu'
import YoutubeModal from './components/YoutubeModal'

import TechniekTour from './views/TechniekTour'
import TourSelect from './views/TourSelect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        navbar: Navbar,
        main: TourSelect,
        mainmenu: MainMenu
      }
    },
    {
      path: '/map',
      components: {
        main: TechniekTour,
        navbar: Navbar,
        youtubevid: YoutubeModal,
        menu: MenuComponent,
        mainmenu: MainMenu
      }
    }

  ]
})
