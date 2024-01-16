import Configure from '../views/Configure.vue'
import Upstream from '../views/Upstream.vue'

const routes = [{
  // the home page
  name: 'Configure',
  path: '/configure',
  component: Configure
}, {
  name: 'Upstream',
  path: '/upstream',
  component: Upstream,
  meta: {
    filter: ['pcce']
  }
}, {
  // default redirect to home page
  path: '/:pathMatch(.*)*',
  redirect: '/configure'
}]

export default routes