<!-- eslint-disable vue/no-static-inline-styles -->
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
      <h3>Cập Nhật Thông Tin Phòng</h3>
    </template>
    <template #default>
      <v-card elevation="0" color="transparent">
        <v-card-text>
          <el-form
            class="mx-5"
            ref="formRef"
            label-width="120px"
            label-position="left"
          >
            <el-form-item prop="tourImages">
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
                    v-for="(item, index) in formUpdateRoom.roomImages"
                    :key="index"
                  >
                    <n-image :src="item" height="150" width="150" cover class="mx-2">
                      <div class="d-flex align-start justify-end fill-height">
                        <v-btn
                          rounded
                          variant="plain"
                          size="small"
                          icon="mdi-close"
                        />
                      </div>
                    </n-image>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </el-form-item>
            <el-form-item prop="tourImages">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                  <span class="font-weight-600">Hình ảnh</span>
                </div>
              </template>
              <n-upload-multi v-model="formUpdateRoom.roomImages" />
            </el-form-item>
            <el-form-item prop="name">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Tên Phòng</span>
                </div>
              </template>
              <el-col :span="20">
                <el-input
                  v-model="formUpdateRoom.name"
                  clearable
                />
              </el-col>
            </el-form-item>
            <el-form-item prop="quantity">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                  <span class="font-weight-600">Số Lượng</span>
                </div>
              </template>
              <el-col :span="5">
                <el-input-number
                  v-model="formUpdateRoom.quantity"
                  style="width: 200px"
                />
              </el-col>
            </el-form-item>
            <el-row>
              <el-col :span="10">
                <el-form-item prop="adults">
                  <template #label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                      <span class="font-weight-600">Diện tích</span>
                    </div>
                  </template>
                  <el-col :span="5">
                    <el-input-number
                      v-model="formUpdateRoom.square"
                      style="width: 200px"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="adults">
                  <template #label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                      <span class="font-weight-600">Số Giường</span>
                    </div>
                  </template>
                  <el-col :span="5">
                    <el-input-number
                      v-model="formUpdateRoom.beds"
                      style="width: 200px"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item prop="adults">
                  <template #label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                      <span class="font-weight-600">Người Lớn</span>
                    </div>
                  </template>
                  <el-col :span="5">
                    <el-input-number
                      v-model="formUpdateRoom.adults"
                      style="width: 200px"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="adults">
                  <template #label>
                    <div class="d-flex align-center">
                      <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                      <span class="font-weight-600">Trẻ Em</span>
                    </div>
                  </template>
                  <el-col :span="5">
                    <el-col :span="5">
                      <el-input-number
                        v-model="formUpdateRoom.children"
                        style="width: 200px"
                      />
                    </el-col>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="price">
              <template #label>
                <div class="d-flex align-center">
                  <v-icon class="mr-1" icon="mdi-cash-fast" />
                  <span class="font-weight-600">Giá Phòng</span>
                </div>
              </template>
              <el-col :span="20">
                <el-input
                  v-model="formUpdateRoom.price"
                  type="number"
                >
                  <template #append>VNĐ</template>
                </el-input>
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
                <n-editor v-model="formUpdateRoom.description" />
              </el-col>
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-5 mt-2">
          <v-btn
            rounded
            min-width="110"
            variant="outlined"
            class="text-none"
            @click="() => dialogEditRoom = false"
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
            @click="() => {
              updateRoom()
            }"
          >
            Cập Nhật
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import NUploadMulti from './NUploadMulti.vue'
import NEditor from './NEditor.vue'
import { defineEmits } from 'vue'
import { useCities } from '@/composables/useCities'
import { usePartnerHotels } from '@/composables/partners/usePartnerHotels'

const { allCities } = useCities()
const { dialogEditRoom, formUpdateRoom, updateRoom } = usePartnerHotels()

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
</script>