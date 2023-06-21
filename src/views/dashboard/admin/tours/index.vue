<template>
  <v-container class="partner-tours-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Tours Hiện Tại</h3>
    </div>
    <div class="mx-0">
      <v-card color="#FFF" elevation="0" class="w-35 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <v-text-field
            v-model="filterTour.name"
            color="primary"
            prepend-icon="mdi-map-search"
            variant="outlined"
            density="compact"
            placeholder="Please input tour name"
            hide-details
            @keydown.enter="() => getTours({ ...filterTour })"
          />
        </v-card-text>
      </v-card>
      <n-table
        :columns="columns"
        :data="tours"
        :loading="loadingTours"
        @getNextPage="event => getTours({ ...filterTour, ...event })"
      />
    </div>
  </v-container>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import { usePartnerTours } from '@/composables/partners/usePartnerTours'
import NTable from '@/components/NTable.vue'
import { convertionType } from '@/helpers/convertion'


const { tours, loadingTours, filterTour, getTours, deactivateTour, activateTour } = usePartnerTours()
const { formatCurrency } = convertionType()
onMounted(() => {
  getTours()
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
    width: 300,
    headerClass: 'justify-center'
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

</style>