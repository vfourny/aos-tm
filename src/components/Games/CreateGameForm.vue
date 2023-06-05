<template>
  <HeaderApp />
  <ion-content>
    <h1>Add new game results</h1>
    <form @submit.prevent="handleFormSubmit">
      <ion-list>
        <ion-item
          v-for="field in fields"
          :key="field.name"
        >
          <FormField
            :label="field.label"
            :type="field.type"
            :name="field.name"
            :select-options="field.selectOptions"
            :placeholder="field.placeholder"
            :has-dependencies="field.hasDependencies"
            :error-message="errors[field.name] ?? ''"
          />
        </ion-item>
      </ion-list>
      <ion-button
        type="submit"
        color="success"
      >
        Save
      </ion-button>
    </form>
  </ion-content>
</template>

<script setup lang="ts">
import { getCreateGameFields } from "./CreateGameForm.utils";
import { GameRecord } from '../../types/pocketbase-types';
import { ErrorMessage } from '../../../.nuxt/components';

const fields = getCreateGameFields();
const {createGame} = useGame()
const {user} = useAuth()

const {
  errors,
  values: formValues,
  handleSubmit,
} = useForm<GameRecord>({
  initialValues: {
    notes: "",
      isGrandStrategyValidate: false,
    score: 0,
  },
  validationSchema: gameValidationSchema,
});



const onSubmit = async () => {
  // Soumettre les données du formulaire
  const data = await createGame(
  {
    ...formValues,
    player: user.value.id,
  }
  );
};

const onSubmitError = (errors) => {
  // Gérer les erreurs de validation
  console.log(errors);
};

const handleFormSubmit = handleSubmit(onSubmit, onSubmitError);
</script>