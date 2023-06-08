<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <v-container class="create-tours-page">
    <h3 class="my-5">Create Tour Du Lịch</h3>
    <el-form
      :rules="rules"
      :model="formTour"
      label-width="120px"
      label-position="left"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item class="mr-5" prop="name">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-rename-box-outline" />
                <span class="font-weight-600">Name tour</span>
              </div>
            </template>
            <el-input
              v-model="formTour.name"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-image-outline" />
                <span class="font-weight-600">Avatar tour</span>
              </div>
            </template>
            <el-input v-model="formTour.coverPicture" class="custom-upload" type="file" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-code-braces" />
            <span class="font-weight-600">Quantity</span>
          </div>
        </template>
        <el-col :span="5">
          <el-input-number v-model="formTour.groupSize" style="width: 200px"/>
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-apple-safari" />
                <span class="font-weight-600">City</span>
              </div>
            </template>
            <el-select v-model="formTour.city" clearable placeholder="Select">
              <el-option
                v-for="item in allCities"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-clock-start" />
                <span class="font-weight-600">Start</span>
              </div>
            </template>
            <el-row>
              <el-col :span="10">
                <el-select
                  v-model="formTour.departure"
                  clearable
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in allCities"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-col>
              <span class="ml-3 mr-2">Time</span>
              <el-col :span="10">
                <el-input model-value="Hằng ngày" disabled />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-caravan" />
                <span class="font-weight-600">Traffics</span>
              </div>
            </template>
            <el-select
              v-model="formTour.traffics"
              multiple
              filterable
              allow-create
              default-first-option
              clearable
              placeholder="Select"
            >
              <el-option
                v-for="item in TRAFFICS"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-map-clock-outline" />
                <span class="font-weight-600">Total Days</span>
              </div>
            </template>
            <el-row>
              <el-col :span="8">
                <el-input v-model="timeDays.day" />
              </el-col>
              <span class="mx-2">
                <v-icon color="gray" icon="mdi-sun-clock-outline" />
              </span>
              <el-col :span="8">
                <el-input v-model="timeDays.night" />
              </el-col>
              <span class="mx-2">
                <v-icon color="gray" icon="mdi-weather-night" />
              </span>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-cash-fast" />
            <span class="font-weight-600">Prices</span>
          </div>
        </template>
        <el-col :span="20">
          <el-input
            v-model="formTour.price"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-alpha-d-box" />
            <span class="font-weight-600">Descriptions</span>
          </div>
        </template>
        <el-col :span="20">
          <el-input
            v-model="formTour.descriptions"
            :autosize="{ minRows: 3, maxRows: 5 }"
            type="textarea"
          />
        </el-col>
      </el-form-item>
      <v-divider class="my-2" />
      <h3 class="my-3">Thông tin bổ sung</h3>
      <el-form-item>
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
            <span class="font-weight-600">More Images</span>
          </div>
        </template>
        <el-upload
          v-model:file-list="formTour.tourImages"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          list-type="picture-card"
          :on-remove="handleRemove"
          :auto-upload="false"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-receipt-text-clock-outline" />
            <span class="font-weight-600">Schedule</span>
          </div>
        </template>
        <el-col :span="20">
          <el-input v-model="formTour.scheduleContent" type="textarea" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-alert-outline" />
            <span class="font-weight-600">Rules Tour</span>
          </div>
        </template>
        <el-col :span="20">
          <el-input v-model="formTour.note" type="textarea" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { UploadProps } from 'element-plus/es/components'
import { Plus } from '@element-plus/icons-vue'
import { useCities } from '@/composables/useCities'
import { TRAFFICS } from '@/resources/mockData'
import type { FormInstance, FormRules } from 'element-plus'


const { allCities } = useCities()
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Tên không được bỏ trống' },
    { min: 5, message: 'Độ dài tên lớn hơn 5 ký tự' }
  ],
  coverImage: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change'
    }
  ] })
const timeDays = ref({
  day: 0,
  night: 0
})
const formTour = ref({
  name: '',
  coverPicture: undefined,
  totalDays: '',
  descriptions: '',
  groupSize: 0,
  price: 0,
  scheduleContent: '',
  note: '',
  city: undefined,
  departure: '',
  traffics: [],
  tourImages: undefined
})

const onSubmit = () => {
  formTour.value = {
    ...formTour.value,
    totalDays: `${timeDays.value.day} ngày ${timeDays.value.night} đêm`
  }
  console.log('submit!', formTour.value)
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
</script>
<style lang="scss" scoped>
.create-tours-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  min-height: 45rem;
}
</style>
<style>
.custom-upload .el-input__wrapper .el-input__inner {
  --el-input-inner-height: none !important;
  padding: 2px 0;
}
</style>