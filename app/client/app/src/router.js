import Vue from 'vue'
import Router from 'vue-router'

import Navbar from './components/Navbar'
import MenuComponent from './components/MenuComponent'
import BottomBar from './components/BottomBar'

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
        bottombar: BottomBar,
          menu: MenuComponent
      }
    },
    {
      path: '/map',
      components: {
        navbar: Navbar,
        main: PageOne,
          menu: MenuComponent
      }
    },
    {
      path: '/video',
      components: {
        navbar: Navbar,
        main: PageTwo,
          menu: MenuComponent
      }
    }
  ]
})
