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
          v-if="props.data.results?.length < 1 && !props.loading"
          v-model="pageNumber" class="mx-5"
          :length="props.data.pageNumber"
          @update:modelValue="() => getNextPage({ page: pageNumber })"
        />
      </div>
    </template>
  </el-table-v2>
</template>
<script lang="tsx" setup>
import NPagination from '@/components/NPagination.vue'
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
  expand?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  columns: undefined,
  loading: false,
  data: [],
  expandData: undefined,
  expand: false
})
const { formatCurrency } = convertionType()
const { dialogEditRoom } = usePartnerHotels()
const pageNumber = ref<number>(1)
const emit = defineEmits(['getNextPage'])
const getNextPage = (params: any) => {
  emit('getNextPage', params)

}
const data = ref()

const Row = ({ cells, rowData }) => {
  if (rowData.detail)
    return (<div class="ma-5 w-100">
      <h3>List rooms</h3>
      <div class="overflow-y-auto" style="max-height: 200px">
        {rowData.detail.map((item: any) => (
          <v-row class="pl-6" align="center" justify="center">
            <v-col cols="5">
              <v-icon icon="mdi-bed-single-outline" class="mr-1" />
              <strong>{item.name}</strong>
            </v-col>
            <v-col cols="2">
              <span>Quantity: <strong>{item.quantity}</strong></span>
            </v-col>
            <v-col cols="2">
              <span>Price Room: <strong>{formatCurrency(item.price)}</strong></span>
            </v-col>
            <v-col cols="2">
              <v-btn
                variant="plain"
                color="primary"
                icon="mdi-comment-edit-outline"
                onClick={() => dialogEditRoom.value = true}
              />
            </v-col>
          </v-row>
        ))}
      </div>
    </div>)
  return cells
}
Row.inheritAttrs = false
watchEffect(() => {
  if (props.expand) {
    data.value = props.data.results?.map((data: any) => {
      data.children = [
        {
          id: `${data.id}-detail-content`,
          detail: data.rooms
        }
      ]
      return data
    })
  }
}
)
</script>
<style>
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