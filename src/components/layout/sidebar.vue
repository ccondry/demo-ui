<template>
  <aside class="menu app-sidebar">
    <ul class="menu-list">
      <!-- for each menu item - but only show admins the Admin menu -->
      <li v-for="(item, index) in filteredMenu" :key="index">
        <router-link :to="item.path" :exact="true" :aria-expanded="isExpanded(item) ? 'true' : 'false'" v-if="item.path">
          <!-- icon -->
          <b-icon :icon="item.meta.icon"></b-icon>
          <!-- label -->
          {{ item.meta.label || item.name }}
          <!-- down arrow -->
          <b-icon v-if="item.children && item.children.length" :icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'" ></b-icon>
        </router-link>
        <a :aria-expanded="isExpanded(item)" v-else>
          <!-- expanded folder icon, or else the defined icon -->
          <b-icon :icon="isExpanded(item) && item.meta.iconExpanded ? item.meta.iconExpanded : item.meta.icon" ></b-icon>
          <!-- label -->
          {{ item.meta.label || item.name }}
          <!-- down arrow -->
          <b-icon v-if="item.children && item.children.length" :icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'" ></b-icon>
        </a>

        <span v-if="item.children && item.children.length">
          <ul v-show="isExpanded(item)">
            <li v-for="subItem in item.children" v-if="subItem.path && (subItem.meta.filter ? subItem.meta.filter.includes(sessionConfig.demo) : true)" :key="subItem.name">
              <router-link :to="generatePath(item, subItem)">
                <b-icon v-if="subItem.meta && subItem.meta.icon" :icon="subItem.meta.icon" ></b-icon>
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
import moment from 'moment'

export default {
  components: {
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
        },
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
      // return filtered menu
      // return this.menu
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
      // menu items are new if less than 14 days old
      try {
        if (item.meta.created) {
          let diff = moment().diff(moment(item.meta.created), 'days')
          return diff < 14
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    },

    isUpdated (item) {
      try {
        // menu items are updated if updated property less than 14 days old
        // also prefer 'new' tag over 'updated' tag
        if (!this.isNew(item) && item.meta.modified) {
          let diff = moment().diff(moment(item.meta.modified), 'days')
          return diff < 14
        } else {
          return false
        }
      } catch (e) {
        return false
      }
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

<style lang="scss">
.app-sidebar {
  position: fixed;
  // top: 50px;
  // position: -webkit-sticky;
  // position: sticky;
  // top: 0;
  // top: 0;
  left: 0;
  // bottom: 0;
  width: 220px;
  // min-width: 45px;
  // max-height: 100vh;
  height: 100%;
  // z-index: 3;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  background-color: rgb(245, 245, 245);
  // overflow-y: auto;
  // overflow-x: hidden;
  margin-right: 20px;

  // @include mobile() {
  //   transform: translate3d(-220px, 0, 0);
  // }

  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      // transition: transform .377s ease;
    }
  }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    // li a {
    //   &[aria-expanded="true"] {
    //     .is-angle {
    //       transform: rotate(180deg);
    //     }
    //   }
    // }

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
