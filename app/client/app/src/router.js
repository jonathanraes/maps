import Vue from 'vue'
import Router from 'vue-router'

import Navbar from './components/Navbar'
import MenuComponent from './components/MenuComponent'
import MainMenu from './components/MainMenu'

import PageOne from './views/PageOne'
import PageTwo from './views/PageTwo'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        navbar: Navbar,
        main: Login,
        mainmenu: MainMenu,
        menu: MenuComponent
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
