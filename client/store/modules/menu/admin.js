import lazyLoading from './lazyLoading'

export default {
  name: 'Admin',
  // path: '/admin',
  meta: {
    icon: 'folder',
    iconExpanded: 'folder-open',
    expanded: false
  },
  children: [
    // {
    //   name: 'Admin Links',
    //   path: '/admin/links',
    //   component: lazyLoading('admin/Links'),
    //   meta: {
    //     icon: 'link'
    //   }
    // },
    // {
    //   name: 'Users',
    //   path: '/admin/users',
    //   component: lazyLoading('admin/Users'),
    //   meta: {
    //     icon: 'account-multiple'
    //   }
    // }
    {
      name: 'Usage',
      path: '/verticals/admin/usage',
      component: lazyLoading('admin/usage'),
      meta: {
        icon: 'finance'
      }
    }
  ]
}
