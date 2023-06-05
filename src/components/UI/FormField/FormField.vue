<template>
  <ion-label>{{ props.label }}</ion-label>
  <ion-checkbox
    v-if="props.type === FORM_FIELD_TYPE.CHECKBOX"
    v-model="value"
    :name="props.name"
    :disabled="isDisabled"
  />
  <ion-toggle
    v-else-if="props.type === FORM_FIELD_TYPE.TOGGLE"
    v-model="value"
    :disabled="isDisabled"
  >
    {{ props.label }}
  </ion-toggle>
  <ion-textarea
    v-else-if="props.type === FORM_FIELD_TYPE.TEXTAREA"
    v-model="value"
    :label="props.label"
    fill="outline"
    :placeholder="props.placeholder"
    :name="props.name"
    :error-text="errorMessage"
    :disabled="isDisabled"
  />
  <ion-select
    v-else-if="props.type === FORM_FIELD_TYPE.SELECT"
    v-model="value"
    :label="props.label"
    :multiple="props.selectOptions?.hasMultiple"
    interface="action-sheet"
    :name="props.name"
    :placeholder="props.placeholder"
    :disabled="isDisabled"
  >
    <ion-select-option
      v-for="item in selectOptionsItems"
      :key="item.key"
      :value="item.key"
    >
      {{ item.value }}
    </ion-select-option>
  </ion-select>
  <ion-input
    v-else
    v-model="value"
    :label="props.label"
    :placeholder="props.placeholder"
    :name="props.name"
    :type="props.type"
    :disabled="isDisabled"
    :error-text="errorMessage"
    :class="errorMessage ? 'ion-invalid ion-touched' : ''"
  />
</template>

<script setup lang="ts">
import { FORM_FIELD_TYPE, FormFieldModel } from "./FormField.utils";

const props = defineProps<FormFieldModel>();

const { value, errorMessage } = useField<string | number | boolean>(props.name);

const isDisabled = computed(() => {
  if (props.hasDependencies && props.selectOptions) {
    const dependentFieldKeys = _uniq(
      props.selectOptions.items.flatMap(
        (item) =>
          item.filters && item.filters.map((filter) => filter.dependentFieldKey)
      )
    );

    const dependencyValues = dependentFieldKeys.map((fieldKey) =>
      useFieldValue(fieldKey)
    );

    const isAllValuePresent = dependencyValues?.every((field) => field.value);

    return !isAllValuePresent ? true : false;
  }
  return props.isDisabled ? true : false;
});

const selectOptionsItems = computed(() => {
  if (
    props.type === FORM_FIELD_TYPE.SELECT &&
    props.selectOptions?.items.some(
      (item) => item.filters && item.filters.length > 0
    )
  ) {

    const filteredItems = props.selectOptions?.items?.filter((item) => {
      return item.filters?.every(
        (filter) => filter.requiredValue == useFieldValue(filter.dependentFieldKey).value
        
      );
    });
    return filteredItems;
  }
  return props.selectOptions?.items;
});
</script>