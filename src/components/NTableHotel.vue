<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <el-table-v2
    :columns="props.columns"
    :data="(props.expand ? data : props.data.results) || []"
    :expand-column-key="props.expandData"
    :width="1200"
    :height="500"
    class="mx-0"
    fixed
  >
    <template v-if="props.expand" #row="props">
      <Row v-bind="props" />
    </template>
    <template v-if="props.loading" #overlay>
      <div
        class="h-100 d-flex align-center justify-center"
      >
        <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
          <loading-icon />
        </el-icon>
      </div>
    </template>
    <template #empty>
      <div v-if="!props.loading" class="flex items-center justify-center h-100%">
        <el-empty />
      </div>
    </template>
    <template #footer>
      <div class="d-flex justify-center" style="background-color: #ffffff;">
        <n-pagination
          v-if="props.data.pageNumber > 1"
          v-model="pageNumber"
          class="mx-5"
          :compact="true"
          :length="props.data.pageNumber"
          @update:modelValue="() => getNextPage({ page: pageNumber })"
        />
      </div>
    </template>
  </el-table-v2>
</template>
<script lang="tsx" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import NPagination from '@/components/NPagination.vue'
import NBtnDialog from '@/components/NBtnDialog.vue'
import { defineProps, withDefaults, ref, defineEmits } from 'vue'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
import { watchEffect } from 'vue'
import { convertionType } from '@/helpers/convertion'
import { usePartnerHotels } from '@/composables/partners/usePartnerHotels'

type Props = {
  columns: any,
  loading?: boolean,
  data: any,
  expandData?: any,
  expand?: boolean,
  isAdmin?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  columns: undefined,
  loading: false,
  data: [],
  expandData: undefined,
  expand: false,
  isAdmin: false
})
const { formatCurrency } = convertionType()
const { dialogRoom, idHotel, getRoomById, deleteRoom } = usePartnerHotels()
const pageNumber = ref<number>(1)
const emit = defineEmits(['getNextPage', 'deleteRoom'])
const getNextPage = (params: any) => {
  emit('getNextPage', params)
}
const deleteRoomAndReload = async(id: string) => {
  await deleteRoom(id)
  emit('deleteRoom', pageNumber.value)
}
const data = ref()
const isAdminFlag = ref<boolean>()
const Row = ({ cells, rowData }) => {
  if (rowData.detail)
    return (
      <div class="ma-5 w-100">
        <v-row align="center" class="d-flex mx-5 mb-2 w-50">
          <h3>List Rooms</h3>
          {!isAdminFlag.value ?
            (<v-btn
              variant="plain"
              color="primary"
              size="small"
              icon="mdi-package-variant-closed-plus"
              onClick={() => {
                dialogRoom.value = true
                idHotel.value = rowData.idHotel
              }}
            />) : null}
        </v-row>
        <div class="overflow-y-auto" style="max-height: 200px">
          {rowData.detail.map((item: any, idx: number) => (
            <>
              <v-row class="pl-6 my-2" align="center" justify="center">
                <v-col class="py-0" cols="5">
                  <strong class="mr-5">{idx + 1}</strong>
                  <v-icon icon="mdi-bed-single-outline" class="mr-1" />
                  <strong>{item.name}</strong>
                </v-col>
                <v-col class="py-0" cols="2">
                  <span style="font-size: 12px;">Quantity: </span>
                  <strong>{item.quantity}</strong>
                </v-col>
                <v-col class="py-0" cols="2">
                  <span style="font-size: 12px;">Price Room: </span>
                  <strong>{formatCurrency(item.price)}</strong>
                </v-col>
                {!isAdminFlag.value ? (
                  <v-col class="py-0" cols="2">
                    <v-btn
                      variant="plain"
                      color="primary"
                      icon="mdi-comment-edit-outline"
                      onClick={() => {
                        dialogRoom.value = true
                        getRoomById(item.id)
                      }}
                    />
                    <NBtnDialog
                      title='Delete Room'
                      icon='mdi-delete-empty-outline'
                      titleBtn='Delete'
                      message='Are you sure want delete this room?'
                      color="error"
                      onActionDialog={() => deleteRoomAndReload(item.id)}
                    />
                  </v-col>
                ) : null}
              </v-row>
              <v-divider class="mx-15 my-2"/>
            </>
          ))}
        </div>
      </div>)
  return cells
}
Row.inheritAttrs = false
watchEffect(() => {
  if (props.expand) {
    isAdminFlag.value = props.isAdmin
    data.value = props.data.results?.map((data: any) => {
      data.children = [
        {
          id: `${data.id}-detail-content`,
          idHotel: data.id,
          detail: data.rooms
        }
      ]
      return data
    })
  }
}
)
</script>
<style scoped>
.el-table-v2__footer {
  width: 1200px;
  height: 100px !important;
  margin-bottom: -100px;
}

.el-table-v2__row-depth-0 {
  height: 50px;
}

.el-table-v2__cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>