<template>
  <v-sheet class="partner-tours-page">
    <div class="d-flex align-center mx-0">
      <el-table-v2
        :columns="columns"
        :data="tours?.results || []"
        :width="1200"
        :height="500"
        :footer-height="50"
        class="mx-0"
        fixed
      >
        <template #empty>
          <div v-if="!loadingTours" class="flex items-center justify-center h-100%">
            <el-empty />
          </div>
          <div
            v-if="loadingTours"
            class="text-center mt-10"
          >
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
              <loading-icon />
            </el-icon>
          </div>
        </template>
        <template #footer>
          <div class="d-flex justify-center" style="background-color: #ffffff;">
            <el-pagination
              class="ma-2"
              layout="prev, pager, next"
              :total="tours?.count"
            />
          </div>
        </template>
      </el-table-v2>
    </div>
  </v-sheet>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import { usePartnerTours } from '@/composables/partners/usePartnerTours'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
import { EditPen, DeleteFilled } from '@element-plus/icons-vue'
import { convertionType } from '@/helpers/convertion'


const { tours, loadingTours, getTours, deactivateTour } = usePartnerTours()
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
    width: 250,
    align: 'center'
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
          variant="plain"
          color="error"
          icon="mdi-delete-empty-outline"
          onClick={() => deactivateTour(rowData.id)}
        />
      </>
    ),
    width: 150,
    align: 'center'
  }
]

</script>
<style lang="scss" scoped>
.partner-tours-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  min-height: 45rem;
}
</style>
<style>
.el-table-v2__footer {
  width: 1200px;
}
</style>