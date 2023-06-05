<template>
  <ion-menu
    ref="menu"
    :content-id="props.contentId"
  >
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-button router-link="/settings"> Settings</ion-button>
        </ion-item>
        <ion-item>
          <ion-label @click="logoutSession">    Déconnexion
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">

const   props = defineProps<{
  contentId:  string
}>();

const menu = ref();


const router = useIonRouter()
const {logout} = useAuth()

const logoutSession = async () => {
  try {
    await logout();
    menu.value.$el.close();
    router.replace("/login");
  } catch (err) {
    console.log("erreur");
  }
};
</script>