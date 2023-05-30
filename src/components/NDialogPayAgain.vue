<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog width="70%" @update:modelValue="(event) => hanldeChange(event)">
    <template #activator>
      <slot name="action" />
    </template>
    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="justify-space-between">
          Tiếp tục thanh toán
        </v-card-title>
        <v-card-text>
          <n-select-bank v-model="bankCode" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="() => isActive.value = false">Đóng</v-btn>
          <v-spacer />
          <v-btn @click="() => getAndToPayment({ id: propItems.idBooking, bankCode: bankCode })">Payment</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>
import NSelectBank from './NSelectBank.vue'
import { ref, defineEmits, defineProps, withDefaults } from 'vue'
import { useBookStore } from '@/store/booking'

type Props = {
  idBooking: string,
}
const propItems = withDefaults(defineProps<Props>(), {
  idBooking: ''
})

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
const bookStore = useBookStore()
const getAndToPayment = (params: any) => {
  bookStore.getPaymentLinkAgain(params)
    .then(data => {
      window.location.href = data.paymentLink
    })
}
const bankCode = ref<string>('')
</script>