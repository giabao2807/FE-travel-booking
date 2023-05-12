<template>
  <v-sheet>
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
      <div class="text-align-center">
        <h2 class="heading-secondary">
          Most popular tours
        </h2>
      </div>

      <v-row>
        <v-col
          v-for="tour in popularTours"
          :key="tour.id"
        >
          <v-card
            class="mx-auto my-12 rounded-xl"
            max-width="350"
            @click="() => router.push({ name: 'tourDetail', params: { id: tour.id } })"
          >
            <v-img
              class="align-end text-white"
              height="200"
              cover
              :src="tour?.coverPicture"
              :lazy-src="tour?.coverPicture"
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  />
                </v-row>
              </template>
              <v-card-title>{{ tour.name }}</v-card-title>
            </v-img>
            <v-card-item>
              <v-card-subtitle>
                <span class="me-1">{{ tour.city }} Favorite</span>
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
                  :model-value="tour.rate"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                />
                <div class="text-grey ms-4">
                  {{ tour.rate }} ({{ tour.numReview }})
                </div>
              </v-row>
              <div class="mt-5 text-subtitle-1 animate-charcter">
                <v-icon icon="mdi-cash-multiple" class="mt-n2 animate-charcter" />
                {{ formatCurrency(tour.price) }}
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1" />
            <v-card-title>Thời gian</v-card-title>
            <v-chip-group class="px-4">
              <v-chip>{{ tour.totalDays }}</v-chip>
            </v-chip-group>
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
    <v-sheet class="section-features my-15 px-0">
      <div class="text-align-center">
        <h2 class="heading-panel-2 mt-n2">
          Những khách sạn nổi bật
        </h2>
      </div>
      <v-row class="ma-5 mb-10" align="center" justify="center">
        <v-slide-group
          v-model="selectedCity"
          show-arrows
          mandatory
          class="width-80 font-weight-600;"
        >
          <v-slide-group-item
            v-for="city in recomendCities"
            :key="city.id"
            :value="city.id"
            v-slot="{ isSelected, toggle }"
          >
            <div class="align-center justify-center">
              <v-btn
                class="mx-5 title-group"
                size="large"
                rounded
                variant="text"
                :color="isSelected ? 'primary' : '#fff'"
                @click="()=>{
                  getRecomendHotelByCity(city?.id)
                  toggle()
                }"
              >
                {{ city.name }}
              </v-btn>
              <div v-show="isSelected" class="mt-n3 ml-10 mb-n2">
                <svg class="image-container" width="100" viewBox="0 0 83 7" fill="none">
                  <path d="M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498" stroke="#8a0642" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </div>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-row>
      <v-row class="mx-6">
        <v-col
          v-for="hotel in hotels"
          :key="hotel.id"
          md="3"
        >
          <v-card
            class="element-card mt-5"
            @click="()=> router.push({ name: 'hotelDetail', params: { id: hotel.id } })"
          >
            <v-img
              class="align-end text-white"
              height="150"
              :src="hotel.coverPicture"
              :lazy-src="hotel.coverPicture"
              cover
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  />
                </v-row>
              </template>
            </v-img>

            <v-card-title class="title-animation font-weight-bold">
              {{ hotel?.name }}
              <v-tooltip
                activator="parent"
                :text="hotel?.name"
                location="top"
              />
            </v-card-title>
            <v-card-text class="pt-2">
              <v-row justify="start" class="mx-2 mb-2">
                <span>{{ voteText(hotel?.rateAverage) }}</span>
                <v-rating
                  :model-value="hotel?.rateAverage"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                />
              </v-row>
              <div class="mt-2">
                <v-icon color="primary" icon="mdi-vote-outline" />
                <span class="text-disabled font-size-min-rem ml-2 mb-n2">Đánh giá - </span>
                <v-chip
                  color="primary"
                  size="small"
                  label
                  text-color="white"
                >
                  {{ hotel?.numReview }}
                </v-chip>
              </div>
            </v-card-text>
            <v-divider />
            <div class="ma-2 height-40px">
              <v-icon color="primary" icon="mdi-map-marker-outline" />
              <span class="text-disabled font-size-min-rem">{{ hotel.address }}</span>
            </div>
            <v-card-actions>
              <v-icon icon="mdi-cash-multiple" size="18" class="ml-1 mb-1 animate-charcter" />
              <p class="mx-2 animate-charcter">{{ hotel?.priceRange }}</p>
              <v-spacer />
              <v-icon
                size="18"
                class="mr-3"
                color="primary"
                icon="mdi-page-next-outline"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-container fluid>
      <section class="section-about">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">
            Exciting tours for adventurous people
          </h2>
        </div>

        <div class="row">
          <div class="col-1-of-2">
            <h3 class="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
            <p class="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
              ducimus quam nisi exercitationem omnis earum qui.
            </p>

            <h3 class="heading-tertiary u-margin-bottom-small">Live adventures like you never have before</h3>
            <p class="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla deserunt voluptatum nam.
            </p>

            <a href="#" class="btn-text">Learn more &rarr;</a>
          </div>
          <div class="col-1-of-2">
            <div class="composition">
              <img
                srcset="img/nat-1.jpg 300w, https://i.pinimg.com/564x/e4/78/05/e478051c99e8a68843add167811b1494.jpg 1000w"
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 1"
                class="composition__photo composition__photo--p1"
                src="https://i.pinimg.com/564x/e4/78/05/e478051c99e8a68843add167811b1494.jpg"
              >

              <img
                srcset="img/nat-2.jpg 300w, https://i.pinimg.com/564x/b4/9a/de/b49ade0c9859ec26eb7e9192ef4fdea8.jpg 1000w"
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 2"
                class="composition__photo composition__photo--p2"
                src="https://i.pinimg.com/564x/b4/9a/de/b49ade0c9859ec26eb7e9192ef4fdea8.jpg"
              >

              <img
                srcset="img/nat-3.jpg 300w, https://i.pinimg.com/564x/ae/5b/fd/ae5bfd38ccad70f3a008071128984d76.jpg 1000w"
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 3"
                class="composition__photo composition__photo--p3"
                src="https://i.pinimg.com/564x/ae/5b/fd/ae5bfd38ccad70f3a008071128984d76.jpg"
              >
              <img src="https://i.pinimg.com/564x/e4/78/05/e478051c99e8a68843add167811b1494.jpg" alt="Photo 1" class="composition__photo composition__photo--p1">
              <img src="https://i.pinimg.com/564x/b4/9a/de/b49ade0c9859ec26eb7e9192ef4fdea8.jpg" alt="Photo 2" class="composition__photo composition__photo--p2">
              <img src="https://i.pinimg.com/564x/ae/5b/fd/ae5bfd38ccad70f3a008071128984d76.jpg" alt="Photo 3" class="composition__photo composition__photo--p3">
            </div>
          </div>
        </div>
      </section>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import router from '@/router'
import { useHomeUtil } from '@/composables/useHomeUtil'
import { convertionType } from '@/helpers/convertion'

const { recomendCities, selectedCity, hotels, popularTours, voteText, getRecomendHotelByCity } = useHomeUtil()
const { formatCurrency } = convertionType()
</script>
<style scoped>
@import '@/assets/css/home.css';
@keyframes run-left {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
}
.running-text {
  white-space: nowrap;
  overflow: hidden;
  animation: run-left 5s linear infinite;
}
</style>
