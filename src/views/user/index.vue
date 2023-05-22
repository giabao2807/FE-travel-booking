<template>
  <v-sheet class="profile">
    <v-container fluid class="pa-0 profile_main">
      <v-row class="h-75 w-100" align="end">
        <v-col class="ma-10">
          <h2>Hello Huy,</h2>
          <p>
            This is your profile travel.
            <br>
            You can see the information you've and manage your profile.
          </p>
          <v-btn class="my-2">
            Edit Profile
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="start" justify="center">
        <v-avatar style="z-index: 1" class="half-circle" :image="require('@/assets/img/avatar.png')" size="300" />
      </v-row>
    </v-container>
    <v-container class="font-rowdies">
      <v-row justify="center">
        <v-container>
          <v-card-text style="margin-top: 8rem;">
            <div class="text-center">
              NAME USER
            </div>
            <v-divider class="ma-5" />
            <div class="mx-5">
              <h4 class="my-5">USER INFORMATION</h4>
              <div class="ml-10">
                <v-row justify="space-between">
                  <v-col cols="5">
                    Last Name
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                  <v-col cols="5">
                    First Name
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col cols="5">
                    Birthday
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                  <v-col cols="5">
                    Gender
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                </v-row>
              </div>
              <h4 class="my-5">CONTACT INFORMATION</h4>
              <div class="ml-10">
                <v-row justify="space-between">
                  <v-col cols="5">
                    Email
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                  <v-col cols="5">
                    Phone
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col>
                    Address
                    <v-text-field
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card-text>
        </v-container>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useUserUtil } from '@/composables/useUser'

const { userInfo } = useUserUtil()
</script>

<style lang="scss" scoped>
.profile {
  background-image: url('@/assets/img/map-bg.png');
  background-size: cover;
  .profile_main {
    background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.2),rgba(235, 178, 244, 0.2)),
      url('https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg');
    background-size: cover;
    height: 40em;
  }
  .half-circle {
    position: absolute;
    // outline: 1rem solid #FFF;
  }
}
</style>