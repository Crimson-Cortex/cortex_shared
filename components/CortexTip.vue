<script setup>
import { ref, defineProps, watch } from 'vue'

const ANIM_IN_OUT_DURATION_IN_MS = 500

const tip = ref()

const props = defineProps({
  position: {
    type: String,
    default: 'tip--bc',
    validator(value) {
      return [
        'tip--tl',
        'tip--tc',
        'tip--tr',
        'tip--cl',
        'tip--cc',
        'tip--cr',
        'tip--bl',
        'tip--bc',
        'tip--br'
      ].includes(value)
    }
  },
  duration: {
    type: Number,
    default: 4000
  }
})

const open = ref(false)

watch(open, (value) => {
  if (value) {
    window.setTimeout(() => {
      const el = tip.value

      el.classList.add('nss-tip--out')

      window.setTimeout(() => {
        el.remove()
      }, ANIM_IN_OUT_DURATION_IN_MS)
    }, props.duration + ANIM_IN_OUT_DURATION_IN_MS)
  }
})
</script>

<template>
  <Teleport to="body">
    <div ref="tip" class="tip" :class="{ [position]: true }" v-if="open">
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss">
:root {
  --anim-duration: 500ms;
}

.tip {
  --translateXCenter: -50%;
  --translateYCenter: -50%;
  --margin: var(--25rpx);
  position: absolute;
  background: transparent url(@/assets/img/tip.png) no-repeat;
  background-size: 100% 100%;
  max-width: calc(var(--1rpx) * 512);
  box-sizing: border-box;
  padding: var(--10rpx) var(--20rpx);
  color: rgba(255, 255, 255, 0.8);
  font-family: rdr, sans-serif;
  font-size: 1.3rem;
  z-index: 200000;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;

  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.6));

  -webkit-animation: anim__fade-in var(--anim-duration) both;
  animation: anim__fade-in var(--anim-duration) both;

  &--out {
    -webkit-animation: anim__fade-out var(--anim-duration) both;
    animation: anim__fade-out var(--anim-duration) both;
  }

  &--tl {
    top: var(--margin);
    left: var(--margin);
  }

  &--tc {
    top: var(--margin);
    left: 50%;
    transform: translateX(var(--translateXCenter));
    -webkit-transform: translateX(var(--translateXCenter));
  }

  &--tr {
    top: var(--margin);
    right: var(--margin);
  }

  &--cl {
    top: 50%;
    left: var(--margin);
    transform: translateY(var(--translateYCenter));
    -webkit-transform: translateY(var(--translateYCenter));
  }

  &--cc {
    left: 50%;
    top: 50%;
    transform: translateX(var(--translateXCenter)) translateY(var(--translateYCenter));
    -webkit-transform: translateX(var(--translateXCenter)) translateY(var(--translateYCenter));
  }

  &--cr {
    top: 50%;
    right: var(--margin);
    transform: translateY(var(--translateYCenter));
    -webkit-transform: translateY(var(--translateYCenter));
  }

  &--bl {
    bottom: var(--margin);
    left: var(--margin);
  }

  &--bc {
    bottom: var(--margin);
    left: 50%;
    transform: translateX(var(--translateXCenter));
    -webkit-transform: translateX(var(--translateXCenter));
  }

  &--br {
    bottom: var(--margin);
    right: var(--margin);
  }
}

@-webkit-keyframes anim__fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes anim__fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes anim__fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes anim__fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
