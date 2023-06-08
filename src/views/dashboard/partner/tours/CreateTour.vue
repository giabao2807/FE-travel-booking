<template>
  <v-container class="create-tours-page">
    <h3 class="my-5">Create Tour Du Lịch</h3>
    <el-form :model="form" label-width="120px" label-position="left">
      <el-form-item label="Name Tour">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Quantity">
        <el-col :span="5">
          <el-input />
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="City">
            <el-select clearable placeholder="Select">
              <el-option
                v-for="item in [
                  {
                    value: 'Option1',
                    label: 'Option1',
                  }
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Start Location">
            <el-col :span="8">
              <el-select clearable placeholder="Select">
                <el-option
                  v-for="item in [
                    {
                      value: 'Option1',
                      label: 'Option1',
                    }
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <span class="ml-3 mr-2">Time</span>
            <el-col :span="8">
              <el-input model-value="Hằng ngày" disabled />
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="Traffics">
            <el-select clearable placeholder="Select">
              <el-option
                v-for="item in [
                  {
                    value: 'Option1',
                    label: 'Option1',
                  }
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Total Days">
            <el-col :span="5">
              <el-input />
            </el-col>
            <span class="mx-2">Ngày</span>
            <el-col :span="5">
              <el-input />
            </el-col>
            <span class="mx-2">Đêm</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Descriptions">
        <el-input v-model="form.desc" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea" />
      </el-form-item>
      <v-divider class="my-2" />
      <h3 class="my-3">Thông tin bổ sung</h3>
      <el-form-item label="More Images">
        <el-upload
          v-model="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          list-type="picture-card"
          :on-remove="handleRemove"
          :auto-upload="false"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="Schedule">
        <el-input type="textarea" />
      </el-form-item>
      <el-form-item label="Rules Tour">
        <el-input type="textarea" />
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
import type { UploadProps, UploadUserFile } from 'element-plus/es/components'
import { Plus } from '@element-plus/icons-vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const fileList = ref<UploadUserFile[]>([])
const onSubmit = () => {
  console.log('submit!')
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