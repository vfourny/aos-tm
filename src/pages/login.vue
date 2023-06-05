<template>
  <ion-page>
    <ion-content
      :fullscreen="true"
      class="ion-padding"
    >
      <LoginForm />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

</script>
