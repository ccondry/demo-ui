<template>
  <div
  id="navbar"
  :fixed-top="false"
  :shadow="true"
  :centered="true"
  >
    <template slot="start">
      <NavbarItem style="margin-left: 10rem;"> 
        <strong>dCloud Toolbox - Demo Session Configuration</strong>
      </NavbarItem>
    </template>
  </div>
</template>

<script>
import NavbarItem from './NavbarItem.vue'

export default {
  name: 'Navbar',
  
  components: {
    NavbarItem
  } 
}
</script>

<style>
#navbar {
  position: sticky;
  top: 0;
}
</style>
