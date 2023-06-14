<template>
  <div>
    <el-table-v2
      :columns="columns"
      :data="(props.expand ? data : props.data.results) || []"
      :expand-column-key="expandData"
      :width="1200"
      :height="500"
      class="mx-0"
      fixed
    >
      <template v-if="props.expand" #row="props">
        <Row v-bind="props" />
      </template>
      <template #empty>
        <div v-if="!props.loading" class="flex items-center justify-center h-100%">
          <el-empty />
        </div>
        <div
          v-if="props.loading"
          class="text-center mt-10"
        >
          <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
            <loading-icon />
          </el-icon>
        </div>
      </template>
    </el-table-v2>
    <div class="d-flex justify-center" style="background-color: #ffffff;">
      <n-pagination
        v-if="props.data.pageNumber > 1"
        v-model="pageNumber"
        class="mx-5"
        :length="props.data.pageNumber"
        @update:modelValue="() => getNextPage({ page: pageNumber })"
      />
    </div>
  </div>
</template>
<script lang="tsx" setup>
import NPagination from '@/components/NPagination.vue'
import { defineProps, withDefaults, ref, defineEmits } from 'vue'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
import { watchEffect } from 'vue'

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
const pageNumber = ref<number>(1)
const emit = defineEmits(['getNextPage'])
const getNextPage = (params: any) => {
  emit('getNextPage', params)

}
const data = ref()

const Row = ({ cells, rowData }) => {
  if (rowData.detail)
    return (<div class="ma-5">
      {rowData.detail.map((item: any) => (
        <div class="d-flex px-6">
          <v-icon icon="mdi-bed-single-outline" class="mr-1" />
          <strong>{ item.roomName } x { item.quantity }</strong>
        </div>
      ))}
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
          detail: data.bookingItems
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