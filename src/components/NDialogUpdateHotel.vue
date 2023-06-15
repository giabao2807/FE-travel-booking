<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    class="rounded-xl"
    width="60%"
    draggable
    :show-close="false"
    @update:modelValue="(event) => hanldeChange(event)">
    <template #default>
      <v-card elevation="0" color="transparent">
        <v-card-text>
          <el-form
            class="mx-5"
            ref="formRef"
            label-width="120px"
            label-position="left"
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
            <el-form-item prop="coverPicture">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-outline" />
                  <span class="font-weight-600" style="width: 150px;">Ảnh Đại Diện</span>
                </div>
              </template>
              <n-upload-pic
                v-model="formHotel.coverPicture"
                :dataImg="formHotel.coverPicture"
                class="mt-n15"
              />
            </el-form-item>
            <el-form-item prop="tourImages">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                  <span class="font-weight-600">Hình ảnh</span>
                </div>
              </template>
              <v-sheet
                max-width="750"
              >
                <v-slide-group
                  center-active
                  show-arrows
                >
                  <v-slide-group-item>
                    <v-img height="150" width="150" cover class="mx-2">
                      <div class="d-flex align-start justify-end fill-height">
                        <v-btn
                          rounded
                          variant="plain"
                          size="small"
                          icon="mdi-close"
                        />
                      </div>
                    </v-img>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </el-form-item>
            <el-form-item prop="tourImages">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-plus-outline" />
                  <span class="font-weight-600">Thêm Ảnh</span>
                </div>
              </template>
              <n-upload-multi />
            </el-form-item>
            <el-form-item prop="city">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-apple-safari" />
                  <span class="font-weight-600">Thành Phố</span>
                </div>
              </template>
              <el-select clearable placeholder="Select">
                <el-option
                  v-for="item in allCities"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="name">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Địa Chỉ</span>
                </div>
              </template>
              <el-col :span="20">
                <el-input
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
                <n-editor />
              </el-col>
            </el-form-item>
            <el-form-item prop="descriptions">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-alert-outline" />
                  <span class="font-weight-600">Quy Định</span>
                </div>
              </template>
              <el-col :span="20">
                <n-editor />
              </el-col>
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-5 my-2">
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            @click="() => dialogUpdate = false"
          >
            Close
          </v-btn>
          <v-spacer />
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            color="primary"
            @click="() => {
              dialogUpdate = false
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
import NUploadPic from './NUploadPic.vue'
import NUploadMulti from './NUploadMulti.vue'
import NEditor from './NEditor.vue'
import { ref, defineEmits, defineProps, withDefaults } from 'vue'
import { useCities } from '@/composables/useCities'
import { usePartnerHotels } from '@/composables/partners/usePartnerHotels'

type Props = {
  id: string,
  title: string,
}
const { allCities } = useCities()
const { formHotel, dialogUpdate } = usePartnerHotels()
const propItems = withDefaults(defineProps<Props>(), {
  id: '',
  title: ''
})

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
</script>