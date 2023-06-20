<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    class="rounded-xl"
    width="50%"
    center
    draggable
    :show-close="false"
    @update:modelValue="(event) => hanldeChange(event)"
  >
    <template #header>
      <h3 class="my-2">
        <v-icon icon="mdi-account-multiple-plus-outline" />
        Tạo Mới Người Dùng
      </h3>
      <v-divider class="mx-2" />
    </template>
    <template #default>
      <v-card elevation="0" color="transparent">
        <v-card-text>
          <el-form
            class="mx-5"
            ref="formRef"
            label-width="90px"
            label-position="left"
          >
            <v-row align="center" class="my-1">
              <v-col class="py-0">
                <el-form-item prop="name">
                  <template #label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                      <span class="font-weight-600">Họ Lót</span>
                    </div>
                  </template>
                  <el-input
                    v-model="formCreateUser.lastName"
                    clearable
                  />
                </el-form-item>
              </v-col>
              <v-col class="py-0">
                <el-form-item prop="name">
                  <template #label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                      <span class="font-weight-600">Tên</span>
                    </div>
                  </template>
                  <el-input
                    v-model="formCreateUser.firstName"
                    clearable
                  />
                </el-form-item>
              </v-col>
            </v-row>
            <el-form-item prop="name">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Email</span>
                </div>
              </template>
              <el-input
                v-model="formCreateUser.email"
                clearable
              />
            </el-form-item>
            <el-form-item prop="name">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Phone</span>
                </div>
              </template>
              <el-input
                v-model="formCreateUser.phone"
                clearable
              />
            </el-form-item>
            <el-form-item prop="name">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Địa Chỉ</span>
                </div>
              </template>
              <el-input
                v-model="formCreateUser.address"
                clearable
              />
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-5 mt-2 mb-n2">
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            class="text-none"
            prepend-icon="mdi-close-outline"
            @click="() => dialogCreate = false"
          >
            Đóng
          </v-btn>
          <v-spacer />
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            color="primary"
            class="text-none"
            prepend-icon="mdi-cloud-arrow-up-outline"
            @click="() => {
              createUser()
            }"
          >
            Tạo Mới
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import NImage from './NImage.vue'
import NUploadPic from './NUploadPic.vue'
import { defineEmits } from 'vue'
import { useCities } from '@/composables/useCities'
import { useAdminUsers } from '@/composables/admins/useAdminUsers'

const { allCities } = useCities()
const { dialogCreate, formCreateUser, createUser } = useAdminUsers()

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
</script>