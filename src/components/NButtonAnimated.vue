<template>
  <button
    :type="type"
    class="btn btn--pink btn--animated"
    @click="$emit('click', $event)"
  >
    {{ label }}
  </button>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
type Props = {
  label?: string,
  type?: string
}
const { type = 'submit', label } = defineProps<Props>()
</script>
<style scoped>
.btn, .btn:link, .btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.1rem 3rem;
  display: inline-block;
  border-radius: 10rem;
  transition: all .2s;
  position: relative;
  font-weight: 700;
  font-size: 1.6rem;
  border: none;
  cursor: pointer; }

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2); }
  .btn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0; }

.btn:active, .btn:focus {
  outline: none;
  transform: translateY(-1px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2); }

.btn--pink {
  background-color: #ebb0f0;
  color: #f7f7f7; }
  .btn--pink::after {
    background-color: #f5a6ed; }

.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 10rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all .4s; }

.btn--animated {
  animation: moveInBottom .5s ease-out .75s;
  animation-fill-mode: backwards; }
</style>