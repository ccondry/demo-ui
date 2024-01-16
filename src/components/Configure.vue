<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Demo Session Configuration</template>
    <p>
      Use this form to choose the Vertical to use when you open
      <a href="https://mm-brand.cxdemo.net/?session=1088907&datacenter=RTP" target="_blank" rel="noopener">
        your demo website</a>, as well as which multichannel system you want to
        demo.
    </p>
    <p>
      Your settings are automatically saved when you change them. 
    </p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Vertical Selection</template>

    <div>
      Load verticals owned by this username:
      <input type="text">
      &nbsp;
      <button>Load User Verticals</button>
    </div>

    <div>
      <p>
        Choose your demo vertical (3 options):
      </p>
      <select>
        <option>Cumulus Finance</option>
        <option>Cumulus Travel</option>
        <option>My Custom Vertical</option>
      </select>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Multichannel Configuration</template>
    <div>
      Choose your multichannel system:
    </div>
    <select>
      <option>ECE</option>
      <option>Webex</option>
      <option>SalesForce</option>
    </select>
  </WelcomeItem>
</template>

<script>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'

export default {
  components: {
    WelcomeItem,
    DocumentationIcon,
    ToolingIcon,
    EcosystemIcon
  },

  computed: {
    verticals () {
      return ['Cumulus Finance', 'Cumulus Travel', 'My Custom Vertical']
    },
  },
}
</script>