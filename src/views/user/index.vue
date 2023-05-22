<template>
  <v-sheet class="profile">
    <v-container fluid class="pa-0 profile_main">
      <v-row class="h-75 w-100" align="end">
        <v-col class="ma-10">
          <h1>Hello Huy,</h1>
          <p>This is profile travel</p>
        </v-col>
      </v-row>
      <v-row align="start" justify="center">
        <v-avatar style="z-index: 1" class="half-circle" :image="require('@/assets/img/avatar.png')" size="300" />
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-card elevation="5" width="50%">
          <v-card-text style="margin-top: 8rem;">
            <div class="text-center">
              NAME USER
            </div>
            <v-divider class="ma-5" />
            <div class="mx-5">
              <v-row>
                <v-col>
                  Last Name:
                </v-col>
                <v-col>
                  uhm
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Email:
                </v-col>
                <v-col>
                  Email@mgail.com
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Birthday:
                </v-col>
                <v-col>
                  28/07/2001
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Gender:
                </v-col>
                <v-col>
                  Male
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Phone:
                </v-col>
                <v-col>
                  000000000000
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Address:
                </v-col>
                <v-col>
                  test/test/ duong test
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  Create At:
                </v-col>
                <v-col>
                  test/test/ duong test
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
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