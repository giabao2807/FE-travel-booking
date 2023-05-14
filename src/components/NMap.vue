<template>
  <div id="map" />
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
let map = window.google.maps.Map
const initMap = async() => {
  const { Map } = await window.google.maps.importLibrary('maps')
  map = new Map(document.getElementById('map') as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })
}



onMounted(() =>{
  initMap()
})
</script>