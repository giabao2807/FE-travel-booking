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
        <v-avatar class="zindex-1 half-circle" :image="checkAvatar" size="290" />
      </v-row>
    </v-container>
    <v-container class="font-rowdies">
      <v-row justify="center">
        <v-container>
          <v-card-text class="margin-top-8rem">
            <div class="text-center">
              <h1>{{ `${userInfo?.lastName} ${userInfo?.firstName}` }}</h1>
            </div>
            <v-divider class="ma-5" />
            <div class="mx-5">
              <h4 class="my-5">
                USER INFORMATION
                <v-icon
                  class="mx-5"
                  icon="mdi-clipboard-edit-outline"
                  @click="() => isEditInfo = !isEditInfo"
                />
              </h4>
              <div class="ml-10">
                <v-row justify="space-between">
                  <v-col cols="5">
                    Last Name
                    <v-text-field
                      v-model="userInfo.lastName"
                      :disabled="!isEditInfo"
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                  <v-col cols="5">
                    First Name
                    <v-text-field
                      v-model="userInfo.firstName"
                      :disabled="!isEditInfo"
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
                      v-model="userInfo.birthday"
                      :disabled="!isEditInfo"
                      type="Date"
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                  <v-col cols="5">
                    Gender
                    <v-select
                      v-model="userInfo.gender"
                      :disabled="!isEditInfo"
                      :items="GENDER_DATA"
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                      item-title="name"
                      item-value="value"
                      prepend-inner-icon="mdi-gender-male-female"
                    />
                  </v-col>
                </v-row>
              </div>
              <h4 class="my-5">
                CONTACT INFORMATION
                <v-icon
                  class="mx-5"
                  icon="mdi-clipboard-edit-outline"
                  @click="() => isEditContact = !isEditContact"
                />
              </h4>
              <div class="ml-10">
                <v-row justify="space-between">
                  <v-col cols="5">
                    Email
                    <v-text-field
                      v-model="userInfo.email"
                      :disabled="!isEditContact"
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                  <v-col cols="5">
                    Phone
                    <v-text-field
                      v-model="userInfo.phone"
                      :disabled="!isEditContact"
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
                      v-model="userInfo.address"
                      :disabled="!isEditContact"
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn v-if="isEditInfo || isEditContact" class="mx-7">Save</v-btn>
          </v-card-actions>
        </v-container>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useUserUtil } from '@/composables/useUser'
import { GENDER_DATA } from '@/resources/mockData'

const {
  userInfo,
  isEditInfo,
  isEditContact,
  checkAvatar,
  updateUserInfo
} = useUserUtil()
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