<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-sheet class="home-container">
    <v-container fluid class="pa-0">
      <div class="container_main">
        <v-row class="h-50 w-100" align="end" justify="center">
          <h1 class="heading-primary shadow-text">
            <span class="heading-primary--main">Travels and booking</span>
            <span class="heading-primary--sub">No land is strange, only travelers are strangers</span>
          </h1>
        </v-row>
      </div>
      <v-card
        elevation="10"
        class="home-toolbar rounded-xl"
      >
        <v-card-text>
          <n-cities-select
            v-model="filterPanel.cityId"
            prependIcon="mdi-map-marker-radius-outline"
            class="ma-5"
          />
          <div class="d-flex align-center flex-wrap ma-5">
            <v-text-field
              v-model="filterPanel.startDate"
              :min="minDate(new Date())"
              label="Start Date"
              name="startDate"
              type="Date"
              prepend-icon="mdi-clipboard-text-clock-outline"
              color="primary"
              variant="underlined"
              hide-details="auto"
              class="mr-5"
              @update:model-value="() => changeEndDate()"
            />
            <v-text-field
              v-model="filterPanel.endDate"
              :min="filterPanel.startDate"
              label="End Date"
              name="endDate"
              type="Date"
              color="primary"
              variant="underlined"
              hide-details="auto"
            >
              <template #prepend>
                <p class="text-h6 text-disabled mt-n1 font-rowdies">{{ countDate }}</p>
                <v-icon class="mx-1" icon="mdi-weather-night" />
              </template>
            </v-text-field>
          </div>
          <div class="d-flex align-center flex-wrap ma-5">
            <v-icon icon="mdi-map-legend text-disabled" size="25" />
            <v-label text="Options:" class="mx-2" />
            <v-radio-group
              v-model="flagSearch"
              inline
              hide-details
              class="ml-5"
            >
              <v-radio
                v-for="item in SEARCH_FOR"
                :key="item"
                :value="item"
                :label="item"
                class="mx-4"
              />
            </v-radio-group>
            <v-btn
              class="text-none mx-7"
              color="primary"
              rounded
              :prepend-icon="flagSearch === 'Tours' ? 'mdi-airplane-search' : 'mdi-bed-double-outline'"
              min-width="110"
              variant="outlined"
              @click="() => handleFilter()"
            >
              Tìm Kiếm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container fluid class="home-panel-city">
      <div class="text-align-center">
        <h2 class="heading-secondary font-bungee my-5">
          Điểm đến yêu thích trong nước
        </h2>
      </div>
      <v-row class="ma-5">
        <v-col v-for="item in getCitiesPanel" :key="item?.id" :cols="item.col">
          <n-image
            :src="item?.image"
            height="300"
            class="image-transform"
            @click="() => {
              filterPanel.cityId = item?.id
              handleFilter()
            }"
          >
            <template #default>
              <div class="d-flex align-center justify-center fill-height image-container">
                <p class="text shadow-text font-size-20">{{ item?.name }}</p>
              </div>
            </template>
          </n-image>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="my-2 home-panel-tour">
      <v-container class="home-panel-tour-chill" v-if="authUser.accessToken && toursForUser.length !== 0" fluid>
        <div class="text-align-center mb-10">
          <h3 class="heading-secondary font-bungee">
            Đề Xuất Các Tours Dành Cho Bạn
          </h3>
        </div>
        <el-carousel
          :interval="4000"
          type="card"
          height="300px"
          class="mx-5"
          @change="(event) => chooseCard=event"
        >
          <el-carousel-item
            v-for="(item, idx) in toursForUser"
            :key="item?.id"
            :class="chooseCard===idx ? 'card-for-user rounded' : null"
          >
            <v-card height="300px">
              <n-image
                :hasFav="chooseCard===idx ? true : false"
                :src="item?.coverPicture"
                class="image-card-user"
                :favorite="item?.isFavorite"
                @addFavorite="async() => {
                  await addFavoriteTour(item?.id)
                  getToursForUser()
                }"
                @removeFavorite="async() => {
                  await removeFavoriteTour(item?.id)
                  getToursForUser()
                }"
              />
              <v-card-text class="pa-3 content-card-user">
                <h3 class="font-rowdies font-weight-bold">{{ item?.name }}</h3>
                <v-divider class="mt-2 mb-5 mx-5" />
                <div class="text-card-user">
                  <v-row
                    align="center"
                    class="mx-0 mb-2"
                  >
                    <v-rating
                      :model-value="item?.rate"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    />
                    <div class="text-grey ms-4">
                      {{ item?.rate }} ({{ item?.numReview }})
                    </div>
                  </v-row>
                  <span class="my-2">
                    <v-icon color="primary" icon="mdi-map-marker-radius-outline" />
                    <strong>Thành phố:</strong>
                    <span class="mx-2"> {{ item?.city }}</span>
                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    />
                  </span>
                  <div class="d-flex align-center justify-between my-3">
                    <v-icon icon="mdi-calendar-text-outline" color="primary" />
                    <strong>Thời gian:</strong>
                    <v-chip class="mx-2" label color="primary">{{ item?.totalDays }}</v-chip>
                  </div>
                  <div>
                    <v-icon icon="mdi-calendar-start-outline" color="primary" />
                    <strong>Khởi hành:</strong>
                    <span class="mx-2">{{ item?.departure }}</span>
                  </div>
                  <div class="my-2">
                    <p v-if="!_.isEmpty(item?.couponData)" class="text-caption animate-charcter">
                      <v-icon icon="mdi-billboard" class="animate-charcter" />
                      Ưu đãi du lịch - {{ item?.couponData?.discountPercent }}%
                    </p>
                    <p v-if="!_.isEmpty(item?.couponData)" class="remove-text">{{ formatCurrency(item?.price) }}</p>
                    <h2 class="animate-charcter">
                      <v-icon
                        v-if="_.isEmpty(item?.couponData)"
                        icon="mdi-cash-fast"
                        class="animate-charcter"
                      />
                      {{ formatCurrency(getPriceDiscount(item?.price, item?.couponData?.discountPercent)) }}
                    </h2>
                  </div>
                </div>
                <v-btn
                  v-if="chooseCard===idx"
                  color="primary"
                  variant="tonal"
                  class="text-none rounded-xl ma-5 button-card-user"
                  @click="() => handleRoute({ name: 'tourDetail', params: { id: item?.id } })"
                >
                  More...
                </v-btn>
              </v-card-text>
            </v-card>
          </el-carousel-item>
        </el-carousel>
      </v-container>
      <v-container fluid>
        <div class="text-align-center">
          <h2 class="heading-secondary font-bungee">
            Những Tour Du Lịch Hấp Dẫn
          </h2>
        </div>
        <v-row>
          <v-col
            v-for="tour in popularTours"
            :key="tour?.id"
          >
            <v-card
              class="mx-auto my-12 rounded-xl bg-theme-status"
              elevation="8"
              width="310"
              height="420"
            >
              <n-image
                :hasFav="true"
                class="align-end text-white"
                height="180"
                :src="tour?.coverPicture"
                :favorite="tour?.isFavorite"
                @addFavorite="async() => {
                  await addFavoriteTour(tour.id)
                  getPopularTours()
                }"
                @removeFavorite="async() => {
                  await removeFavoriteTour(tour.id)
                  getPopularTours()
                }"
              >
                <div
                  v-if="Object.keys(tour?.couponData).length !== 0"
                  class="mx-2 mt-n1 home-tour-coupon"
                  variant="outlined"
                >
                  <span class="font-weight-bold font-size-15 mx-auto">
                    {{ tour?.couponData?.discountPercent }}%
                  </span>
                </div>
                <v-card-title
                  class="font-rowdies font-weight-bold shadow-text"
                >
                  {{ tour?.name }}
                  <v-tooltip
                    width="300"
                    activator="parent"
                    :text="tour?.name"
                    location="top"
                  />
                </v-card-title>
              </n-image>
              <v-card-subtitle class="mt-4">
                <span class="me-1">{{ tour?.city }} Favorite</span>
                <v-icon
                  color="error"
                  icon="mdi-fire-circle"
                  size="small"
                />
              </v-card-subtitle>
              <v-card-text @click="() => handleRoute({ name: 'tourDetail', params: { id: tour?.id } })">
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :model-value="tour?.rate"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  />
                  <div class="text-grey ms-4">
                    {{ tour?.rate }} ({{ tour?.numReview }})
                  </div>
                </v-row>
                <div
                  v-if="Object.keys(tour?.couponData).length !== 0"
                  class="mt-3 remove-text text-grey-darken-2"
                >
                  {{ formatCurrency(tour?.price) }}
                </div>
                <div class="d-flex align-center justify-space-between mt-2 mb-3">
                  <div class="text-subtitle-1 animate-charcter">
                    <v-icon icon="mdi-cash-multiple" class="mt-n2 animate-charcter" />
                    {{
                      formatCurrency(
                        getPriceDiscount(tour?.price, tour?.couponData.discountPercent)
                      )
                    }}
                  </div>
                  <div>
                    <v-icon
                      v-for="item in getTraffic(tour?.traffics)"
                      :key="item?.value"
                      :icon="item?.icon"
                      color="primary"
                    />
                  </div>
                </div>
                <v-divider class="mx-n2 mb-1" />
                <div class="d-flex align-center justify-space-between my-2">
                  <div>
                    <v-icon icon="mdi-calendar-text-outline" color="primary" />
                    Thời gian:
                  </div>
                  <v-chip label color="primary">{{ tour?.totalDays }}</v-chip>
                </div>
                <div>
                  <v-icon icon="mdi-calendar-start-outline" color="primary" />
                  Khởi hành: {{ tour?.departure }}
                </div>
              </v-card-text>
              <v-btn
                class="font-rowdies button-card-tour"
                color="primary"
                variant="text"
              >
                See More...
              </v-btn>
              <div @click="() => handleRoute({ name: 'tourDetail', params: { id: tour?.id } })">
                <div class="group-hover:-rotate-[4deg] animation-card-tour transition-transform" />
                <div class="group-hover:-rotate-[8deg] animation-card-tour transition-transform" />
              </div>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center">
          <n-panel-loading :loading="popularTours.length === 0" />
          <n-button-animated
            label="Discover our tours"
            width="20rem"
            @click="() => handleRoute({ name: 'tours' })"
          />
        </div>
      </v-container>
    </v-container>
    <v-container fluid class="section-features">
      <v-container v-if="authUser.accessToken && hotelsForUser.length !== 0" fluid>
        <div class="text-align-center mb-10">
          <h3 class="heading-secondary font-bungee">
            Đề Xuất Các Hotels Dành Cho Bạn
          </h3>
        </div>
        <el-carousel
          :interval="4000"
          type="card"
          height="300px"
          class="mx-5"
          @change="(event) => chooseCardHotel=event"
        >
          <el-carousel-item
            v-for="(item, idx) in hotelsForUser"
            :key="item?.id"
            :class="chooseCardHotel===idx ? 'card-for-user rounded' : null"
          >
            <v-card height="300px">
              <n-image
                :hasFav="chooseCardHotel===idx ? true : false"
                :src="item?.coverPicture"
                class="image-card-user"
                :favorite="item?.isFavorite"
                @addFavorite="async() => {
                  await addFavoriteHotel(item.id)
                  getHotelsForUser()
                }"
                @removeFavorite="async() => {
                  await removeFavoriteHotel(item.id)
                  getHotelsForUser()
                }"
              />
              <v-card-text class="pa-3 content-card-user">
                <h3 class="font-rowdies font-weight-bold">{{ item?.name }}</h3>
                <v-divider class="mt-2 mb-5 mx-5" />
                <div class="mx-2">
                  <v-row align="center" class="my-3">
                    <v-icon :icon="voteText(item?.rateAverage).icon" color="primary" class="mr-1" />
                    <strong class="font-size-min-rem">{{ voteText(item?.rateAverage).name }}</strong>
                    <v-rating
                      :model-value="item?.rateAverage"
                      class="mx-5"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    />
                  </v-row>
                  <v-row align="center" class="my-3">
                    <v-icon color="primary" icon="mdi-vote-outline" />
                    <strong class="font-size-min-rem mr-5">Đánh giá:</strong>
                    <v-chip
                      color="primary"
                      size="small"
                      label
                      text-color="white"
                    >
                      {{ item?.numReview }}
                    </v-chip>
                  </v-row>
                  <v-row class="my-3">
                    <v-icon color="primary" icon="mdi-map-marker-radius-outline" />
                    <strong class="font-size-min-rem">Địa chỉ:</strong>
                    <v-col class="pa-0 ml-5">
                      {{ item?.address }}
                    </v-col>
                  </v-row>
                  <div class="my-2">
                    <p
                      v-if="!_.isEmpty(item?.couponData)"
                      class="text-caption animate-charcter"
                    >
                      <v-icon icon="mdi-home-city-outline" class="animate-charcter" />
                      Ưu đãi khách sạn - {{ item?.couponData?.discountPercent }}%
                    </p>
                    <p
                      v-if="!_.isEmpty(item?.couponData)"
                      class="remove-text"
                    >
                      {{ rangePrice(item?.minPrice, item?.maxPrice) }}
                    </p>
                    <h3 class="animate-charcter">
                      <v-icon
                        v-if="_.isEmpty(item?.couponData)"
                        icon="mdi-cash-fast"
                        class="animate-charcter"
                      />
                      {{ rangePrice(item?.minPrice, item?.maxPrice, item?.couponData?.discountPercent) }}
                    </h3>
                  </div>
                </div>
                <v-btn
                  v-if="chooseCardHotel===idx"
                  color="primary"
                  variant="tonal"
                  class="text-none rounded-xl ma-5 button-card-user"
                  @click="() => handleRoute({ name: 'hotelDetail', params: { id: item?.id } })"
                >
                  More...
                </v-btn>
              </v-card-text>
            </v-card>
          </el-carousel-item>
        </el-carousel>
      </v-container>
      <v-container fluid class="mt-5 mb-15">
        <div class="text-align-center">
          <h2 class="heading-secondary font-bungee">
            Những Hotels nổi bật
          </h2>
        </div>
        <v-row class="ma-5 mb-10" align="center" justify="center">
          <v-slide-group
            v-model="selectedCity"
            show-arrows
            mandatory
            center-active
            class="width-80 font-weight-600"
          >
            <v-slide-group-item
              v-for="city in recomendCities"
              :key="city?.id"
              :value="city?.id"
              v-slot="{ isSelected, toggle }"
            >
              <div class="align-center justify-center">
                <v-btn
                  class="mx-5 title-group font-weight-600"
                  size="large"
                  rounded
                  variant="text"
                  :color="isSelected ? 'primary' : '#000'"
                  @click="()=>{
                    getRecomendHotelByCity(city?.id)
                    toggle()
                  }"
                >
                  {{ city?.name }}
                </v-btn>
                <div v-show="isSelected" class="mt-n3 ml-10 mb-n2">
                  <svg class="image-container" width="100" viewBox="0 0 83 7" fill="none">
                    <path d="M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498" stroke="#8a0642" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </div>
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-row>
        <n-skeleton-loader class="mx-6" :loading="loadingPanelHotel" :quantity="8" />
        <v-row v-if="!loadingPanelHotel" class="mx-6">
          <v-col
            v-for="hotel in popularHotels"
            :key="hotel?.id"
            md="3"
          >
            <v-card class="element-card mt-5">
              <n-image
                :hasFav="true"
                class="align-end text-white"
                height="40%"
                :src="hotel?.coverPicture"
                :favorite="hotel?.isFavorite"
                @addFavorite="async() => {
                  await addFavoriteHotel(hotel.id)
                  getRecomendHotelByCity(selectedCity)
                }"
                @removeFavorite="async() => {
                  await removeFavoriteHotel(hotel.id)
                  getRecomendHotelByCity(selectedCity)
                }"
              >
                <div
                  v-if="Object.keys(hotel?.couponData).length !== 0"
                  class="mx-2 mt-n1 home-coupon"
                  variant="outlined"
                >
                  <span class="font-weight-bold font-size-15 mx-auto">
                    {{ hotel?.couponData?.discountPercent }}%
                  </span>
                </div>
              </n-image>
              <div class="background-card-title" @click="() => handleRoute({ name: 'hotelDetail', params: { id: hotel?.id } })">
                <v-card-title class="font-rowdies font-weight-bold">
                  {{ hotel?.name }}
                  <v-tooltip
                    activator="parent"
                    :text="hotel?.name"
                    location="top"
                  />
                </v-card-title>
                <v-card-text class="pt-2">
                  <v-row class="pa-0" align="center" justify="center">
                    <v-col>
                      <v-icon :icon="voteText(hotel?.rateAverage).icon" color="primary" class="mr-1" />
                      <strong class="font-size-min-rem">{{ voteText(hotel?.rateAverage).name }}</strong>
                    </v-col>
                    <v-col>
                      <v-rating
                        :model-value="hotel?.rateAverage"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-0 pa-0" align="center" justify="center">
                    <v-col>
                      <v-icon color="primary" icon="mdi-vote-outline" />
                      <strong class="font-size-min-rem ml-2 mb-n3">Đánh giá</strong>
                    </v-col>
                    <v-col>
                      <v-chip
                        color="primary"
                        size="small"
                        label
                        text-color="white"
                      >
                        {{ hotel?.numReview }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider color="#000" class="mx-5" />
                <div class="mx-3 my-1 height-40px">
                  <v-icon color="primary" icon="mdi-map-marker-outline" />
                  <span class="font-size-min-rem">{{ hotel?.address }}</span>
                </div>
                <v-card-actions class="mx-2">
                  <v-icon icon="mdi-cash-multiple" size="18" class="mb-1 animate-charcter" />
                  <p class="mx-2 animate-charcter">
                    {{ rangePrice(hotel?.minPrice, hotel?.maxPrice, hotel?.couponData?.discountPercent) }}
                  </p>
                  <v-spacer />
                  <v-icon
                    size="18"
                    class="mr-3"
                    color="primary"
                    icon="mdi-page-next-outline"
                  />
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center mt-15">
        <n-button-animated
          label="Discover our hotels"
          width="19rem"
          @click="() => handleRoute({ name: 'hotels' })"
        />
      </div>
    </v-container>
    <v-container class="mt-10">
      <div class="text-center mb-8">
        <h3 class="text-primary text-uppercase">Services</h3>
        <h1 class="heading-secondary font-bungee mt-n2">Tours & Travel Services</h1>
      </div>
      <v-row style="height: 500px; margin-top: 5rem;">
        <v-col cols="5" class="mt-5">
          <h3 class="heading-text">You're going to fall in love with nature</h3>
          <p class="my-2">
            Đội ngũ nhân viên tư vấn nhiệt tình
            – phản hồi nhanh chóng – tác phong chuyên nghiệp.
            luôn sẵn sàng giúp đỡ bạn trong từng bước của quá trình đặt vé.
          </p>
          <v-divider class="my-2" />
          <p>
            Tải ngay ứng dụng TravelNE
            <br>
            Khách sạn - Du lịch hàng đầu Việt Nam. Mang cả thế giới nằm trọn trong tay!
          </p>
          <div>
            <v-btn color="primary" class="mx-n5 text-none" variant="text">Learn more &rarr;</v-btn>
          </div>
        </v-col>
        <v-col>
          <div class="content-img-view">
            <v-img
              :src="require('@/assets/img/map-bg.png')"
              cover
            />
            <v-img
              class="content-img-view__photo content-img-view__photo--p1"
              src="https://i.pinimg.com/564x/b4/9a/de/b49ade0c9859ec26eb7e9192ef4fdea8.jpg"
              cover
            >
              <div class="text-center mt-15">
                <v-icon color="surface" size="50" icon="mdi-compass-rose" />
                <h3 class="ma-3" style="color: #FFF">Travel Guide</h3>
              </div>
            </v-img>
            <v-img
              class="content-img-view__photo content-img-view__photo--p2"
              src="https://i.pinimg.com/564x/22/90/f9/2290f9190b3ac2f967c777d9dd6c2d90.jpg"
              cover
            >
              <div class="text-center mt-15">
                <v-icon color="surface" size="50" icon="mdi-home-city-outline" />
                <h3 class="ma-3" style="color: #FFF">Hotel Booking</h3>
              </div>
            </v-img>
            <v-img
              class="content-img-view__photo content-img-view__photo--p3"
              src="https://i.pinimg.com/736x/b5/ba/68/b5ba680b522761344eb642a5264ddfae.jpg"
              cover
            >
              <div class="text-center mt-15">
                <v-icon color="surface" size="50" icon="mdi-ticket-percent-outline" />
                <h3 class="ma-3" style="color: #FFF">Ticket Voucher</h3>
              </div>
            </v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import NPanelLoading from '@/components/NPanelLoading.vue'
import NSkeletonLoader from '@/components/NSkeletonLoader.vue'
import NCitiesSelect from '@/components/NCitiesSelect.vue'
import { onMounted } from 'vue'
import _ from 'lodash'
import NImage from '@/components/NImage.vue'
import '@/assets/css/home.css'
import { SEARCH_FOR } from '@/resources/mockData'
import { handleRoute } from '@/helpers/loadingRoute'
import { useHomeUtil } from '@/composables/useHomeUtil'
import { convertionType } from '@/helpers/convertion'
import { useAuthentication } from '@/composables/useAuth'

const { authUser } = useAuthentication()
const {
  recomendCities,
  popularHotels,
  hotelsForUser,
  selectedCity,
  popularTours,
  getCitiesPanel,
  loadingPanelHotel,
  filterPanel,
  flagSearch,
  countDate,
  toursForUser,
  chooseCard,
  chooseCardHotel,
  getRecomendHotelByCity,
  changeEndDate,
  handleFilter,
  addFavoriteTour,
  removeFavoriteTour,
  getToursForUser,
  getHotelsForUser,
  getPopularTours,
  addFavoriteHotel,
  removeFavoriteHotel,
  getRecomendCities
} = useHomeUtil()
const {
  formatCurrency,
  voteText,
  getPriceDiscount,
  minDate,
  rangePrice,
  getTraffic
} = convertionType()
onMounted(async() => {
  await getRecomendCities()
  getPopularTours()
  if (authUser.value.accessToken) {
    getToursForUser()
    getHotelsForUser()
  }
  getRecomendHotelByCity(selectedCity.value)
})
</script>
<style lang="scss" scoped>
.card-for-user {
  transform: scale(1.02);
  border: 3px solid var(--color-coupon-2);
}
.button-card-user {
  position: absolute;
  bottom: 0;
  right: 0;
}
.card-for-user .content-card-user {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  transition: all 0.8s ease;
}
.card-for-user .image-card-user {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  transition: all 0.8s ease;
}
.heading-text {
  text-transform: uppercase; }
.title-group :hover {
  color: var(--btn-animation-color);
  transition: all 0.2s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
.content-img-view {
  position: relative;
}
.content-img-view__photo {
  width: 55%;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4);
  transition: all 0.2s cubic-bezier(0.680, -0.550, 0.265, 1.550);
  border-radius: 2px;
  position: absolute;
  z-index: 10;
  transition: all .2s;
  outline-offset: 2rem;
}
@media only screen and (max-width: 56.25em) {
  .content-img-view__photo {
    float: left;
    position: relative;
    width: 33.3%;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.2);
  }
}
.content-img-view__photo--p1 {
  left: 1rem;
  top: -1rem; }
  @media only screen and (max-width: 56.25em) {
    .content-img-view__photo--p1 {
      top: 0;
      transform: scale(1.2)
    }
  }
.content-img-view__photo--p2 {
  right: 0;
  top: 2rem;
}
  @media only screen and (max-width: 56.25em) {
    .content-img-view__photo--p2 {
      top: -1rem;
      transform: scale(1.3);
      z-index: 100;
    }
}
.content-img-view__photo--p3 {
  left: 20%;
  top: 10rem;
}
  @media only screen and (max-width: 56.25em) {
    .content-img-view__photo--p3 {
      top: 1rem;
      left: 0;
      transform: scale(1.1);
    }
}
.content-img-view__photo:hover {
  transform: scale(1.05) translateY(-0.5rem);
  box-shadow: 0 2.5rem 4rem rgba(0, 0, 0, 0.5);
  border: 2px solid #FFF;
  z-index: 20;
}
.content-img-view:hover .content-img-view__photo:not(:hover) {
  transform: scale(0.95);
}

</style>
