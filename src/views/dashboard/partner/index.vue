<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-container class="partner-page">
    <v-container fluid>
      <v-row>
        <v-col
          v-for="item in staticBox"
          :key="item?.key"
        >
          <v-card elevation="3" class="card" :style="{ boxShadow: item?.color }">
            <div class="content d-flex align-center justify-center">
              <h1 class="font-palanquin" :style="{ color: item?.color }">{{ item?.value }}</h1>
            </div>
            <div class="info">
              <span :style="{ color: item?.color }">
                <v-icon :icon="item?.icon" size="small" class="mr-1" />
                {{ item.title.toUpperCase() }}
              </span>
              <br>
              <v-chip
                class="ma-2"
                :color="item?.color"
                variant="outlined"
                size="x-small"
              >
                <p style="font-size: 0.5em;">{{ item?.rateString }}</p>
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-card height="450" elevation="1" class="rounded-xl">
            <v-card-title>
              <h4 class="mx-3 mt-3"><v-icon icon="mdi-star-check-outline" />The Potential Customers</h4>
            </v-card-title>
            <v-card-text class="overflow-y-auto" style="height: 450px;">
              <v-list
                lines="three"
              >
                <v-list-item
                  v-for="item in potentailCustomers"
                  :key="item?.id"
                  :prepend-avatar="item?.avatar"
                  :title="item?.lastName + ' ' + item?.firstName"
                  :subtitle="item?.email"
                >
                  <v-divider class="my-2" />
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card height="450" elevation="1" class="rounded-xl">
            <v-card-title class="d-flex align-center">
              <h4 class="ma-3">
                <v-icon icon="mdi-archive-cog-outline" />
                Statistics by day
              </h4>
              <el-date-picker
                v-model="dayRevenue"
                class="ma-3"
                type="daterange"
                start-placeholder="Start date"
                :clearable="false"
                end-placeholder="End date"
                value-format="YYYY-MM-DD"
                @update:model-value="() => getRevenue(
                  {
                    startDate: dayRevenue[0],
                    endDate: dayRevenue[1]
                  }
                )"
              />
            </v-card-title>
            <v-card-text>
              <n-chart
                :width="300"
                class="mt-5"
                :chart-data="revenue?.details"
                :chart-options="options"
                y-append="M"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col>
          <n-linear-chart
            :dataLinear="revenue?.totalTour"
            :total="revenue?.totalTour+revenue?.totalHotel"
            :dateFrom="formatDate(dayRevenue[0])"
            :dateTo="formatDate(dayRevenue[1])"
            color="rgb(255,163,158)"
            title="Total Tours"
            icon="mdi-compass-rose"
          />
        </v-col>
        <v-col>
          <n-linear-chart
            :dataLinear="revenue?.totalHotel"
            :total="revenue?.totalTour+revenue?.totalHotel"
            :dateFrom="formatDate(dayRevenue[0])"
            :dateTo="formatDate(dayRevenue[1])"
            color="rgb(100,181,246)"
            title="Total Hotels"
            icon="mdi-shield-home-outline"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { usePartner } from '@/composables/partners/usePartner'
import NChart from '@/components/NChart.vue'
import NLinearChart from '@/components/NLinearChart.vue'
import { convertionType } from '@/helpers/convertion'

const {
  staticBox,
  potentailCustomers,
  revenue,
  getStaticBox,
  getPotentialCustomers,
  getRevenue
} = usePartner()
const { formatCurrency, formatDate } = convertionType()
const dayRevenue = ref<[string, string]>([
  '2023-05-27',
  '2023-06-06'
])
onMounted(() => {
  getStaticBox()
  getPotentialCustomers()
  getRevenue(
    {
      startDate: dayRevenue.value[0],
      endDate: dayRevenue.value[1]
    }
  )
})

const options = {
  scales: {
    y: {
      ticks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (value: any) => {
          return formatCurrency(value)
        }
      },
      suggestedMin: 0
    }
  }
}


</script>
<style lang="scss" scoped>
.partner-page {
  .card {
    width: 200px;
    height: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f2f2f3;
    border-radius: 12px;
    .content {
      height: 80px;
      margin-top: 1.6em;
      aspect-ratio: 1;
      border-radius: 30%;
      background: #f2f2f3;
      margin-bottom: 1em;
      box-shadow: -5px -5px 8px #ffffff7a,
                    5px 5px 8px #a9a9aa7a;
    }
    .info {
      text-align: center;
      margin-top: 1.5em;
    }
    .info > span {
      font-weight: bold;
      font-size: 1.2em;
    }

  }
}
</style>