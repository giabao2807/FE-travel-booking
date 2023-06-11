<template>
  <v-sheet class="partner-hotel-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Coupons Hiện Tại</h3>
    </div>
    <div class="d-flex align-center mx-0">
      <n-table
        :columns="columns"
        :data="coupons"
        :loading="loadingCoupons"
        @getNextPage="getCoupons"
      />
    </div>
  </v-sheet>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import NTable from '@/components/NTable.vue'
import { convertionType } from '@/helpers/convertion'
import { usePartnerCoupons } from '@/composables/partners/usePartnerCoupons'

const {
  coupons,
  loadingCoupons,
  getCoupons
} = usePartnerCoupons()
const { formatDate } = convertionType()
onMounted(() => {
  getCoupons()
})

const columns: Column<any>[] = [
  {
    key: 'column-n-1',
    title: 'No.',
    width: 50,
    cellRenderer: ({ rowIndex }) => (<>{rowIndex + 1}</>),
    align: 'center'
  },
  {
    key: 'name',
    title: 'Name',
    dataKey: 'name',
    width: 200,
    headerClass: 'justify-center'
  },
  {
    key: 'description',
    title: 'Description',
    dataKey: 'description',
    width: 250,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: description }) => (
      <el-tooltip content={description}>
        <span class='text-start'>{description}</span>
      </el-tooltip>
    )
  },
  {
    key: 'startDate',
    title: 'Start Date',
    dataKey: 'startDate',
    width: 150,
    align: 'center',
    cellRenderer: ({ cellData: startDate }) => (
      <>
        { formatDate(startDate) }
      </>
    )
  },
  {
    key: 'endDate',
    title: 'End Date',
    dataKey: 'endDate',
    width: 150,
    align: 'center',
    cellRenderer: ({ cellData: endDate }) => (
      <>
        { formatDate(endDate) }
      </>
    )
  },
  {
    key: 'discountPercent',
    title: 'Discount',
    dataKey: 'discountPercent',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: discountPercent }) => (
      <>
        { discountPercent }%
      </>
    )
  },
  {
    key: 'isActive',
    title: 'Status',
    dataKey: 'isActive',
    width: 100,
    align: 'center',
    cellRenderer: ({ cellData: isActive }) =>(
      <el-tag
        class="mx-1"
        effect="light"
        type={!isActive ? 'info' : ''}
        round
      >
        { isActive ? 'Active' : 'Inactive' }
      </el-tag>
    )
  },
  {
    key: 'operations',
    title: 'Operations',
    cellRenderer: ({ rowData }) => (
      <>
        <v-btn
          variant="plain"
          color="primary"
          icon="mdi-circle-edit-outline"
          onClick={() => console.log('run run', rowData.id) }
        />
        <v-btn
          variant="plain"
          color="error"
          icon="mdi-delete-empty-outline"
        />
        {/* <v-btn
                  v-show={!rowData.isActive}
                  variant="plain"
                  color="success"
                  icon="mdi-map-check"
                /> */}
      </>
    ),
    width: 150,
    align: 'center'
  }
]

</script>
        <style lang="scss" scoped>
        </style>