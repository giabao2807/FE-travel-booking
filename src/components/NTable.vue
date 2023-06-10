<template>
  <el-table-v2
    :columns="columns"
    :data="props.data.results || []"
    :width="1200"
    :height="500"
    :footer-height="50"
    class="mx-0"
    fixed
  >
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
    <template #footer>
      <div class="d-flex justify-center" style="background-color: #ffffff;">
        <n-pagination
          v-if="props.data.results?.length < 1 && !props.loading"
          v-model="pageNumber"
          class="mx-5"
          :length="props.data.pageNumber"
          @update:modelValue="() => getNextPage({ page: pageNumber })"
        />
      </div>
    </template>
  </el-table-v2>
</template>
<script lang="ts" setup>
import NPagination from '@/components/NPagination.vue'
import { defineProps, withDefaults, ref, defineEmits } from 'vue'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'

type Props = {
  columns: any,
  loading?: boolean,
  data: any
}
const props = withDefaults(defineProps<Props>(), {
  columns: undefined,
  loading: false,
  data: []
})
const pageNumber = ref<number>(1)
const emit = defineEmits(['getNextPage'])
const getNextPage = (params: any) => {
  emit('getNextPage', params)

}
</script>
<style>
.el-table-v2__footer {
  width: 1200px;
  height: 100px !important;
}
</style>