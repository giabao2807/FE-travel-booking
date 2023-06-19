<template>
  <v-container class="partner-tours-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Users Hiện Tại</h3>
    </div>
    <div class="d-flex align-center mx-0">
      <n-table :columns="columns" :data="users" :loading="loadingUser" @getNextPage="getUsers" />
    </div>
  </v-container>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import { useAdminUsers } from '@/composables/admins/useAdminUsers'
import NTable from '@/components/NTable.vue'
import NImage from '@/components/NImage.vue'
import { convertionType } from '@/helpers/convertion'
import { handleRoute } from '@/helpers/loadingRoute'


const {
  users,
  loadingUser,
  getUsers
} = useAdminUsers()
const { formatDate } = convertionType()
onMounted(() => {
  getUsers()
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
    key: 'avatar',
    title: 'Avatar',
    dataKey: 'avatar',
    width: 100,
    align: 'center',
    cellRenderer: ({ cellData: avatar }) => (
      <v-avatar>
        <NImage src={avatar || 'require("@/assets/img/avatar.png")'} />
      </v-avatar>
    )
  },
  {
    key: 'name',
    title: 'Name',
    dataKey: 'name',
    width: 200,
    headerClass: 'justify-center',
    cellRenderer: ({ rowData }) => (
      <span class='text-start'>{rowData.lastName + ' ' + rowData.firstName}</span>
    )
  },
  {
    key: 'birthday',
    title: 'Birthday',
    dataKey: 'birthday',
    width: 150,
    align: 'center',
    cellRenderer: ({ cellData: birthday }) => (
      <span>{formatDate(birthday)}</span>
    )
  },
  {
    key: 'phone',
    title: 'Phone',
    dataKey: 'phone',
    width: 150,
    align: 'center',
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: phone }) => (
      <span class={phone ? 'text-start' : 'text-center'}>{phone || '-'}</span>
    )
  },
  {
    key: 'address',
    title: 'Address',
    dataKey: 'address',
    width: 300,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: address }) => (
      <span class='text-start'>{address}</span>
    )
  },
  {
    key: 'isActive',
    title: 'Status',
    dataKey: 'isActive',
    width: 100,
    align: 'center',
    cellRenderer: ({ cellData: isActive }) => (
      <el-tag
        class="mx-1"
        effect="light"
        type={!isActive ? 'info' : ''}
        round
      >
        {isActive ? 'Active' : 'Inactive'}
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
        />
        <v-btn
          v-show={!rowData.isActive}
          variant="plain"
          color="success"
          icon="mdi-map-check"
        />
      </>
    ),
    width: 150,
    align: 'center'
  }
]

</script>
<style lang="scss" scoped></style>