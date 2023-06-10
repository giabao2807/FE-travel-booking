<template>
  <v-sheet class="partner-booking-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Booking Hiện Tại</h3>
    </div>
    <div class="d-flex align-center mx-0">
      <n-table
        :columns="columns"
        :data="tours"
        :loading="loadingTours"
        @getNextPage="getTours"
      />
    </div>
  </v-sheet>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import { usePartnerTours } from '@/composables/partners/usePartnerTours'
import NTable from '@/components/NTable.vue'
import { convertionType } from '@/helpers/convertion'


const { tours, loadingTours, getTours, deactivateTour, activateTour } = usePartnerTours()
const { formatCurrency } = convertionType()
onMounted(() => {
  getTours()
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
    width: 300,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: name }) => (
      <el-tooltip content={name}>
        <span class='text-start'>{name}</span>
      </el-tooltip>
    )
  },
  {
    key: 'totalDays',
    title: 'Total Days',
    dataKey: 'totalDays',
    width: 150,
    align: 'center'
  },
  {
    key: 'departure',
    title: 'Departure',
    dataKey: 'departure',
    headerClass: 'justify-center',
    width: 150
  },
  {
    key: 'groupSize',
    title: 'Quantity',
    dataKey: 'groupSize',
    width: 100,
    align: 'center'
  },
  {
    key: 'price',
    title: 'Price',
    dataKey: 'price',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: price }) => (
      <>
        { formatCurrency(price) }
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
          v-show={rowData.isActive}
          variant="plain"
          color="error"
          icon="mdi-delete-empty-outline"
          onClick={() => deactivateTour(rowData.id)}
        />
        <v-btn
          v-show={!rowData.isActive}
          variant="plain"
          color="success"
          icon="mdi-map-check"
          onClick={() => activateTour(rowData.id)}
        />
      </>
    ),
    width: 150,
    align: 'center'
  }
]

</script>
<style lang="scss" scoped>
.partner-booking-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  min-height: 45rem;
}
</style>