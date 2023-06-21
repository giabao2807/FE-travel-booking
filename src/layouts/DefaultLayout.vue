<template>
  <div>
    <v-app-bar
      scroll-behavior="fade-image"
      color="rgba(255, 224, 230, 0.5)"
      image=""
      extended
      extension-height="10"
      :elevation="4"
      flat
    >
      <template #image>
        <n-image :src="require(`@/assets/img/app_bar.jpg`)" />
      </template>
      <v-row align="center">
        <img src="@/assets/img/logo.svg" alt="SVG Image">
        <p
          class="header-title font-palanquin"
          @click="() => {
            router.push({ name: 'homepage' })
            slideValue = undefined
          }"
        >
          TravelNE
        </p>
      </v-row>
      <v-spacer />
      <v-slide-group
        v-model="slideValue"
        show-arrows
        mandatory
        class="mb-n1 menu-header"
      >
        <v-slide-group-item
          v-for="item in HEADER_TAB"
          :key="item.value"
          v-slot="{ isSelected, toggle }"
        >
          <div class="align-center justify-center">
            <v-btn
              v-if="showBookingPage(item.name)"
              class="mx-5 title-group"
              size="large"
              rounded
              variant="plain"
              :color="isSelected ? 'primary' : '#000'"
              @click="() => {
                handleRoute({ name: item.name.toLowerCase() })
                toggle()
              }"
            >
              <p class="font-rowdies">{{ item.name }}</p>
            </v-btn>
            <div v-show="isSelected" class="my-n5 ml-7">
              <svg
                class="svg-custom"
                width="83"
                viewBox="0 0 83 7"
                fill="none"
              >
                <path
                  d="M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498"
                  stroke="#8a0642"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </v-slide-group-item>
      </v-slide-group>
      <div v-if="!display.xs" class="d-flex justify-center align-center">
        <div class="mb-n3">
          <v-badge class="icons" dot>
            <v-icon icon="mdi-bell-outline" />
          </v-badge>
        </div>
        <v-btn
          v-show="!authUser?.accessToken"
          class="text-none mx-5 btn-shadown"
          color="#8a0642"
          min-width="92"
          rounded
          variant="flat"
          @click="() => router.push('/sign_in')"
        >
          Đăng Nhập
        </v-btn>
        <v-menu location="start" transition="slide-x-transition" class="rounded-xl">
          <template #activator="{ props }">
            <v-avatar
              v-bind="props"
              v-if="authUser?.accessToken"
              :image="checkAvatar"
              class="mx-4"
            />
          </template>
          <v-list>
            <v-list-item>
              <div class="d-flex flex-column justify-center align-center py-5">
                <n-avatar
                  v-if="authUser?.accessToken"
                  :image="checkAvatar"
                  size="50"
                  class="mx-4"
                />
                <span>{{ authUser?.fullName }}</span>
                <span>{{ authUser?.email }}</span>
              </div>
              <v-divider />
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-information-box-outline"
              title="Quản lí tài khoản"
              @click="() => router.push({ name: 'userInfo' })"
            />
            <v-list-item
              prepend-icon="mdi-logout"
              title="Đăng xuất"
              @click="signOut"
            />
          </v-list>
        </v-menu>
      </div>
      <div v-if="display.xs">
        <v-menu location="start">
          <template #activator="{ props }">
            <v-icon icon="mdi-menu" v-bind="props" />
          </template>

          <v-list>
            <v-list-item v-if="authUser?.accessToken">
              <div class="d-flex flex-column justify-center align-center py-5">
                <n-avatar
                  :image="checkAvatar"
                  size="50"
                  class="mx-4"
                />
                <span>{{ authUser?.fullName }}</span>
                <span>{{ authUser?.email }}</span>
              </div>
              <v-divider />
            </v-list-item>
            <div v-if="authUser?.accessToken">
              <v-list-item
                prepend-icon="mdi-information-box-outline"
                title="Quản lí tài khoản"
                @click="() => router.push({ name: 'userInfo' })"
              />
              <v-list-item
                prepend-icon="mdi-logout"
                title="Đăng xuất"
                @click="signOut"
              />
            </div>
            <div v-if="!authUser?.accessToken">
              <v-list-item @click="() => router.push('/sign_in')">
                Đăng nhập
              </v-list-item>
              <v-divider class="mx-2" />
              <v-list-item @click="() => router.push('/sign_up')">
                Đăng ký
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <router-view />
    <v-footer class="text-center d-flex flex-column footer">
      <div class="pa-4">
        <v-btn
          v-for="link in [
            'Home',
            'About Us',
            'Team',
            'Services',
            'Blog',
            'Contact Us',
          ]"
          :key="link"
          color="primary"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
      </div>
      <v-divider />
      <div>
        {{ new Date().getFullYear() }} - <strong>Boninguci</strong>
      </div>
    </v-footer>
  </div>
</template>
<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NAvatar from '@/components/NAvatar.vue'
import router from '@/router'
import { handleRoute } from '@/helpers/loadingRoute'
import { useDefaultLayout } from '@/composables/useDefalutLayout'
import { HEADER_TAB } from '@/resources/mockData'

const {
  display,
  authUser,
  checkAvatar,
  slideValue,
  showBookingPage,
  signOut
} = useDefaultLayout()
</script>
<style scoped>
.header-title {
  margin-left: -10px;
  font-size: 25px;
  font-weight: bold;
  font-family: "Niconne", cursive;
  color: #f774ba;
  text-shadow: 1px 1px 0px #8a0642, 2px 2px 0px #f2a2ca, 3px 3px 0px #2c1c2c,
    4px 4px 0px #7e305f;
}
.icons:hover {
  scale: 1.2;
  animation: float 0.9s infinite alternate-reverse ease-in-out;
  transition: all 0.4s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
@keyframes float {
  to {
    translate: 0 -0.3rem;
  }
}
@media screen and (max-width: 790px) {
  .menu-header {
    width: 50%;
  }
}
.title-group :hover {
  color: var(--btn-animation-color);
  transition: all 0.2s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
.svg-custom {
  opacity: 0;
  animation: fadeIn ease-in 1;
  animation-fill-mode: forwards;
  animation-duration: 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(-20%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
.btn-shadown {
  color: #fff;
  font-weight: 600;
}
.btn-shadown:hover {
  box-shadow: #ec488c 0px 0px 0px 6px;
}
.footer {
  background-image: url('@/assets/img/main-footer-bg.jpg');
  background-size: cover
}
</style>
