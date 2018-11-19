import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

/***
Items in the menu module will be added using generateRoutesFromMenu
Make sure you load all components here that are not listed in the menu module
***/
export default new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // {
    //   name: 'Login',
    //   path: '/login',
    //   component: require('../views/auth/Login')
    // },
    // {
    //   name: 'Password Reset',
    //   path: '/password-reset',
    //   component: require('../views/auth/password-reset')
    // },
    // {
    //   name: 'CVP VXML App',
    //   path: '/cce/cvp/vxml-app/:appName',
    //   component: require('../views/CCE/cvp-vxml-app')
    // },
    // {
    //   name: 'CVP App Logs',
    //   path: '/cce/cvp/vxml-app/:appName/logs',
    //   component: require('../views/CCE/cvp-vxml-app-logs')
    // },
    // {
    //   name: 'CVP App Media',
    //   path: '/cce/cvp/vxml-app/:appName/media',
    //   component: require('../views/CCE/cvp-vxml-app-media')
    // },
    // {
    //   name: 'CVP App Log Contents',
    //   path: '/cce/cvp/vxml-app/:appName/logs/:host/:folder/:filename',
    //   component: require('../views/CCE/cvp-vxml-app-log-contents')
    // },
    // {
    //   name: 'CCE Campaign',
    //   path: '/cce/campaign/:name',
    //   component: require('../views/CCE/cce-campaign')
    // },
    // {
    //   name: 'REM URLs',
    //   path: '/cce/rem/urls/:guid',
    //   component: require('../views/CCE/rem-url')
    // },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/verticals'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
