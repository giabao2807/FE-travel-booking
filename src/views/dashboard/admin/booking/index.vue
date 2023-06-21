<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-container class="admin-booking-page">
    <div class="text-center my-5">
      <h3>Danh Sách Booking Tours Hiện Tại</h3>
    </div>
    <div class="my-2">
      <v-card color="#FFF" elevation="0" class="w-50 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <div class="d-flex">
            <v-text-field
              v-if="selectFilterTour === 'Name'"
              v-model="filterBookingTour.name"
              color="primary"
              prepend-inner-icon="mdi-map-search"
              variant="outlined"
              density="compact"
              placeholder="Please input tour name"
              style="width: 80%;"
              hide-details
              clearable
              @keydown.enter="() => getBookingTours({ ...filterBookingTour })"
            />
            <v-select
              v-else
              v-model="filterBookingTour.status"
              :items="STATUS_ICON"
              item-title="name"
              item-value="name"
              color="primary"
              prepend-inner-icon="mdi-map-search"
              variant="outlined"
              density="compact"
              placeholder="Please input status"
              style="width: 80%;"
              hide-details
              clearable
              @update:model-value="() => getBookingTours({ ...filterBookingTour })"
            />
            <v-select
              v-model="selectFilterTour"
              :items="['Name', 'Status']"
              variant="outlined"
              class="mx-2"
              color="primary"
              density="compact"
              hide-details
            />
          </div>
        </v-card-text>
      </v-card>
      <n-table
        :columns="columnsTour"
        :data="bookingTours"
        :loading="loadingTours"
        @getNextPage="event => getBookingTours({ ...filterBookingTour, ...event })"
      />
    </div>
    <div class="text-center mb-5" style="margin-top: 10rem;">
      <h3>Danh Sách Booking Hotels Hiện Tại</h3>
    </div>
    <div class="mb-15">
      <v-card color="#FFF" elevation="0" class="w-50 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <div class="d-flex">
            <v-text-field
              v-if="selectFilterHotel === 'Name'"
              v-model="filterBookingHotel.name"
              color="primary"
              prepend-inner-icon="mdi-home-search-outline"
              variant="outlined"
              density="compact"
              placeholder="Please input hotel name"
              style="width: 80%;"
              hide-details
              clearable
              @keydown.enter="() => getBookingHotels({ ...filterBookingHotel })"
            />
            <v-select
              v-else
              v-model="filterBookingHotel.status"
              :items="STATUS_ICON"
              item-title="name"
              item-value="name"
              color="primary"
              prepend-inner-icon="mdi-home-search-outline"
              variant="outlined"
              density="compact"
              placeholder="Please input status"
              style="width: 80%;"
              clearable
              hide-details
              @update:model-value="() => getBookingHotels({ ...filterBookingHotel })"
            />
            <v-select
              v-model="selectFilterHotel"
              :items="['Name', 'Status']"
              variant="outlined"
              class="mx-2"
              color="primary"
              density="compact"
              hide-details
            />
          </div>
        </v-card-text>
      </v-card>
      <n-table
        :columns="columnsHotel"
        :data="bookingHotels"
        :loading="loadingHotels"
        :estimated-row-height="50"
        :expand="true"
        :expand-column-key="columnsHotel[0].key"
        @getNextPage="event => getBookingHotels({ ...filterBookingHotel, ...event })"
      />
    </div>
  </v-container>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import { usePartnerBooking } from '@/composables/partners/usePartnerBooking'
import NTable from '@/components/NTable.vue'
import { convertionType } from '@/helpers/convertion'
import { STATUS_ICON } from '@/resources/mockData'

const {
  bookingTours,
  loadingTours,
  bookingHotels,
  loadingHotels,
  filterBookingTour,
  filterBookingHotel,
  selectFilterTour,
  selectFilterHotel,
  getBookingTours,
  getBookingHotels
} = usePartnerBooking()
const { formatCurrency, formatDate, getIconStatus, checkColorTag } = convertionType()
onMounted(() => {
  getBookingTours()
  getBookingHotels()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnsTour: Column<any>[] = [
  {
    key: 'column-n-1',
    title: 'No.',
    width: 50,
    cellRenderer: ({ rowIndex }) => (<>{rowIndex + 1}</>),
    align: 'center'
  },
  {
    key: 'avatar',
    title: 'Avatar User',
    width: 100,
    align: 'center',
    cellRenderer: ({ rowData }) => (
      <v-avatar image={rowData.customer.avatar}/>
    )
  },
  {
    key: 'nameUser',
    title: 'Name User',
    width: 200,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <el-tooltip content={rowData.customer.lastName + ' ' + rowData.customer.firstName}>
        <span class='text-start'>
          {rowData.customer.lastName + ' ' + rowData.customer.firstName}
        </span>
      </el-tooltip>
    )
  },
  {
    key: 'name',
    title: 'Name Tour',
    width: 300,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <el-tooltip content={rowData.tour.name}>
        <span class='text-start'>{rowData.tour.name}</span>
      </el-tooltip>
    )
  },
  {
    key: 'quantity',
    title: 'Quantity',
    width: 100,
    align: 'center',
    cellRenderer: ({ rowData }) => (
      <span class='text-start'>{rowData.bookingItems.quantity}</span>
    )
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataKey: 'createdAt',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: createdAt }) => (
      <span class='text-start'>{formatDate(createdAt)}</span>
    )
  },
  {
    key: 'note',
    title: 'Note',
    dataKey: 'note',
    width: 200,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: note }) => (
      <el-tooltip content={note}>
        <span class='text-start'>{note}</span>
      </el-tooltip>
    )
  },
  {
    key: 'totalPrice',
    title: 'Price',
    dataKey: 'totalPrice',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: totalPrice }) => (
      <>
        { formatCurrency(totalPrice) }
      </>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataKey: 'status',
    width: 150,
    align: 'center',
    cellRenderer: ({ cellData: status }) =>(
      <v-chip color={checkColorTag(status)} size="small">
        <h5>
          <v-icon icon={getIconStatus(status)} />
          <span class="mx-1 font-weight-800">{ status }</span>
        </h5>
      </v-chip>
    )
  }
]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnsHotel: Column<any>[] = [
  {
    key: 'avatar',
    title: 'Avatar User',
    width: 100,
    align: 'center',
    cellRenderer: ({ rowData }) => (
      <v-avatar image={rowData.customer.avatar}/>
    )
  },
  {
    key: 'nameUser',
    title: 'Name User',
    width: 200,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <el-tooltip content={rowData.customer.lastName + ' ' + rowData.customer.firstName}>
        <span class='text-start'>
          {rowData.customer.lastName + ' ' + rowData.customer.firstName}
        </span>
      </el-tooltip>
    )
  },
  {
    key: 'name',
    title: 'Name Hotel',
    width: 250,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <el-tooltip content={rowData.hotel.name}>
        <span class='text-start'>{rowData.hotel.name}</span>
      </el-tooltip>
    )
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataKey: 'createdAt',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: createdAt }) => (
      <span class='text-start'>{formatDate(createdAt)}</span>
    )
  },
  {
    key: 'note',
    title: 'Note',
    dataKey: 'note',
    width: 200,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: note }) => (
      <el-tooltip content={note}>
        <span class='text-start'>{note}</span>
      </el-tooltip>
    )
  },
  {
    key: 'totalPrice',
    title: 'Price',
    dataKey: 'totalPrice',
    align: 'center',
    width: 150,
    cellRenderer: ({ cellData: totalPrice }) => (
      <>
        { formatCurrency(totalPrice) }
      </>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataKey: 'status',
    width: 150,
    align: 'center',
    cellRenderer: ({ cellData: status }) =>(
      <v-chip color={checkColorTag(status)} size="small">
        <h5>
          <v-icon icon={getIconStatus(status)} />
          <span class="mx-1 font-weight-800">{ status }</span>
        </h5>
      </v-chip>
    )
  }
]

</script>
<style scoped>
.admin-booking-page {
  min-height: 60rem
}
</style>