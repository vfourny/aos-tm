<template>
  <ion-page id="main-content">
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar>
        <ion-tab-button
          v-for="tab in tabs"
          :key="tab.name"
          :tab="tab.name"
          :href="tab.href"
          :disabled="tab.disabled"
        >
          <font-awesome-icon
            :icon="`fa-solid ${tab.icon}`"
            size="2xl"
          />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth'
  ]
})

const tabs = [
  {
    href: '/tabs/datacards',
    icon: 'fa-scroll',
    label: 'Datacards',
    name: 'datacards',
    disabled: true
  },
  {
    href: '/tabs/games',
    icon: 'fa-burst',
    label: 'Parties',
    name: 'games'
  },
  {
    href: '/tabs/armory',
    icon: 'fa-wand-sparkles',
    label: 'Armurerie',
    name: 'armory',
    disabled: true
  },
  {
    href: '/tabs/stats',
    icon: 'fa-chart-simple',
    label: 'Statistiques',
    name: 'stats',
    disabled: true
  }
]
</script>
