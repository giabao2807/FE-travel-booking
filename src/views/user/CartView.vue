<template>
  <v-sheet>
    <v-container>
      <h2>Giỏ của Tôi</h2>
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        class="font-rowdies"
        align-tabs="center"
      >
        <v-tab :value="1">Tours</v-tab>
        <v-tab :value="2">Hotels</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          v-for="n in 2"
          :key="n"
          :value="n"
        >
          <v-container fluid>
            <v-row>
              <v-col
                v-for="item in tours"
                :key="item?.id"
              >
                <v-card>
                  <v-card-text>
                    {{ item?.name }}
                    {{ item }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tab = ref<number>()
const tours = JSON.parse(localStorage.getItem('tours-cart') || '[]')
const hotels = ''
console.log(tours)
</script>