<template>
  <v-container class="partner-hotel-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Hotels Hiện Tại</h3>
    </div>
    <div class="mx-0">
      <v-card color="#FFF" elevation="0" class="w-50 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <v-row align="center">
            <v-col cols="5">
              <v-btn
                color="primary"
                class="text-none rounded-xl"
                variant="tonal"
                prepend-icon="mdi-home-plus"
                @click="handleRoute({ name: 'createHotel' })"
              >
                <strong>Tạo Hotel</strong>
              </v-btn>
            </v-col>
            <v-col>
              <v-text-field
                v-model="filterHotel.name"
                color="primary"
                prepend-inner-icon="mdi-home-search-outline"
                variant="outlined"
                density="compact"
                placeholder="Please input hotel name"
                hide-details
                @keydown.enter="() => getHotels({ ...filterHotel })"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <n-table-hotel
        :columns="columns"
        :data="hotels"
        :loading="loadingHotels"
        :estimated-row-height="50"
        :expand="true"
        :expand-column-key="columns[0].key"
        @getNextPage="event => getHotels({ ...filterHotel, ...event })"
        @deleteRoom="async(event: number) => {
          getHotels({ ...filterHotel, page: event })
        }"
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
import NBtnDialog from '@/components/NBtnDialog.vue'

const {
  hotels,
  loadingHotels,
  dialogUpdate,
  dialogRoom,
  filterHotel,
  getHotels,
  activateHotel,
  deactivateHotel,
  getHotelById
} = usePartnerHotels()
const { formatCurrency } = convertionType()
onMounted(() => {
  getHotels()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div v-show={rowData.isActive}>
          <NBtnDialog
            title='Deactivate Hotel'
            icon='mdi-delete-empty-outline'
            titleBtn='Deactivate'
            message='Are you sure want deactivate this hotel?'
            color="error"
            onActionDialog={() => deactivateHotel(rowData.id)}
          />
        </div>
        <div v-show={!rowData.isActive}>
          <NBtnDialog
            title='Active Hotel'
            icon='mdi-home-plus-outline'
            titleBtn='Active'
            message='Are you sure want active this hotel?'
            color="success"
            onActionDialog={() => activateHotel(rowData.id)}
          />
        </div>
      </>
    ),
    width: 150,
    align: 'center'
  }
]
</script>
<style lang="scss" scoped>
</style>