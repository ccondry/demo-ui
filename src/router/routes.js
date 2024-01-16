import Configure from '../views/Configure.vue'
import Upstream from '../views/Upstream.vue'

const routes = [{
  // catch-all to redirect to home view if no route matched
  path: '*',
  redirect: '/configure'
}, {
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
}]

export default routes