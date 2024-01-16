<template>
  <div id="main">
    <transition
    mode="out-in"
    enter-active-class="fadeIn"
    leave-active-class="fadeOut"
    appear
    >
      <keep-alive>
        <router-view style="width: 100%; min-height: 100vh; padding: 1rem;" />
      </keep-alive>
    </transition>
  </div>
</template>

<style>
#main {
  padding-left: 220px;
  width: 100%;
  height: 100%;
}
</style>