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
                <span class="font-weight-600">Tên tour</span>
              </div>
            </template>
            <el-input
              v-model="formTour.name"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="coverPicture">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-image-outline" />
                <span class="font-weight-600">Ảnh tour</span>
              </div>
            </template>
            <el-input v-model="formTour.coverPicture" class="custom-upload" type="file" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="groupSize">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-code-braces" />
            <span class="font-weight-600">Số lượng</span>
          </div>
        </template>
        <el-col :span="5">
          <el-input-number v-model="formTour.groupSize" style="width: 200px" />
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="city">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-apple-safari" />
                <span class="font-weight-600">Điểm đến</span>
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
          <el-form-item prop="departure">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-clock-start" />
                <span class="font-weight-600">Khởi hành</span>
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
              <span class="ml-3 mr-2">
                <v-icon icon="mdi-timeline-clock-outline" />
              </span>
              <el-col :span="10">
                <el-input model-value="Hằng ngày" disabled />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="traffics">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-caravan" />
                <span class="font-weight-600">Di chuyển</span>
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
                <span class="font-weight-600">Thời gian</span>
              </div>
            </template>
            <el-row>
              <el-col :span="10">
                <el-form-item prop="totalDay">
                  <el-input v-model="formTour.totalDay" />
                </el-form-item>
              </el-col>
              <v-icon class="mx-2 mt-1" color="gray" icon="mdi-theme-light-dark" style="transform: rotate(180deg);" />
              <el-col :span="10">
                <el-form-item prop="totalNight">
                  <el-input v-model="formTour.totalNight" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="price">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-cash-fast" />
            <span class="font-weight-600">Giá cả</span>
          </div>
        </template>
        <el-col :span="20">
          <el-input
            v-model="formTour.price"
            type="number"
          />
        </el-col>
      </el-form-item>
      <el-form-item prop="descriptions">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-alpha-d-box" />
            <span class="font-weight-600">Mô tả</span>
          </div>
        </template>
        <el-col :span="20">
          <n-editor v-model="formTour.descriptions" />
        </el-col>
      </el-form-item>
      <v-divider class="my-2" />
      <h3 class="my-3">Thông tin bổ sung</h3>
      <el-form-item prop="tourImages">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
            <span class="font-weight-600">Hình ảnh</span>
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
      <el-form-item prop="scheduleContent">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-receipt-text-clock-outline" />
            <span class="font-weight-600">Lịch trình</span>
          </div>
        </template>
        <el-col :span="20">
          <n-editor v-model="formTour.scheduleContent" />
        </el-col>
      </el-form-item>
      <el-form-item prop="note">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-alert-outline" />
            <span class="font-weight-600">Quy định</span>
          </div>
        </template>
        <el-col :span="20">
          <n-editor v-model="formTour.scheduleContent" />
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
import type { FormRules } from 'element-plus'
import NEditor from '@/components/NEditor.vue'

const { allCities } = useCities()
const checkQuantity = (rule: any, value: number, callback: any) => {
  value < 1 ?
    callback(new Error('Số lượng phải lớn hơn bằng 1.'))
    :
    callback()
}
const checkCash = (rule: any, value: number, callback: any) => {
  value < 1000 ?
    callback(new Error('Giá tiền không được thấp hơn 1.000.'))
    :
    callback()
}
const checkLength = (rule: any, value: string, callback: any) => {
  value.length < 10 ?
    callback(new Error('Nội dung phải lớn hơn 10 kí tự.'))
    :
    callback()
}
const checkName = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('Tên không được bỏ trống.'))
  }
  else {
    if (value.length <= 5) {
      callback(new Error('Độ dài tên lớn hơn 5 ký tự'))
    } else {
      callback()
    }
  }
}
const checkCoverImage = (rule: any, value: string, callback: any) => {
  !value ? callback(new Error('Tên không được bỏ trống.')) : callback()
}
const checkCity = (rule: any, value: string, callback: any) => {
  !value ? callback(new Error('Điểm đến không được bỏ trống.')) : callback()
}
const checkDeparture = (rule: any, value: string, callback: any) => {
  !value ? callback(new Error('Điểm khởi hành không được bỏ trống.')) : callback()
}
const checkTraffics = (rule: any, value: string, callback: any) => {
  !value ? callback(new Error('Phương tiện di chuyển không được bỏ trống.')) : callback()
}
const checkDay = (rule: any, value: number, callback: any) => {
  if (!value) {
    return callback(new Error('Ngày không được bỏ trống.'))
  }
  else {
    if (value < 1) {
      return callback(new Error('Ngày chọn không phù hợp.'))
    } else {
      return callback()
    }
  }
}
const checkNight = (rule: any, value: number, callback: any) => {
  formTour.value.totalDay - value !== 1 || formTour.value.totalDay - value !== 0 ?
    callback(new Error('Đêm chọn không phù hợp.')) : callback()
}

const rules = reactive<FormRules>({
  name: [{ validator: checkName }],
  coverPicture: [{ validator: checkCoverImage }],
  groupSize: [{ validator: checkQuantity }],
  city: [{ validator: checkCity }],
  departure: [{ validator: checkDeparture }],
  price: [{ validator: checkCash }],
  descriptions: [{ validator: checkLength }],
  scheduleContent: [
    { validator: checkLength }
  ],
  note: [
    { validator: checkLength }
  ],
  traffics: [{ validator: checkTraffics }],
  totalDay: [{ validator: checkDay }],
  totalNight: [{ validator: checkNight }]
})
const timeDays = ref({
  day: 0,
  night: 0
})
const formTour = ref({
  name: '',
  coverPicture: undefined,
  totalDay: 0,
  totalNight: 0,
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
    descriptions : `<div class="single-box-excerpt">${formTour.value.departure}</div>`,
    scheduleContent:  `<div class="panel-body content-tour-item content-tour-tab-program-tour-0">${formTour.value.scheduleContent}</div>`,
    note: `<div class="panel-body content-tour-item content-tour-tab-tour-rule-2">${formTour.value.note}</div>`,
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