<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-container>
    <v-card-title class="justify-space-between">
      <h2 class="text-center mt-5">Create Hotel</h2>
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
          Thông Tin Khách Sạn
        </h3>
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
                <n-upload-pic />
              </el-form-item>
            </v-col>
            <v-col>
              <el-form-item prop="tourImages">
                <template #label>
                  <div class="d-flex align-center">
                    <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                    <span class="font-weight-600">Hình ảnh</span>
                  </div>
                </template>
                <n-upload-multi />
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
      </v-window-item>
      <v-window-item :value="2">
        <h3 class="mb-5">
          Thông Tin Room
          <v-icon
            icon="mdi-plus"
            @click="() => {
              quantityRoom++
              dataFormRoom.push({
                name: '',
                beds: 0,
                adults: 0,
                children: 0,
                description: '',
                price: 0,
                square: 0,
                quantity: 0,
                roomImages: []
              })
            }"
          />
          {{ quantityRoom }}
        </h3>
        <v-card class="my-2" v-for="(dataForm, idx) in dataFormRoom" :key="idx">
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
                <n-upload-multi />
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
                        v-model="dataForm.square"
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
                        v-model="dataForm.beds"
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
                          v-model="dataForm.children"
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
      </v-window-item>
    </v-window>
    <v-divider />
    <v-card-actions class="mx-2">
      <v-btn
        v-if="step === 2"
        variant="flat"
        @click="() => step--"
      >
        Back
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="step === 1"
        color="primary"
        variant="flat"
        @click="() => step++"
      >
        Next
      </v-btn>
      <v-btn
        v-if="step === 2"
        color="primary"
        variant="flat"
      >
        Create
      </v-btn>
    </v-card-actions>
  </v-container>
</template>
<script lang="ts" setup>
import NEditor from '@/components/NEditor.vue'
import NUploadPic from '@/components/NUploadPic.vue'
import NUploadMulti from '@/components/NUploadMulti.vue'
import { ref } from 'vue'
import { useCities } from '@/composables/useCities'

type ICreateRoom = {
  name: string,
  beds: number,
  adults: number,
  children: number,
  description: string,
  price: number,
  square: number,
  quantity: number,
  roomImages: any[]
}
const { allCities } = useCities()
const step = ref<number>(1)
const quantityRoom = ref<number>(1)
const initDataRoom: ICreateRoom = {
  name: '',
  beds: 0,
  adults: 0,
  children: 0,
  description: '',
  price: 0,
  square: 0,
  quantity: 0,
  roomImages: []
}
const dataFormRoom = ref<ICreateRoom[]>([initDataRoom])
</script>