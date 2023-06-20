<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-container class="partner-tours-page">
    <div class="text-center mb-5">
      <h3>Danh Sách Users Hiện Tại</h3>
    </div>
    <div class="my-2">
      <v-card color="#FFF" elevation="0" class="w-75 rounded-0 rounded-t-xl pa-0">
        <v-card-text>
          <v-row align="center">
            <v-col cols="5">
              <v-btn
                color="primary"
                class="text-none rounded-xl"
                variant="tonal"
                prepend-icon="mdi-account-multiple-plus-outline"
                @click="() => dialogCreate = true"
              >
                Tạo User
              </v-btn>
            </v-col>
            <v-col>
              <div class="d-flex">
                <v-text-field
                  v-if="selectFilter === 'Name'"
                  v-model="filtersUser.name"
                  color="primary"
                  prepend-inner-icon="mdi-account-search-outline"
                  variant="outlined"
                  density="compact"
                  placeholder="Please input name"
                  style="width: 80%;"
                  hide-details
                  @keydown.enter="() => getUsers({ ...filtersUser })"
                />
                <v-select
                  v-else
                  v-model="filtersUser.role"
                  :items="ROLE_DATA"
                  item-title="name"
                  item-value="id"
                  color="primary"
                  prepend-inner-icon="mdi-account-search-outline"
                  variant="outlined"
                  density="compact"
                  placeholder="Please input role"
                  style="width: 80%;"
                  hide-details
                  @update:model-value="() => getUsers({ ...filtersUser })"
                />
                <v-select
                  v-model="selectFilter"
                  :items="['Name', 'Role']"
                  variant="outlined"
                  class="mx-2"
                  color="primary"
                  density="compact"
                  hide-details
                />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <n-table
        :columns="columns"
        :data="users"
        :loading="loadingUser"
        @getNextPage="event => getUsers({ ...filtersUser, ...event })"
      />
    </div>
    <n-dialog-create-user v-model="dialogCreate" />
  </v-container>
</template>
<script lang="tsx" setup>
import NTable from '@/components/NTable.vue'
import NImage from '@/components/NImage.vue'
import NDialogCreateUser from '@/components/NDialogCreateUser.vue'
import { onMounted } from 'vue'
import type { Column } from 'element-plus'
import { useAdminUsers } from '@/composables/admins/useAdminUsers'
import { convertionType } from '@/helpers/convertion'
import avatarImage from '@/assets/img/avatar.png'

const {
  users,
  loadingUser,
  selectFilter,
  filtersUser,
  dialogCreate,
  getUsers
} = useAdminUsers()
const { formatDate } = convertionType()
const ROLE_DATA = [
  { name: 'Customer', id: '45905ee5-1315-44cf-8f82-35cb9d838b75', color: 'info' },
  { name: 'Partner', id: '246c670e-d51b-4d7d-aa5f-77d42f68a91d', color: 'warning' },
  { name: 'Admin', id: '7a8f585d-ccb0-49ad-a116-53bd0f550d59', color: 'danger' }
]
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
        <NImage src={avatar || avatarImage} />
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
    width: 100,
    align: 'center',
    cellRenderer: ({ cellData: birthday }) => (
      <span>{birthday ? formatDate(birthday) : '-'}</span>
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
    width: 250,
    headerClass: 'justify-center',
    cellRenderer: ({ cellData: address }) => (
      <span class='text-start'>{address}</span>
    )
  },
  {
    key: 'role',
    title: 'Role',
    dataKey: 'role',
    width: 100,
    align: 'center',
    cellRenderer: ({ cellData: role }) => (
      <el-tag
        class="mx-1"
        effect="light"
        type={role?.name === 'Admin' ? 'danger' : role?.name === 'Customer' ? 'info' : 'warning'}
        round
      >
        { role.name }
      </el-tag>
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