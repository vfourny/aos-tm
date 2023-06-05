<template>
  <form class="login-form">
    <ion-item>
      <ion-input
        v-model="email"
        label="Email"
        label-placement="floating"
        type="email"
        required
      />
    </ion-item>
    <ion-item>
      <ion-input
        v-model="password"
        label="Password"
        label-placement="floating"
        type="password"
        required
      />
    </ion-item>
    <ion-button @click="handleLoginWithEmailAndPassword" ></ion-button>
    <ion-button
      expand="block"
      @click="handleLoginWithGoogle"
    >
      Log In with google
    </ion-button>
  </form>
</template>

<script setup>
import {loadingController,toastController} from '@ionic/vue'

const email=ref("")
const password=ref("")


const router = useIonRouter()
const {loginWithGoogle,loginWithEmailAndPassword} = useAuth()

const handleLoginWithEmailAndPassword = async () => {
  const loader = await loadingController.create({});
  const toast = await toastController.create({ duration: 10000 });
  try {
    await loader.present();
    await loginWithEmailAndPassword(email.value, password.value);
    router.replace('/tabs/games/')
  } catch (err) {
    console.log("erreur");
  }
};

const handleLoginWithGoogle = async ()=>{
  try{
    await loginWithGoogle()
    router.replace('/tabs/games')
  } catch(error){
    console.log(error)
  }
}

</script>