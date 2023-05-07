<template>
  <v-sheet class="layout">
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
                <v-icon size="40" icon="mdi-tag-search-outline" />
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
    <v-container class="my-15 px-0" fluid>
      <div class="section-features">
        <div style="text-align: center;">
          <h2 class="heading-secondary">
            Những khách sạn nổi bật
          </h2>
        </div>
        <v-row class="ma-5 mb-10" align="center" justify="center">
          <v-slide-group
            show-arrows
            style="width: 50%; font-weight: 600;"
          >
            <v-slide-group-item
              v-for="n in ['Hồ Chí Minh City', 'Đà Nẵng', 'Quảng Nam', 'Phú Yên', 'Vũng Tàu', 'Hà Nội']"
              :key="n"
              v-slot="{ isSelected, toggle }"
            >
              <div class="align-center justify-center">
                <p
                  class="mx-5 title-group"
                  rounded
                  :color="isSelected ? 'primary' : undefined"
                  @click="toggle"
                >
                  {{ n }}
                </p>
                <div v-show="isSelected" class="mt-n3 mb-n2">
                  <svg class="image-container" width="100" viewBox="0 0 83 7" fill="none">
                    <path d="M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498" stroke="#8a0642" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </div>
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-row>
        <v-row class="my-10">
          <v-card
            v-for="n in 4"
            :key="n"
            class="mx-auto card-style"
            max-width="400"
          >
            <v-img
              class="align-end text-white"
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
              cover
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>
            <v-card-text>
              <div>Whitehaven Beach</div>
              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange">
                Share
              </v-btn>
              <v-btn color="orange">
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-row class="my-8">
          <v-card
            v-for="n in 4"
            :key="n"
            class="mx-auto card-style"
            max-width="400"
          >
            <v-img
              class="align-end text-white"
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
              cover
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>
            <v-card-text>
              <div>Whitehaven Beach</div>
              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange">
                Share
              </v-btn>
              <v-btn color="orange">
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </div>
    </v-container>
    <v-container>
      <div class="w-70" />
    </v-container>
  </v-sheet>
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
  rgba(79, 18, 52, 0.8) 20%,
  rgb(238, 220, 230) 66%,
  rgb(253, 235, 255) 100%
  );
}
.header-title{
  padding: 10px;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Niconne', cursive;
  color: #e0d6e9;
  text-shadow: 2px 2px 0px #8a0642,
               4px 4px 0px #ec488c,
               6px 6px 0px #b374b5,
               8px 8px 0px #7e305f,
               10px 10px 0px#553c9a;
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

.section-features {
  padding: 5rem 0;
  height: 80rem;
  background-image: linear-gradient(to right bottom, rgba(200, 200, 200, 0.2), rgba(137, 107, 136, 0.28)),
  url("https://cdn.vuetifyjs.com/images/cards/docks.jpg");
  background-size: cover;
  transform: skewY(-5deg);
}
.section-features > * {
  transform: skewY(5deg);
}
@media only screen and (max-width: 56.25em) {
  .section-features {
    padding: 10rem 0; }
}

.card-style:hover{
  transform: scale(1.2);
  z-index: 9999;
}
</style>
