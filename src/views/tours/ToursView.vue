<template>
  <v-sheet class="tours-page">
    <v-container fluid class="pa-0">
      <div class="container_main">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary">
            <span class="heading-primary--main">Travels Tours</span>
            <span class="heading-primary--sub">is where life happens is where life</span>
          </h1>
        </v-row>
      </div>
      <v-card
        elevation="10"
        class="home-toolbar rounded-xl"
      >
        <v-card-text>
          <v-autocomplete
            label="City"
            name="city"
            color="primary"
            prepend-icon="mdi-map-marker-radius-outline"
            item-title="name"
            item-value="id"
            hide-details="auto"
            placeholder="Select..."
            variant="underlined"
            class="ma-5"
          />
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              label="Start Date"
              name="startDate"
              type="Date"
              prepend-icon="mdi-clipboard-text-clock-outline"
              color="primary"
              variant="underlined"
              hide-details="auto"
              class="mr-5"
            />
            <v-text-field
              label="End Date"
              name="endDate"
              type="Date"
              color="primary"
              variant="underlined"
              hide-details="auto"
            >
              <template #prepend>
                <!-- <p class="text-h6 text-disabled mt-n1 font-rowdies">{{ countDate }}</p> -->
                <v-icon class="mx-1" icon="mdi-weather-night" />
              </template>
            </v-text-field>
          </div>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-icon icon="mdi-map-legend text-disabled" size="25" />
            <v-label text="Options:" class="mx-2" />
            <v-btn
              class="text-none mx-7"
              color="primary"
              rounded
              min-width="110"
              variant="outlined"
            >
              Tìm Kiếm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-row>
      <v-col v-for="item in tours?.results" :key="item?.id">
        <v-card>
          <v-card-text>
            {{ item }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-if="tours?.results"
      v-model="pageTours"
      :total-visible="5"
      :length="tours?.pageNumber"
      @update:modelValue="() => getToursByFilterPanel({ page: pageTours })"
    />
  </v-sheet>
</template>
<script lang="ts" setup>
import { useTourUtil } from '@/composables/useTour'

const { tours, pageTours, getToursByFilterPanel } = useTourUtil()
</script>
<style lang="scss" scoped>
.tours-page {

}
</style>