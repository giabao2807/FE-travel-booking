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
        <h3 class="mb-5">Information Hotel</h3>
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
                <span class="font-weight-600">Tên Hotel</span>
              </div>
            </template>
            <el-col :span="20">
              <el-input
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
            <el-col :span="20">
              <el-input class="custom-upload" type="file" />
            </el-col>
          </el-form-item>
          <el-form-item prop="tourImages">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                <span class="font-weight-600">Hình Ảnh</span>
              </div>
            </template>
            <el-upload
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
              list-type="picture-card"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
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
      </v-window-item>
      <v-window-item :value="2">
        <h3 class="mb-5">Information Rooms</h3>
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
                <span class="font-weight-600">Tên Hotel</span>
              </div>
            </template>
            <el-col :span="20">
              <el-input
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
            <el-col :span="20">
              <el-input class="custom-upload" type="file" />
            </el-col>
          </el-form-item>
          <el-form-item prop="tourImages">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
                <span class="font-weight-600">Hình Ảnh</span>
              </div>
            </template>
            <el-upload
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
              list-type="picture-card"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
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
import { ref } from 'vue'
import { useCities } from '@/composables/useCities'
import { Plus } from '@element-plus/icons-vue'

const { allCities } = useCities()
const step = ref<number>(1)
</script>