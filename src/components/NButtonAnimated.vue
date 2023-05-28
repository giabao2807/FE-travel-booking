<template>
  <button
    :type="props.type"
    :disabled="disabled"
    class="btn btn--pink btn--animated"
    :style="styleButton"
    @click="$emit('click', $event)"
  >
    <span class="font-palanquin btn-text">{{ label }}</span>
  </button>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
type Props = {
  label?: string,
  type?: 'submit' | 'button' | 'reset' | undefined,
  width?: string,
  height?: string,
  fontSize?: string,
  backgroundColor?: string,
  color?: string,
  disabled?: boolean
}
const styleButton = computed(()=>{
  return {
    'width': props.width,
    'height': props.height,
    'font-size': props.fontSize,
    'background-color': props.backgroundColor,
    'color': props.color
  }
})
const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  label: '',
  width: '',
  height: '',
  fontSize: '1.5rem',
  backgroundColor: '#72064D',
  color: '#f7f7f7',
  disabled: false
})
</script>
<style scoped>
.btn {
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.2rem 2rem;
  display: inline-block;
  border-radius: 10rem;
  transition: all .2s;
  position: relative;
  font-weight: 700;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem var(--btn-shawdow-color);
}
.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.btn:active, .btn:focus {
  outline: none;
  transform: translateY(-1px);
  box-shadow: 0 0.5rem 1rem var(--btn-shawdow-color);
}

.btn--pink::after {
  background-color: var(--btn-animation-bgcolor);
}

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
  animation-fill-mode: backwards;
}
.btn-text {
  font-size: 18px
}
</style>