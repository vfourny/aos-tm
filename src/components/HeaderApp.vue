<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button />
      </ion-buttons>
      <ion-title> {{props.title}} </ion-title>
      <ion-buttons slot="end">
        <ion-menu-button />
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">

const   props = defineProps<{
  title:string
}>();

</script>