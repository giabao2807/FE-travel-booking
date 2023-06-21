<template>
  <v-container class="partner-hotel-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Hotels Hiện Tại</h3>
    </div>
    <div class="mx-0">
      <v-card color="#FFF" elevation="0" class="w-25 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <v-btn
            color="primary"
            class="text-none rounded-xl"
            variant="tonal"
            prepend-icon="mdi-home-plus"
            @click="handleRoute({ name: 'createHotel' })"
          >
            <strong>Tạo Hotel</strong>
          </v-btn>
        </v-card-text>
      </v-card>
      <n-table-hotel
        :columns="columns"
        :data="hotels"
        :loading="loadingHotels"
        :estimated-row-height="50"
        :expand="true"
        :expand-column-key="columns[0].key"
        @getNextPage="getHotels"
      />
    </div>
    <n-dialog-update-hotel v-model="dialogUpdate" />
    <n-dialog-partner-room v-model="dialogRoom" />
  </v-container>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import NTableHotel from '@/components/NTableHotel.vue'
import NDialogUpdateHotel from '@/components/NDialogUpdateHotel.vue'
import NDialogPartnerRoom from '@/components/NDialogPartnerRoom.vue'
import { convertionType } from '@/helpers/convertion'
import { usePartnerHotels } from '@/composables/partners/usePartnerHotels'
import { handleRoute } from '@/helpers/loadingRoute'

const {
  hotels,
  loadingHotels,
  dialogUpdate,
  dialogRoom,
  getHotels,
  activateHotel,
  deactivateHotel,
  getHotelById
} = usePartnerHotels()
const { formatCurrency } = convertionType()
onMounted(() => {
  getHotels()
})

const columns: Column<any>[] = [
  {
    key: 'coverPicture',
    title: 'Picture',
    dataKey: 'coverPicture',
    width: 150,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: coverPicture }) => (
      <v-img width={150} src={coverPicture} cover/>
    )
  },
  {
    key: 'name',
    title: 'Name',
    dataKey: 'name',
    width: 250,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: name }) => (
      <el-tooltip content={name}>
        <span class='text-start'>{name}</span>
      </el-tooltip>
    )
  },
  {
    key: 'address',
    title: 'Address',
    dataKey: 'address',
    width: 200,
    align: 'center'
  },
  {
    key: 'minPrice',
    title: 'Min Price',
    dataKey: 'minPrice',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: minPrice }) => (
      <>
        { formatCurrency(minPrice) }
      </>
    )
  },
  {
    key: 'maxPrice',
    title: 'Max Price',
    dataKey: 'maxPrice',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: maxPrice }) => (
      <>
        { formatCurrency(maxPrice) }
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
          onClick={() => {
            dialogUpdate.value = true
            getHotelById(rowData.id)
          }}
        />
        <v-btn
          v-show={rowData.isActive}
          variant="plain"
          color="error"
          icon="mdi-delete-empty-outline"
          onClick={() => deactivateHotel(rowData.id)}
        />
        <v-btn
          v-show={!rowData.isActive}
          variant="plain"
          color="success"
          icon="mdi-home-plus-outline"
          onClick={() => activateHotel(rowData.id)}
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