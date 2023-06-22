<template>
  <v-container class="partner-hotel-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Coupons Hiện Tại</h3>
    </div>
    <div class="mx-0">
      <v-card color="#FFF" elevation="0" class="w-25 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <v-btn
            color="primary"
            class="text-none rounded-xl"
            variant="tonal"
            prepend-icon="mdi-archive-plus-outline"
            @click="handleRoute({ name: 'createAdminCoupon' })"
          >
            <strong>Tạo Coupon</strong>
          </v-btn>
        </v-card-text>
      </v-card>
      <n-table
        :columns="columns"
        :data="coupons"
        :loading="loadingCoupons"
        @getNextPage="getCoupons"
      />
    </div>
  </v-container>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import NTable from '@/components/NTable.vue'
import NBtnDialog from '@/components/NBtnDialog.vue'
import { convertionType } from '@/helpers/convertion'
import { useAdminCoupons } from '@/composables/admins/useAdminCoupon'
import { handleRoute } from '@/helpers/loadingRoute'

const {
  coupons,
  loadingCoupons,
  getCoupons,
  deleteCoupon
} = useAdminCoupons()
const { formatDate } = convertionType()
onMounted(() => {
  getCoupons()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    width: 100,
    cellRenderer: ({ cellData: discountPercent }) => (
      <>
        { discountPercent ? `${discountPercent}%` : '-' }
      </>
    )
  },
  {
    key: 'forAll',
    title: 'Scope',
    dataKey: 'forAll',
    width: 50,
    align: 'center',
    cellRenderer: ({ cellData: forAll }) =>(
      <el-tag
        class="mx-1"
        effect="light"
        type={!forAll ? 'info' : ''}
        round
      >
        { forAll ? 'All' : 'Part' }
      </el-tag>
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
        <NBtnDialog
          title='Delete Coupon'
          icon='mdi-delete-empty-outline'
          titleBtn='Delete'
          message='Are you sure want delete this coupon?'
          color="error"
          onActionDialog={() => deleteCoupon(rowData.id)}
        />
      </>
    ),
    width: 150,
    align: 'center'
  }
]

</script>
<style lang="scss" scoped>
</style>