<!-- eslint-disable vue/no-static-inline-styles -->
<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <v-container class="create-tours-page">
    <h2 v-if="route.query.id" class="mt-5 mb-10">
      <v-icon icon="mdi-cloud-cog-outline" />
      Cập nhật Tour Du Lịch
    </h2>
    <h2 v-else class="mt-5 mb-10">
      <v-icon icon="mdi-cloud-plus-outline" />
      Tạo Mới Tour Du Lịch
    </h2>
    <el-form
      ref="formRef"
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
                <span class="font-weight-600">Tên Tour</span>
              </div>
            </template>
            <el-input
              v-model="formTour.name"
              placeholder="Enter the name of the tour"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="coverPicture">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-image-outline" />
                <span class="font-weight-600" style="width: 150px;">Ảnh Đại Diện</span>
              </div>
            </template>
            <n-upload-pic
              v-model="formTour.coverPicture"
              :dataImg="formTour.coverPicture"
              class="mt-n15"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="groupSize">
        <template #label>
          <div class="d-flex align-center">
            <v-icon class="mr-1" icon="mdi-code-braces" />
            <span class="font-weight-600">Số Lượng</span>
          </div>
        </template>
        <el-col :span="5">
          <el-input-number
            :min="0"
            v-model="formTour.groupSize"
            style="width: 200px"
          />
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
            <el-select filterable v-model="formTour.city" clearable placeholder="Select the city">
              <el-option
                v-for="item in allCities"
                :key="item?.id"
                :label="item?.name"
                :value="item?.id"
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
            <el-input
              v-model="formTour.departure"
              placeholder="Enter the departure"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="traffics">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-caravan" />
                <span class="font-weight-600">Phương Tiện</span>
              </div>
            </template>
            <el-select
              v-model="formTour.traffics"
              multiple
              placeholder="Select traffics"
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
                  <el-input
                    :min="0"
                    type="number"
                    v-model="formTour.totalDay"
                    placeholder="Enter number day"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <v-icon class="mx-2 mt-1" color="gray" icon="mdi-theme-light-dark" style="transform: rotate(180deg);" />
              <el-col :span="10">
                <el-form-item prop="totalNight">
                  <el-input
                    :min="0"
                    type="number"
                    v-model="formTour.totalNight"
                    placeholder="Enter number day"
                    clearable
                  />
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
            :min="0"
            :max="20000000000"
            v-model="formTour.price"
            placeholder="Enter the price"
            clearable
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
            <span class="font-weight-600">Mô tả</span>
          </div>
        </template>
        <el-col :span="20">
          <n-editor v-model="formTour.descriptions" />
        </el-col>
      </el-form-item>
      <v-divider class="my-2" />
      <h3 class="my-3">Thông tin bổ sung</h3>
      <div v-if="route.query.id">
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
              <v-slide-group-item
                v-for="(item, index) in formTour.tourImages"
                :key="index"
              >
                <n-image :src="item" height="150" width="150" cover class="mx-2">
                  <div class="d-flex align-start justify-end fill-height">
                    <v-btn
                      rounded
                      variant="plain"
                      size="small"
                      icon="mdi-close"
                      @click="() => handleRemove(item)"
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
              <v-icon class="mr-1" icon="mdi-image-plus-outline" />
              <span class="font-weight-600">Thêm Ảnh</span>
            </div>
          </template>
          <n-upload-multi v-model="imgListUpdate" />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item prop="tourImages">
          <template #label>
            <div class="d-flex align-center">
              <v-icon class="mr-1" icon="mdi-image-multiple-outline" />
              <span class="font-weight-600">Hình ảnh</span>
            </div>
          </template>
          <n-upload-multi v-model="formTour.tourImages" />
        </el-form-item>
      </div>
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
          <n-editor v-model="formTour.note" />
        </el-col>
      </el-form-item>
    </el-form>
    <div v-if="route.query.id" class="d-flex">
      <v-btn
        class="text-none rounded-xl"
        prepend-icon="mdi-arrow-left"
        @click="() => handleRoute({ name: 'toursPartner' })"
      >
        Back
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        class="text-none rounded-xl"
        prepend-icon="mdi-archive-edit-outline"
        @click="() => updateTour(route.query.id as string, formRef)"
      >
        Update
      </v-btn>
    </div>
    <div v-else class="d-flex">
      <v-btn
        class="text-none rounded-xl"
        prepend-icon="mdi-broom"
        @click="() => resetForm(formRef)"
      >
        Clear
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        class="text-none rounded-xl"
        prepend-icon="mdi-send-variant-outline"
        @click="createTour(formRef)"
      >
        Create
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import NEditor from '@/components/NEditor.vue'
import NUploadPic from '@/components/NUploadPic.vue'
import NUploadMulti from '@/components/NUploadMulti.vue'
import { onMounted } from 'vue'
import { useCities } from '@/composables/useCities'
import { TRAFFICS } from '@/resources/mockData'
import { useRoute } from 'vue-router'
import { usePartnerTours } from '@/composables/partners/usePartnerTours'
import { handleRoute } from '@/helpers/loadingRoute'

const { allCities } = useCities()
const route = useRoute()
const {
  rules,
  formTour,
  formRef,
  imgListUpdate,
  getTourById,
  handleRemove,
  createTour,
  resetForm,
  updateTour
} = usePartnerTours()
onMounted(() => {
  route.query.id ? getTourById(route.query.id as string) : null
})
</script>
<style lang="scss" scoped>
</style>
<style>
.custom-upload .el-input__wrapper .el-input__inner {
  --el-input-inner-height: none !important;
  padding: 2px 0;
}
</style>