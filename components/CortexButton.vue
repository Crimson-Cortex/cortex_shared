<script setup>
import { defineProps, defineEmits } from 'vue'
import { CortexAudio } from '../utils/CortexAudio'

const emits = defineEmits(['click'])
const audio = new CortexAudio()

const props = defineProps({
  label: [String],
  color: {
    type: String,
    default: '',
    validator(value) {
      return ['', 'white', 'grey', 'danger', 'success', 'gold'].includes(value)
    }
  },
  glow: {
    type: String,
    default: '',
    validator(value) {
      return ['', 'green', 'gold', 'danger'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'small',
    validator(value) {
      return ['very-small', 'small', 'large'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  borderless: [Boolean],
  icon: [Boolean]
})

function onClick() {
  if (props.disabled) {
    return audio.playSfxNext()
  }

  emits('click')
}

function onMouseEnter() {
  if (props.disabled) {
    audio.playSfxUpDown()
  }
}
</script>

<template>
  <div class="btn__wrapper">
    <button
      @click="onClick"
      @mouseenter="onMouseEnter"
      class="btn"
      :class="{
        'btn--icon': icon,
        [`btn--${color}`]: color,
        [`btn--${size}`]: size,
        'btn--borderless': borderless,
        'btn--glow': !!glow,
        [`btn--glow-${glow}`]: glow
      }"
      :disabled="disabled"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style lang="scss">
.btn {
  --padding-tb: calc(var(--1rpx) * 12);
  --padding-lr: calc(var(--1rpx) * 25);
  --min-width: var(--100rpx);
  --img-url: url(@/assets/img/btn_bg.png);
  --font-size: 1rem;
  --color: rgba(255, 255, 255, 0.8);
  --hover-color: rgba(255, 255, 255, 1);
  background: transparent var(--img-url) no-repeat;
  background-size: 100% 100%;
  padding: var(--padding-tb) var(--padding-lr);
  border: none;
  outline: none;
  color: var(--color);
  font-size: var(--font-size);
  font-weight: bold;
  font-family: 'rdr_crock', serif;
  cursor: pointer;
  user-select: none;
  filter: drop-shadow(0px 0px var(--5rpx) rgba(0, 0, 0, 0.6));
  min-width: var(--min-width);
  text-align: center;
}

.btn--icon {
  --padding-lr: calc(var(--1rpx) * 15);
  --min-width: unset;
}

.btn--white {
  --img-url: url(@/assets/img/btn_bg_white.png);
  --color: #000;
}

.btn--grey {
  --img-url: url(@/assets/img/btn_bg_grey.png);
}

.btn--danger {
  --img-url: url(@/assets/img/btn_bg_red.png);
}

.btn--success {
  --img-url: url(@/assets/img/btn_bg_green.png);
}

.btn--gold {
  --img-url: url(@/assets/img/btn_bg_gold.png);
  --color: rgba(54, 30, 0, 0.8);
  --hover-color: rgba(54, 30, 0, 1);
}

.btn--small {
  --font-size: 0.8rem;
}

.btn--very-small.btn--icon {
  --padding-lr: calc(var(--1rpx) * 10);
  --padding-tb: calc(var(--1rpx) * 10);
}

.btn--very-small {
  --font-size: 0.5rem;
}

.btn--large {
  --font-size: 1.25rem;
}

.btn--borderless {
  --padding-lr: calc(var(--1rpx) * 5);
  --padding-tb: calc(var(--1rpx) * 5);
}

.btn:not(:disabled):hover {
  color: var(--hover-color);
  --scale: 1.1;
  transform: scale(var(--scale));
  -wekbit-transform: scale(var(--scale));
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.btn--glow {
  position: relative;
  z-index: 0;
}

.btn--glow:before {
  --glow-width: calc(var(--1rpx) * -2);
  --bg-rotate: 45deg;
  content: '';
  background: linear-gradient(
    var(--bg-rotate),
    #00ffd9,
    #dd00ff,
    rgba(255, 255, 255, 0),
    #dd00ff,
    #00ffd9
  );
  position: absolute;
  top: calc(var(--glow-width) * -1);
  left: calc(var(--glow-width) * -1);
  background-size: 400%;
  z-index: -2;
  filter: blur(var(--10rpx));
  width: calc(100% + (var(--glow-width) * 2));
  height: calc(100% + (var(--glow-width) * 2));
  animation: glowing 15s linear infinite;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

.btn--glow-danger:before,
.btn--danger.btn--glow:before {
  background: linear-gradient(
    var(--bg-rotate),
    #d00000,
    #850000,
    rgba(255, 166, 166, 0),
    #850000,
    #d00000
  );
  background-size: 400%;
}

.btn--glow-gold:before,
.btn--gold.btn--glow:before {
  background: linear-gradient(
    var(--bg-rotate),
    #ffb700,
    #fff77b,
    rgba(255, 255, 255, 0),
    #fff77b,
    #ffb700
  );
  background-size: 400%;
}

.btn--glow-green:before,
.btn--success.btn--glow:before {
  background: linear-gradient(
    var(--bg-rotate),
    #1a6700,
    #1bad00,
    rgba(255, 255, 255, 0),
    #1bad00,
    #1a6700
  );
  background-size: 400%;
}

.btn--glow:after {
  content: '';
  background: transparent var(--img-url) no-repeat;
  background-size: 100% 100%;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 1));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  opacity: 0;
  transition: opacity 0.3s ease-in-out 0.1s;
}

.btn--glow:not(:disabled):hover:after,
.btn--glow:not(:disabled):hover:before {
  opacity: 1;
}

.btn__wrapper {
  display: inline-block;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
}
</style>
