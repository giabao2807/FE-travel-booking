<template>
  <v-container class="partner-booking-page">
    <div class="text-center my-5">
      <h3>Danh Sách Booking Tours Hiện Tại</h3>
    </div>
    <div class="d-flex align-center mx-0">
      <n-table
        :columns="columnsTour"
        :data="bookingTours"
        :loading="loadingTours"
        @getNextPage="getBookingTours"
      />
    </div>
    <div class="text-center mt-8 mb-5">
      <h3>Danh Sách Booking Hotels Hiện Tại</h3>
    </div>
    <div class="d-flex align-center mx-0">
      <n-table
        :columns="columnsHotel"
        :data="bookingHotels"
        :loading="loadingHotels"
        :estimated-row-height="50"
        :expand="true"
        :expand-column-key="columnsHotel[0].key"
        @getNextPage="getBookingTours"
      />
    </div>
  </v-container>
</template>
<script lang="tsx" setup>
import { onMounted, ref } from 'vue'
import type { Column } from 'element-plus'
import { usePartnerBooking } from '@/composables/partners/usePartnerBooking'
import NTable from '@/components/NTable.vue'
import { convertionType } from '@/helpers/convertion'


const {
  bookingTours,
  loadingTours,
  bookingHotels,
  loadingHotels,
  getBookingTours,
  getBookingHotels
} = usePartnerBooking()
const { formatCurrency, formatDate, getIconStatus, checkColorTag } = convertionType()
onMounted(() => {
  getBookingTours()
  getBookingHotels()
})

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
    width: 150,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <el-tooltip content={rowData.customer.firstName}>
        <span class='text-start'>{rowData.customer.firstName}</span>
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
    width: 150,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <el-tooltip content={rowData.customer.firstName}>
        <span class='text-start'>{rowData.customer.firstName}</span>
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