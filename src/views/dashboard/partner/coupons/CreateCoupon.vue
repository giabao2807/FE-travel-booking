<template>
  <v-sheet color="transparent">
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
              <el-input />
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
                type="daterange"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
            </el-col>
          </el-form-item>
          <el-form-item prop="groupSize">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-file-percent-outline" />
                <span class="font-weight-600">Giảm giá</span>
              </div>
            </template>
            <el-col :span="15">
              <el-input>
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
                <span class="font-weight-600" style="width: 150px;">Danh sách tours</span>
              </div>
            </template>
            <el-cascader clearable style="margin-left: 50px; width: 52%;" />
          </el-form-item>
          <el-form-item prop="groupSize" class="ml-2">
            <template #label>
              <div class="d-flex align-center">
                <v-icon class="mr-1" icon="mdi-home-city-outline" />
                <span class="font-weight-600" style="width: 150px;">Danh sách hotels</span>
              </div>
            </template>
            <el-cascader clearable style="margin-left: 50px; width: 52%;" />
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
            prepend-icon="mdi-send-variant-outline"
          >
            Create
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>