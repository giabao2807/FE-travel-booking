<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    class="rounded-xl"
    width="60%"
    center
    draggable
    :show-close="false"
    @update:modelValue="(event) => hanldeChange(event)"
  >
    <template #header>
      <h3 class="my-2">
        <v-icon icon="mdi-home-edit-outline" />
        Cập Nhật Khách Sạn
      </h3>
      <v-divider class="mx-2" />
    </template>
    <template #default>
      <v-card elevation="0" color="transparent">
        <v-card-text>
          <el-form
            class="mx-5"
            ref="formRefHotel"
            label-width="120px"
            label-position="left"
            :model="formHotel"
            :rules="rulesHotel"
          >
            <el-form-item prop="name">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Khách Sạn</span>
                </div>
              </template>
              <el-col :span="20">
                <el-input
                  v-model="formHotel.name"
                  clearable
                />
              </el-col>
            </el-form-item>
            <el-form-item prop="city">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-apple-safari" />
                  <span class="font-weight-600">Thành Phố</span>
                </div>
              </template>
              <el-select filterable v-model="formHotel.city" clearable placeholder="Select">
                <el-option
                  v-for="item in allCities"
                  :key="item?.id"
                  :label="item?.name"
                  :value="item?.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="address">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Địa Chỉ</span>
                </div>
              </template>
              <el-col :span="20">
                <el-input
                  v-model="formHotel.address"
                  clearable
                />
              </el-col>
            </el-form-item>
            <el-form-item prop="descriptions">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-alpha-d-box" />
                  <span class="font-weight-600">Mô Tả</span>
                </div>
              </template>
              <el-col :span="20">
                <n-editor v-model="formHotel.descriptions" />
              </el-col>
            </el-form-item>
            <el-form-item prop="rules">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-alert-outline" />
                  <span class="font-weight-600">Quy Định</span>
                </div>
              </template>
              <el-col :span="20">
                <n-editor v-model="formHotel.rules" />
              </el-col>
            </el-form-item>
            <v-divider class="ma-3" />
            <el-form-item prop="coverPicture">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-outline" />
                  <span class="font-weight-600 width-150">Ảnh Đại Diện</span>
                </div>
              </template>
              <n-upload-pic
                v-model="formHotel.coverPicture"
                :dataImg="formHotel.coverPicture"
              />
            </el-form-item>
            <el-form-item prop="hotelImages">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                  <span class="font-weight-600">Hình ảnh</span>
                </div>
              </template>
              <v-sheet
                max-width="90%"
              >
                <v-slide-group
                  center-active
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="(item, index) in formHotel.hotelImages"
                    :key="index"
                  >
                    <n-image :src="item" height="150" width="150" cover class="mx-2">
                      <div class="d-flex align-start justify-end fill-height">
                        <v-btn
                          rounded
                          variant="plain"
                          size="small"
                          icon="mdi-close"
                          @click="() => handleRemoveImgHotel(item)"
                        />
                      </div>
                    </n-image>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </el-form-item>
            <el-form-item prop="hotelImages">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-plus-outline" />
                  <span class="font-weight-600">Thêm Ảnh</span>
                </div>
              </template>
              <n-upload-multi
                v-model="imgListUpdate"
                :dataImg="imgListUpdate"
                max-width="500"
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
            @click="() => {
              dialogUpdate = false
              resetFormHotel(formRefHotel)
            }"
          >
            Close
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
              updateHotel(formRefHotel)
            }"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import NImage from './NImage.vue'
import NUploadPic from './NUploadPic.vue'
import NUploadMulti from './NUploadMulti.vue'
import NEditor from './NEditor.vue'
import { defineEmits } from 'vue'
import { useCities } from '@/composables/useCities'
import { usePartnerHotels } from '@/composables/partners/usePartnerHotels'

const { allCities } = useCities()
const {
  formHotel,
  dialogUpdate,
  imgListUpdate,
  formRefHotel,
  rulesHotel,
  updateHotel,
  handleRemoveImgHotel,
  resetFormHotel
} = usePartnerHotels()

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
</script>