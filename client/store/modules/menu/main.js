import lazyLoading from './lazyLoading'

export default {
  name: 'Main',
  // path: '/demos',
  meta: {
    icon: 'folder',
    iconExpanded: 'folder-open',
    created: '2018-10-29',
    modified: '2018-10-29',
    expanded: true
  },
  children: [
    {
      name: 'Configure',
      path: '/configure',
      meta: {
        icon: 'tune',
        description: 'dCloud demo configuration',
        created: '2018-11-19',
        modified: '2018-11-19'
      },
      component: lazyLoading('main/configure')
    },
    {
      name: 'Upstream',
      path: '/upstream',
      meta: {
        icon: 'cloud',
        label: 'Upstream Works',
        description: 'Upstream Works demo configuration',
        created: '2018-11-20',
        modified: '2018-11-20',
        filter: ['pcce']
      },
      component: lazyLoading('main/upstream')
    }
  ]
}
