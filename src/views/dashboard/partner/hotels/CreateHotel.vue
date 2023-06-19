<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-container>
    <v-card-title class="justify-space-between">
      <h3 class="text-center mt-5">
        <v-icon icon="mdi-folder-home-outline" />
        Tạo Mới Khách Sạn
      </h3>
      <v-timeline direction="horizontal" truncate-line="both">
        <v-timeline-item
          v-for="(n, idx) in 2"
          :key="idx"
          :icon="['mdi-home-plus-outline', 'mdi-bed-double-outline'][idx]"
          :icon-color="step === n ? 'primary' : '#000'"
          dot-color="transparent"
        />
      </v-timeline>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <h3 class="mb-5">
          <v-icon icon="mdi-home-plus-outline" />
          Thông Tin Khách Sạn
        </h3>
        <el-form
          class="mx-5"
          ref="formRefHotel"
          :model="formHotel"
          :rules="rulesHotel"
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
          <v-row>
            <v-col cols="7">
              <el-form-item prop="coverPicture">
                <template #label>
                  <div class="d-flex align-center">
                    <v-icon class="mr-1" icon="mdi-image-outline" />
                    <span class="font-weight-600" style="width: 150px;">Ảnh Đại Diện</span>
                  </div>
                </template>
                <n-upload-pic v-model="formHotel.coverPicture" />
              </el-form-item>
            </v-col>
            <v-col>
              <el-form-item prop="hotelImages">
                <template #label>
                  <div class="d-flex align-center">
                    <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                    <span class="font-weight-600">Hình ảnh</span>
                  </div>
                </template>
                <n-upload-multi v-model="formHotel.hotelImages" />
              </el-form-item>
            </v-col>
          </v-row>
          <el-form-item prop="city">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-apple-safari" />
                <span class="font-weight-600">Thành Phố</span>
              </div>
            </template>
            <el-select filterable v-model="formHotel.city" clearable placeholder="Select city">
              <el-option
                v-for="item in allCities"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
        </el-form>
      </v-window-item>
      <v-window-item :value="2">
        <div class="d-flex">
          <h3 class="mb-5">
            <v-icon icon="mdi-bed-double-outline" />
            Thông Tin Phòng
          </h3>
          <v-spacer />
          <v-btn
            class="rounded-xl"
            color="primary"
            prepend-icon="mdi-archive-plus-outline"
            variant="tonal"
            @click="addNewRoom"
          >
            {{ dataFormRooms.length }}
          </v-btn>
        </div>
        <v-expansion-panels v-model="openFistRoom">
          <v-expansion-panel class="my-2" v-for="(dataForm, idx) in dataFormRooms" :key="idx">
            <v-expansion-panel-title>
              <h3>
                Phòng Số {{ idx + 1 }} - {{ dataForm.name }}
              </h3>
              <v-spacer />
              <v-btn
                v-if="idx !== 0"
                class="rounded-xl"
                color="primary"
                prepend-icon="mdi-sticker-remove-outline"
                variant="plain"
                @click="removeRoom(idx)"
              />
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card>
                <v-card-text>
                  <el-form
                    class="mx-5"
                    label-width="120px"
                    label-position="left"
                    ref="formRefRoom"
                    :model="dataForm"
                  >
                    <el-form-item prop="roomImages">
                      <template #label>
                        <div class="d-flex align-center">
                          <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                          <span class="font-weight-600">Hình ảnh</span>
                        </div>
                      </template>
                      <n-upload-multi v-model="dataForm.roomImages" />
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
                          v-model="dataForm.name"
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
                          v-model="dataForm.quantity"
                          :min="0"
                          style="width: 200px"
                        />
                      </el-col>
                    </el-form-item>
                    <el-row>
                      <el-col :span="10">
                        <el-form-item prop="square">
                          <template #label>
                            <div class="d-flex align-center">
                              <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                              <span class="font-weight-600">Diện tích</span>
                            </div>
                          </template>
                          <el-col :span="5">
                            <el-input-number
                              v-model="dataForm.square"
                              :min="0"
                              style="width: 200px"
                            />
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item prop="beds">
                          <template #label>
                            <div class="d-flex align-center">
                              <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                              <span class="font-weight-600">Số Giường</span>
                            </div>
                          </template>
                          <el-col :span="5">
                            <el-input-number
                              v-model="dataForm.beds"
                              :min="0"
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
                              v-model="dataForm.adults"
                              :min="0"
                              style="width: 200px"
                            />
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item prop="children">
                          <template #label>
                            <div class="d-flex align-center">
                              <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                              <span class="font-weight-600">Trẻ Em</span>
                            </div>
                          </template>
                          <el-col :span="5">
                            <el-col :span="5">
                              <el-input-number
                                v-model="dataForm.children"
                                :min="0"
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
                          v-model="dataForm.price"
                          :min="0"
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
                        <n-editor v-model="dataForm.description" />
                      </el-col>
                    </el-form-item>
                  </el-form>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-window-item>
    </v-window>
    <v-divider />
    <v-card-actions class="mx-2">
      <v-spacer />
      <v-btn
        v-if="step === 1"
        color="primary"
        variant="flat"
        min-width="130"
        class="text-none rounded-xl"
        prepend-icon="mdi-home-plus-outline"
        @click="() => {
          createHotel(formRefHotel)
        }"
      >
        Create Hotel
      </v-btn>
      <v-btn
        v-if="step === 2"
        color="primary"
        variant="flat"
        min-width="130"
        class="text-none rounded-xl"
        prepend-icon="mdi-bed-double-outline"
        @click="() => {
          createRooms()
        }"
      >
        Create Rooms
      </v-btn>
    </v-card-actions>
  </v-container>
</template>
<script lang="ts" setup>
import NEditor from '@/components/NEditor.vue'
import NUploadPic from '@/components/NUploadPic.vue'
import NUploadMulti from '@/components/NUploadMulti.vue'
import { useCities } from '@/composables/useCities'
import { usePartnerHotels } from '@/composables/partners/usePartnerHotels'

const { allCities } = useCities()
const {
  step,
  formHotel,
  dataFormRooms,
  openFistRoom,
  rulesHotel,
  formRefHotel,
  createHotel,
  createRooms,
  addNewRoom,
  removeRoom
} = usePartnerHotels()
</script>