<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

const fontSize = ref('100%')

function updateScreenWidthFactor() {
  const screen_width_factor = Math.round((window.outerWidth / 1920) * 100)

  document.documentElement.style.fontSize = screen_width_factor + '%'
}

function eventListener({ data: { app, method, data } }) {
  if (app && method) {
    window.dispatchEvent(new MessageEvent(`${app}:${method}`), {
      data
    })
  }
}

onBeforeMount(() => {
  window.addEventListener('resize', updateScreenWidthFactor)

  window.addEventListener('message', eventListener)
})

onBeforeUnmount(() => {
  window.addEventListener('resize', updateScreenWidthFactor)

  window.removeEventListener('message', eventListener)
})
</script>

<template>
  <div :style="{ fontSize }">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: rdr;
  src: url(../assets/fonts/chineserocks.ttf) format('truetype');
}

@font-face {
  font-family: rdr_crock;
  src: url(../assets/fonts/crock.ttf) format('truetype');
}

@font-face {
  font-family: hapna;
  src: url(../assets/fonts/HapnaSlabSerif-DemiBold.ttf) format('truetype');
}

:root {
  --1rpx: calc(1rem / 16);
  --5rpx: calc(var(--1rpx) * 5);
  --7rpx: calc(var(--1rpx) * 7);
  --10rpx: calc(var(--1rpx) * 10);
  --15rpx: calc(var(--1rpx) * 15);
  --20rpx: calc(var(--1rpx) * 20);
  --25rpx: calc(var(--1rpx) * 25);
  --30rpx: calc(var(--1rpx) * 30);
  --35rpx: calc(var(--1rpx) * 35);
  --40rpx: calc(var(--1rpx) * 40);
  --50rpx: calc(var(--1rpx) * 50);
  --75rpx: calc(var(--1rpx) * 75);
  --100rpx: calc(var(--1rpx) * 100);
  --scrollbar-radius: var(--5rpx);
  --scrollbar-width: var(--10rpx);
}

::-webkit-scrollbar {
  height: var(--scrollbar-width);
  width: var(--scrollbar-width);
  background: rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    176deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: var(--scrollbar-radius);
  -webkit-border-radius: var(--scrollbar-radius);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--scrollbar-radius);
  -webkit-border-radius: var(--scrollbar-radius);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 1);
}

::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}

body,
html {
  font-family: rdr, sans-serif;
  font-size: 1rem;
  background: transparent none;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
