<template>
  <b-navbar
  id="navbar"
  :fixed-top="false"
  :shadow="true"
  :centered="true"
  >
    <template slot="start">
      <b-navbar-item style="margin-left: 10rem;"> 
        <strong>dCloud Toolbox - Demo Session Configuration</strong>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
#navbar {
  position: sticky;
  top: 0;
}
</style>
