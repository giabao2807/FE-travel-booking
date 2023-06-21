<!-- eslint-disable vue/no-static-inline-styles -->
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
          ref="formRef"
          :rules="rulesCoupon"
          :model="formCoupon"
        >
          <el-form-item prop="name">
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
          <el-form-item prop="rangeDate">
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
          <el-form-item prop="discountPercent">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-file-percent-outline" />
                <span class="font-weight-600">Giảm Giá</span>
              </div>
            </template>
            <el-col :span="15">
              <el-input :min="0" v-model="formCoupon.discountPercent">
                <template #append>%</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="description">
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
          <el-form-item prop="forAll" class="ml-2">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-compass-rose" />
                <span class="font-weight-600" style="width: 250px;">Áp Dụng Cho Toàn Hệ Thống</span>
              </div>
            </template>
            <el-switch
              v-model="formCoupon.forAll"
              style="margin-left: 120px"
            />
          </el-form-item>
          <el-form-item prop="partnerIds" class="ml-2">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-handshake-outline" />
                <span class="font-weight-600" style="width: 150px;">Danh Sách Partner</span>
              </div>
            </template>
            <el-select
              v-model="formCoupon.partnerIds"
              multiple
              filterable
              style="margin-left: 50px; width: 52%;"
              placeholder="Select partners"
            >
              <el-option
                v-for="item in partners"
                :key="item.id"
                :label="item.lastName +' '+ item.firstName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="d-flex mt-10">
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
            prepend-icon="mdi-ticket-percent-outline"
            @click="() => createCoupon(formRef)"
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
import { useAdminCoupons } from '@/composables/admins/useAdminCoupon'

const {
  formCoupon,
  formRef,
  partners,
  rulesCoupon,
  getPartners,
  resetForm,
  createCoupon
} = useAdminCoupons()
const pickerEndDisable = (time: any) => {
  var yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return time < yesterday
}
onMounted(() => {
  getPartners()
})
</script>