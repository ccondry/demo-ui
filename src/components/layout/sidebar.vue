<template>
  <aside class="menu app-sidebar">
    <ul class="menu-list">
      <!-- for each menu item - but only show admins the Admin menu -->
      <li v-for="(item, index) in filteredMenu" :key="index">
        <router-link :to="item.path" :exact="true" :aria-expanded="isExpanded(item) ? 'true' : 'false'" v-if="item.path">
          <!-- icon -->
          <Icon :icon="item.meta.icon"></Icon>
          <!-- label -->
          {{ item.meta.label || item.name }}
          <!-- down arrow -->
          <Icon v-if="item.children && item.children.length" :icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'" ></Icon>
        </router-link>
        <a :aria-expanded="isExpanded(item)" v-else>
          <!-- expanded folder icon, or else the defined icon -->
          <Icon :icon="isExpanded(item) && item.meta.iconExpanded ? item.meta.iconExpanded : item.meta.icon" ></Icon>
          <!-- label -->
          {{ item.meta.label || item.name }}
          <!-- down arrow -->
          <Icon v-if="item.children && item.children.length" :icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'" ></Icon>
        </a>

        <span v-if="item.children && item.children.length">
          <ul v-show="isExpanded(item)">
            <li v-for="subItem in item.children" v-if="subItem.path && (subItem.meta.filter ? subItem.meta.filter.includes(sessionConfig.demo) : true)" :key="subItem.name">
              <router-link :to="generatePath(item, subItem)">
                <Icon v-if="subItem.meta && subItem.meta.icon" :icon="subItem.meta.icon" ></Icon>
                {{ subItem.meta && subItem.meta.label || subItem.name }}
              </router-link>
            </li>
          </ul>
        </span>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '../Icon.vue'

export default {
  components: {
    Icon,
  },
  
  props: {
    show: Boolean,
    menuFilter: String
  },

  data () {
    return {
      isReady: false,
      menu: [{
        name: 'Configure',
        path: '/configure',
        meta: {
          icon: 'tune',
          description: 'dCloud demo configuration',
          created: '2018-11-19',
          modified: '2018-11-19'
        }
      }, {
        name: 'Upstream',
        path: '/upstream',
        meta: {
          icon: 'cloud',
          label: 'Upstream Works',
          description: 'Upstream Works demo configuration',
          created: '2018-11-20',
          modified: '2018-11-20',
          filter: ['pcce']
        }
      }]
    }
  },

  mounted () {
    let route = this.$route
    if (route.name) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
    // console.log('menu', this.menu)
  },

  computed: {
    ...mapGetters({
      user: 'user',
      sessionConfig: 'sessionConfig',
      hasUpstream: 'hasUpstream'
    }),
    filteredMenu () {
      // console.log('sidebar.vue menu filter - hasUpstream = ', this.hasUpstream)
      // copy menu so we can filter it with fuzzy
      // const m = this.menu.slice()
      // remove Upstream menu item if this demo does not feature Upstream
      // if (!this.hasUpstream) {
      //   for (const item of m) {
      //     item.children = item.children.filter(v => v.name !== 'Upstream')
      //   }
      // }
      // remove Upstream from menu if this demo does not have Upstream feature
      return this.menu.filter(v => {
        if (v.name === 'Upstream' && !this.hasUpstream) {
          return false
        }
        return true
      })
    }
  },

  methods: {
    ...mapActions([
      'expandMenu'
    ]),

    isNew (item) {
      return false
    },

    isUpdated (item) {
      return false
    },

    isExpanded (item) {
      return item.meta.expanded
    },

    shouldExpandMatchItem (route) {
      let matched = route.matched
      let lastMatched = matched[matched.length - 1]
      let parent = lastMatched.parent || lastMatched
      const isParent = parent === lastMatched
      if (isParent) {
        const p = this.findParentFromMenu(route)
        if (p) {
          parent = p
        }
      }
    },

    generatePath (item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`
    },

    findParentFromMenu (route) {
      const menu = this.menu
      for (let i = 0, l = menu.length; i < l; i++) {
        const item = menu[i]
        const k = item.children && item.children.length
        if (k) {
          for (let j = 0; j < k; j++) {
            if (item.children[j].name === route.name) {
              return item
            }
          }
        }
      }
    }
  },

  watch: {
    $route (route) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
  }

}
</script>

<style>
.app-sidebar {
  position: fixed;
  left: 0;
  width: 220px;
  height: 100%;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  background-color: rgb(245, 245, 245);
  margin-right: 20px;

  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
    }
  }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    li a + ul {
      margin: 0 10px 0 15px;
    }

    a {
      padding-right: 0;
    }
  }

  .menu-list li ul {
    padding-left: 0em !important;
    margin-right: 0em !important;
  }
}
</style>
