<template>
  <v-container color="transparent">
    <v-card elevation="0" color="transparent">
      <v-card-title>
        <h3 class="my-5">Create New Coupon</h3>
      </v-card-title>
      <v-card-text>
        <el-form
          label-width="120px"
          label-position="left"
        >
          <el-form-item prop="groupSize">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-rename" />
                <span class="font-weight-600">Tên Coupon</span>
              </div>
            </template>
            <el-col :span="15">
              <el-input v-model="formCoupon.name" />
            </el-col>
          </el-form-item>
          <el-form-item prop="groupSize">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-timeline-clock-outline" />
                <span class="font-weight-600">Thời Gian</span>
              </div>
            </template>
            <el-col :span="15">
              <el-date-picker
                v-model="formCoupon.rangeDate"
                type="daterange"
                value-format="YYYY-MM-DD"
                start-placeholder="Start date"
                end-placeholder="End date"
                :disabled-date="pickerEndDisable"
              />
            </el-col>
          </el-form-item>
          <el-form-item prop="groupSize">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-file-percent-outline" />
                <span class="font-weight-600">Giảm Giá</span>
              </div>
            </template>
            <el-col :span="15">
              <el-input v-model="formCoupon.discountPercent">
                <template #append>%</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="groupSize">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-alpha-d-box" />
                <span class="font-weight-600">Mô tả</span>
              </div>
            </template>
            <el-col :span="15">
              <el-input
                v-model="formCoupon.description"
                :autosize="{ minRows: 4, maxRows: 5 }"
                type="textarea"
                placeholder="Please input"
              />
            </el-col>
          </el-form-item>
          <v-divider />
          <h3 class="my-5">Danh Sách Approve Coupon</h3>
          <el-form-item prop="groupSize" class="ml-2">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-compass-rose" />
                <span class="font-weight-600" style="width: 150px;">Danh Sách Tours</span>
              </div>
            </template>
            <el-select
              v-model="formCoupon.tourIds"
              multiple
              style="margin-left: 50px; width: 52%;"
              placeholder="Select tours"
            >
              <el-option
                v-for="item in tours"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="groupSize" class="ml-2">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-home-city-outline" />
                <span class="font-weight-600" style="width: 150px;">Danh Sách Hotels</span>
              </div>
            </template>
            <el-select
              v-model="formCoupon.hotelIds"
              multiple
              style="margin-left: 50px; width: 52%;"
              placeholder="Select hotels"
            >
              <el-option
                v-for="item in hotels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="d-flex mt-10">
          <v-btn
            class="text-none rounded-xl"
            prepend-icon="mdi-broom"
          >
            Clear
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            class="text-none rounded-xl"
            prepend-icon="mdi-ticket-percent-outline"
            @click="() => createCoupon()"
          >
            Create
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePartnerCoupons } from '@/composables/partners/usePartnerCoupons'

const {
  formCoupon,
  tours,
  hotels,
  getTours,
  getHotels,
  createCoupon
} = usePartnerCoupons()
const pickerEndDisable = (time: any) => {
  var yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return time < yesterday
}
onMounted(() => {
  getTours()
  getHotels()
})
</script>