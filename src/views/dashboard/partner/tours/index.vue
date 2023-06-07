<template>
  <v-sheet class="d-flex justify-center">
    <el-table-v2
      :columns="columns"
      :data="data"
      :width="700"
      :height="400"
      :footer-height="50"
      fixed
    >
      <template #empty>
        <div class="flex items-center justify-center h-100%">
          <el-empty />
        </div>
      </template>
      <template #footer>
        <div class="d-flex justify-center" style="background-color: #ffffff;">
          <el-pagination
            class="ma-2"
            layout="prev, pager, next"
            :total="20"
          />
        </div>
      </template>
    </el-table-v2>
    <el-radio-group class="eep" v-model="radio1">
      <el-radio label="1" size="large" border>Option A</el-radio>
      <el-radio label="2" size="large" border>Option B</el-radio>
    </el-radio-group>
  </v-sheet>
</template>
<script lang="tsx" setup>
import { ref, onMounted, unref } from 'vue'
import type { FunctionalComponent } from 'vue'
import type { CheckboxValueType, Column } from 'element-plus'
import { ElButton } from 'element-plus'
import { usePartnerTours } from '@/composables/partners/usePartnerTours'
const radio1 = ref()
const { tours, getTours } = usePartnerTours()
onMounted(() => {
  getTours()
})

let id = 0

const dataGenerator = () => ({
  id: `random-id-${++id}`,
  name: 'Tom',
  date: '2020-10-1'
})

const columns: Column<any>[] = [
  {
    key: 'name',
    title: 'Name',
    dataKey: 'name',
    width: 150,
    align: 'center'
  },
  {
    key: 'operations',
    title: 'Operations',
    cellRenderer: () => (
      <>
        <el-button type="primary" plain>Primary</el-button>
        <v-btn size="small" type="danger">
          Delete
        </v-btn>
      </>
    ),
    width: 150,
    align: 'center'
  }
]

const data = ref(Array.from({ length: 200 }).map(dataGenerator))
</script>
<style scoped>
.eep.el-radio__input.is-checked + .el-radio__label {
   color: #000000;
}
</style>