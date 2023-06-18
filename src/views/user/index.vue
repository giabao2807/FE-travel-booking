<template>
  <v-sheet class="profile">
    <v-container fluid class="pa-0 profile_main">
      <v-row class="h-75 w-100" align="end">
        <v-col class="ma-10">
          <h2>Hello {{ showName }},</h2>
          <div class="mx-2">
            <p>
              This is your profile travel.
              <br>
              You can see the information you've and manage your profile.
            </p>
            <v-btn
              prepend-icon="mdi-layers-edit"
              class="my-2 rounded-xl text-none"
              @click="() => {
                isEditInfo = true
                isEditContact = true
              }"
            >
              Edit Profile
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row align="start" justify="center">
        <div class="text-center">
          <n-avatar :image="checkAvatar" size="290" />
          <n-btn-file
            v-model="fileAvatar"
            class="mt-n15"
            @update:model-value="() => updateUserInfo(fileAvatar)"
          />
        </div>
      </v-row>
    </v-container>
    <v-container class="font-rowdies">
      <v-row justify="center">
        <v-container>
          <v-card-text class="margin-top-8rem">
            <div class="text-center">
              <h1>{{ showName }}</h1>
            </div>
            <v-divider class="ma-5" />
            <v-form ref="inForRef" class="mx-5">
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
                      :rules="[ruleRequired('LastName')]"
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
                      :rules="[ruleRequired('FirstName')]"
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
                      :rules="ruleBirthDay"
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
                      :rules="[ruleRequired('Giới tính')]"
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
                      :disabled="true"
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
                      :rules="rulePhone"
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
                      :rules="[ruleLength('Địa chỉ', 5)]"
                      clearable
                      class="ma-2"
                      variant="solo-filled"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="isEditInfo || isEditContact"
              @click="() => updateUserInfo({ ...userInfo })"
              prepend-icon="mdi-layers-edit"
              color="primary"
              class="mx-7"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import NAvatar from '@/components/NAvatar.vue'
import NBtnFile from '@/components/NBtnFile.vue'
import { onMounted } from 'vue'
import { useUserUtil } from '@/composables/useUser'
import { GENDER_DATA } from '@/resources/mockData'
import { validations } from '@/helpers/validate'

const { ruleRequired, ruleBirthDay, rulePhone, ruleLength } = validations()
const {
  userInfo,
  isEditInfo,
  isEditContact,
  checkAvatar,
  showName,
  fileAvatar,
  inForRef,
  updateUserInfo,
  getUserInfo
} = useUserUtil()

onMounted(async() => {
  await getUserInfo()
  showName.value = userInfo?.value.lastName + ' ' + userInfo?.value.firstName
})
</script>

<style lang="scss" scoped>
.profile {
  background-image: url('@/assets/img/map-bg.png');
  background-position: center center;
  background-size: cover;
  .profile_main {
    background-image: linear-gradient(to bottom, rgba(248, 230, 248, 0.2),rgba(235, 178, 244, 0.2)),
      url('https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg');
    background-size: cover;
    height: 30em;
  }
  .half-circle {
    position: absolute;
    // outline: 1rem solid #FFF;
  }
}
</style>