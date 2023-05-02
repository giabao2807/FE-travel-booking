
<template>
  <v-layout full-height class="layout">
    <v-app-bar
      color="transparent"
    >
      <v-app-bar-title>TraveNE</v-app-bar-title>
      <template #append>
        <div v-if="!display.xs" class="d-flex">
          <p class="mx-5">FAQ</p>
          <p class="mx-5">Blog</p>
          <v-chip class="mx-5" @click="() => router.push('/sign_in')">SignIn</v-chip>
        </div>
        <div v-if="display.xs">
          <v-icon icon="mdi-menu" />
        </div>
      </template>
    </v-app-bar>
    <v-main class="overflow-hidden" scrollable>
      <v-container fluid class="container_main d-flex justify-center">
        <v-row>
          <v-col cols="12">
            <h1 class="heading-primary">
              <span class="heading-primary--main">Travels and booking</span>
              <span class="heading-primary--sub">is where life happens is where life</span>
            </h1>
          </v-col>
          <v-col class="ml-8 mt-n5" cols="5">
            <v-card color="rgba(10, 9, 10, 0.3)">
              <v-form class="ma-4">
                <v-text-field
                  prepend-inner-icon="mdi-map-marker-star-outline"
                  type="text"
                  color="primary-darken-1"
                  variant="outlined"
                  bg-color="surface"
                />
                <div class="d-flex flex-wrap align-center">
                  <v-text-field
                    type="date"
                    color="primary-darken-1"
                    variant="outlined"
                    bg-color="surface"
                    hide-details
                  />
                  <v-text-field
                    type="date"
                    color="primary-darken-1"
                    variant="outlined"
                    class="mx-2"
                    bg-color="surface"
                    hide-details
                  />
                  <v-icon size="40" icon="mdi-magnify-expand" />
                </div>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <div style="text-align: center;">
          <h2 class="heading-secondary">
            Most popular tours
          </h2>
        </div>

        <v-row>
          <v-col
            v-for="item in mock_item"
            :key="item"
          >
            <v-card
              class="mx-auto my-12 rounded-xl"
              max-width="350"
            >
              <v-img
                class="align-end text-white"
                cover
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              >
                <v-card-title class="card__heading-span">Test 1</v-card-title>
              </v-img>
              <v-card-item>
                <v-card-subtitle>
                  <span class="me-1">Local Favorite</span>
                  <v-icon
                    color="error"
                    icon="mdi-fire-circle"
                    size="small"
                  />
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :model-value="4.5"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  />
                  <div class="text-grey ms-4">
                    4.5 (413)
                  </div>
                </v-row>
                <div class="my-4 text-subtitle-1">
                  $ • Italian, Cafe
                </div>
                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
              </v-card-text>
              <v-divider class="mx-4 mb-1" />
              <v-card-title>Tonight's availability</v-card-title>
              <div class="px-4">
                <v-chip-group>
                  <v-chip>5:30PM</v-chip>
                  <v-chip>7:30PM</v-chip>
                  <v-chip>8:00PM</v-chip>
                  <v-chip>9:00PM</v-chip>
                </v-chip-group>
              </div>
              <v-card-actions>
                <v-btn
                  color="deep-purple-lighten-2"
                  variant="text"
                >
                  See More...
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center">
          <n-button-animated label="Discover our tours" width="20rem" fontSize="1rem" />
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import NButtonAnimated from '@/components/NButtonAnimated.vue'
const display = ref(useDisplay())
const mock_item = ref(3)
</script>
<style scoped>
.layout {
  background: linear-gradient(
    40deg,
  rgb(79, 18, 52, 0.8) 20%,
  rgb(238, 220, 230) 66%,
  rgb(253, 235, 255) 100%
  );
}
.container_main {
  background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.5),rgba(235, 178, 244, 0.2)),
    url('@/assets/img/bg_1.jpg');
  background-size: cover;
  height: 100%;
}
@supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
  .container_main {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
    height: 95vh; }
}
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem); }
  80% {
    transform: translateX(1rem); }
  100% {
    opacity: 1;
    transform: translate(0); } }
@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem); }
  80% {
    transform: translateX(-1rem); }
  100% {
    opacity: 1;
    transform: translate(0); } }
.heading-primary {
  color: #fff;
  text-transform: uppercase;
  backface-visibility: hidden;
  text-align: center;
  margin-top: 8rem;
}
.heading-primary--main {
    display: block;
    font-size: 4rem;
    font-weight: 600;
    letter-spacing: 1.5rem;
    animation-name: moveInLeft;
    animation-duration: 1s;
    animation-timing-function: ease-out;
}

.heading-primary--sub {
  display: block;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 1.2rem;
  animation: moveInRight 1s ease-out;
}
@media only screen and (max-width: 37.5em) {
  .heading-primary--main {
      letter-spacing: 1rem;
      font-family: 3rem;
  }
  .heading-primary--sub {
    letter-spacing: .5rem;
  }
}
.heading-secondary {
  margin-top: 3rem;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  color: rgb(245, 244, 244);
  letter-spacing: .2rem;
  transition: all .2s;
}
@media only screen and (max-width: 56.25em) {
  .heading-secondary {
    font-size: 3rem; }
}
@media only screen and (max-width: 37.5em) {
  .heading-secondary {
    font-size: 2.5rem; }
}
.heading-secondary:hover {
  transform: skewY(2deg) skewX(15deg) scale(1.1);
  text-shadow: 0.5rem 1rem 2rem rgba(0, 0, 0, 0.2);
}
.card__heading-span {
  padding: 1rem 1.5rem;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  font-size: 2.8rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: right;
  color: #fff;
}
</style>