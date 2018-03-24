import Vue from 'vue'
import Router from 'vue-router'

import Navbar from './components/Navbar'
import MenuComponent from './components/MenuComponent'
import MainMenu from './components/MainMenu'

import PageOne from './views/PageOne'
import PageTwo from './views/PageTwo'
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
        navbar: Navbar,
        main: PageOne,
        menu: MenuComponent,
        mainmenu: MainMenu
      }
    }

  ]
})
