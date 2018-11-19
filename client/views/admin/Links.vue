<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Links</h1>
          <div class="wysiwyg">
            <ul>
              <li v-for="link in links">{{ link.name }}: <a :href="link.url" target="_blank">{{ link.url }}</a></li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
const links = [{
  // name: 'Compete Lab Account Requests',
  // url: 'https://docs.google.com/spreadsheets/d/1cxQXPjR8a7qqXLe4QFlWoJUnPCUOsL-7gf3Mpy8ywa4/edit#gid=2025411235'
// }, {
//   name: 'CXDemo Project Schedule',
//   url: 'https://app.smartsheet.com/b/publish?EQBCT=6a5ed17758264f2ab97cf91c8fe638fd'
// }, {
//   name: 'CXDemo Bug Tracker',
//   url: 'https://app.smartsheet.com/b/publish?EQBCT=18b9dae85a9c479aa8939aa5ef49b345'
}, {
  name: 'Cisco TAC Cases',
  url: 'https://mycase.cloudapps.cisco.com/case'
}, {
  name: 'eGain Support',
  url: 'https://support.egain.com/'
// }, {
//   name: 'Exchange ECP',
//   url: 'https://ad1.cdxdemo.net/ecp'
}, {
  name: 'Exchange OWA',
  url: 'https://cdxdemodc1.cdxdemo.net/owa'
}, {
  name: 'Finesse Admin',
  url: 'https://finesse1.cdxdemo.net/cfadmin'
}, {
  name: 'CUIC OAMP',
  url: 'https://cuicpub.cdxdemo.net/oamp'
}, {
  name: 'CCE Web Admin',
  url: 'https://awhdsdds1.cdxdemo.net/cceadmin'
// }, {
//   name: 'eGain 17 System Admin',
//   url: 'https://cceeimwim.cdxdemo.net/system/web/view/platform/common/login/root.jsp?partitionId=0&localLogin=true'
// }, {
//   name: 'eGain 17 Partition Admin',
//   url: 'https://cceeimwim.cdxdemo.net/system/web/view/platform/common/login/root.jsp?partitionId=1&localLogin=true'
// }, {
//   name: 'Context Service Manager',
//   url: 'http://198.19.253.32'
}, {
  name: 'ECE Partition Admin',
  url: 'https://eceweb.cdxdemo.net/default'
}, {
  name: 'ECE System Admin',
  url: 'https://eceweb.cdxdemo.net/system'
}, {
  name: 'SocialMiner',
  url: 'https://sm1.cdxdemo.net/'
}, {
  name: 'CUCM',
  url: 'https://cucmpub.cdxdemo.net/'
}, {
  name: 'REM Admin',
  url: 'https://rem1.cdxdemo.net:8443/web_plugin_framework/webcontroller'
}, {
  name: 'REM JBOSS Console',
  url: 'https://rem1.cdxdemo.net:9990/console'
}, {
  name: 'CVP OAMP',
  url: 'https://cvpoamp.cdxdemo.net:9443/oamp'
}, {
  name: 'VVB Admin',
  url: 'https://vvb1.cdxdemo.net/appadmin'
// }, {
//   name: 'Jacada VIVR Admin',
//   url: 'http://cceweb.cdxdemo.net:8982/admin/login/vivr'
}]

export default {
  data () {
    return {
      links
    }
  }
}
</script>
