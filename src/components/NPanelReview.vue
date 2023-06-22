<template>
  <v-sheet class="ma-5 pa-5 rounded-xl">
    <h2 class="my-5 text-center">Reviews {{ propItems.titlePanel }}</h2>
    <v-divider class="mx-15" />
    <n-panel-loading :loading="!firstPageReview" />
    <n-panel-not-found
      v-if="propItems.firstPageReview?.results.length === 0"
      icon="mdi-timer-sand-empty"
      title="Không có reviews đánh giá!"
    />
    <v-slide-group
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-group-item
        v-for="review in propItems.firstPageReview?.results"
        :key="review?.id"
      >
        <v-card
          elevation="4"
          class="ma-5 pa-2 rounded-xl"
          width="400"
        >
          <v-card-title class="ml-n5">
            <v-row>
              <v-col>
                <v-list-item>
                  <template #prepend>
                    <v-avatar
                      color="grey-darken-3"
                      :image="review?.owner.avatar"
                    />
                  </template>

                  <v-list-item-title>
                    {{ review?.owner.name }}
                    <br>
                    {{ review?.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
              <v-col cols="3">
                <span class="text-caption text-medium-emphasis">
                  {{ new Date(review?.updatedAt).toLocaleDateString("en-GB").split("/").reverse().join("/") }}
                </span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-lazy
              :max-height="150"
              :options="{ 'threshold':0.5 }"
              class="overflow-y-auto"
              transition="fade-transition"
            >
              {{ review?.content }}
            </v-lazy>
          </v-card-text>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <div class="text-end">
      <v-dialog
        v-model="dialogReview"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
        width="65%"
      >
        <template #activator="{ props }">
          <v-btn
            v-if="(propItems.firstPageReview?.count || 0) > 12"
            rounded
            class="mx-5"
            color="primary"
            variant="outlined"
            v-bind="props"
            @click="() => getReview(propItems.id)"
          >
            Xem thêm ...
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            title="Tất cả reviews"
          >
            <v-btn
              icon
              @click="dialogReview = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-item>
            <n-panel-loading :loading="propItems.loadingReview" />
            <v-timeline v-if="!propItems.loadingReview" side="end">
              <v-timeline-item
                v-for="item in propItems.dataReview?.results"
                :key="item?.id"
              >
                <template #icon>
                  <v-avatar
                    color="grey-darken-3"
                    :image="item?.owner.avatar"
                  />
                  <v-tooltip
                    activator="parent"
                    :text="item?.owner.name"
                    location="top"
                  />
                </template>
                <v-list-item width="90%">
                  <v-row class="align-center justify-space-between">
                    <v-col cols="9">
                      <h4>{{ item?.title }}</h4>
                      <span class="text-caption text-medium-emphasis">{{ item?.updatedAt }}</span>
                    </v-col>
                    <v-col>
                      <v-rating
                        :model-value="item?.rate"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        class="mr-5"
                        size="small"
                      />
                    </v-col>
                  </v-row>
                  <v-list-item-subtitle class="my-1">{{ item?.content }}</v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
            </v-timeline>
          </v-card-item>
          <div class="text-center">
            <v-pagination
              v-if="propItems.dataReview"
              v-model="pageReview"
              :total-visible="5"
              :length="propItems.dataReview?.pageNumber"
              @update:modelValue="() => getReviewByPage({ id: propItems.id, page: pageReview })"
            />
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-sheet>
</template>
<script lang="ts" setup>
import NPanelLoading from './NPanelLoading.vue'
import NPanelNotFound from './NPanelNotFound.vue'
import { ref, defineEmits, withDefaults, defineProps } from 'vue'
import { IReview } from '@/libs/types/hotelType'

type Props = {
  id?: string,
  titlePanel?: string,
  firstPageReview?: IReview,
  loadingReview?: boolean,
  dataReview?: IReview,
}
const propItems = withDefaults(defineProps<Props>(), {
  id: '',
  titlePanel: '',
  firstPageReview: undefined,
  loadingReview: false,
  dataReview: undefined
})
const pageReview = ref<number>(1)
const dialogReview = ref<boolean>(false)
const emit = defineEmits(['getReviewByPage', 'getReview'])
const getReview = (id: string) => {
  pageReview.value = 1
  emit('getReview', { id: id })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReviewByPage = (params: any) => {
  emit('getReviewByPage', params)

}
</script>