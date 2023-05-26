<template>
  <v-dialog persistent width="70%" v-model="dialogBooking">
    <v-card>
      <v-card-title class="justify-space-between">
        <h2 class="text-center ma-2">BOOK TOUR</h2>
        <v-timeline direction="horizontal" truncate-line="both">
          <v-timeline-item
            v-for="n in 3"
            :key="n"
            :icon="['mdi-cube-scan', 'mdi-credit-card-outline', 'mdi-cloud-check-variant'][n - 1]"
            :icon-color="step === n ? 'primary' : '#000'"
            dot-color="transparent"
          />
        </v-timeline>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text class="ml-2">
            <h2 class="mb-5">Confirm Tour Information</h2>
            <v-row>
              <v-col cols="4">
                <n-image :src="tourInfo?.listImages[0]" height="250" />
                <div class="my-2">
                  <v-icon icon="mdi-clock-start" />
                  Khởi hành:
                  <strong class="mx-2">{{ tourInfo?.departure }}</strong>
                </div>
                <div class="my-2">
                  <v-icon icon="mdi-shoe-sneaker" />
                  Phương tiện di chuyển:
                  <v-icon
                    v-for="item in getTraffic(tourInfo?.traffics)"
                    :key="item.value"
                    :icon="item?.icon"
                    class="mx-2"
                  />
                </div>
                <div class="my-2">
                  <v-icon icon="mdi-weather-cloudy-clock" />
                  Thời gian:
                  <strong class="mx-2">{{ tourInfo?.totalDays }}</strong>
                </div>
              </v-col>
              <v-col>
                <div>
                  <h2>{{ tourInfo?.name }}</h2>
                </div>
                <div class="mt-5 mb-2">
                  <v-icon icon="mdi-map-clock-outline" />
                  Ngày Khởi hành:
                  <strong class="mx-2">{{ bookingTour?.startDate }}</strong>
                </div>
                <div class="my-2">
                  <v-icon icon="mdi-ticket-account" />
                  Số lượng:
                  <strong class="mx-2">{{ bookingTour?.bookingItems[0].quantity }}</strong>
                  <v-icon icon="mdi-account-multiple" />
                </div>
                <div class="w-75">
                  <v-icon icon="mdi-note-edit-outline" />
                  Ghi chú (nếu có)
                  <v-textarea
                    variant="outlined"
                    auto-grow
                    rows="2"
                    row-height="20"
                    color="primary"
                    hide-details="auto"
                    class="text-field"
                  />
                </div>
                <div class="w-75">
                  <v-icon icon="mdi-bank-outline" />
                  Chọn ngân hàng thanh toán
                  <v-select
                    v-model="bookingTour.bankCode"
                    :items="BANK"
                    item-title="name"
                    item-value="value"
                    color="primary"
                    hide-details="auto"
                    class="text-field"
                    variant="outlined"
                    clearable
                  />
                </div>
              </v-col>
            </v-row>
            <v-row justify="end">
              <div class="text-h6 ma-2 animate-charcter">
                Tổng tiền:
                <strong class="mx-2">
                  {{
                    formatCurrency(
                      getPriceDiscount(tourInfo?.price, tourInfo?.couponData.discountPercent)
                      * bookingTour?.bookingItems[0].quantity
                    )
                  }}
                </strong>
              </div>
            </v-row>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text />
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            />
            <h3 class="text-h6 font-weight-light mb-2">
              Welcome to Vuetify
            </h3>
            <span class="text-caption text-grey">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider />

      <v-card-actions>
        <v-btn
          v-if="step > 1"
          variant="text"
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="!bookingTour?.bankCode"
          v-if="step < 3"
          color="primary"
          variant="flat"
          @click="() => {
            handldeBookingTours(bookingTour)
            step++
          }"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>