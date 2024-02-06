<template>
  <div class="loading">
    <div class="loading__container">
      <div class="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="loading-text">데이터 처리중 입니다.</div>
      <div class="loading-text">잠시만 기다려주세요.</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loading {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  display: none;
  background-color: #00000070;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    padding: 32px;

    .loading-text {
      font-size: 1.2rem;
      color: #ffffff;

      &:first-of-type {
        padding-bottom: 4px;
      }
    }

    .loading-spinner {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
      margin-bottom: 24px;

      div {
        transform-origin: 40px 40px;
        animation: loading-spinner 1.2s linear infinite;

        &:after {
          content: ' ';
          display: block;
          position: absolute;
          top: 3px;
          left: 37px;
          width: 6px;
          height: 18px;
          border-radius: 20%;
          background: #fff;
        }

        &:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        &:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        &:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        &:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        &:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        &:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        &:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        &:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        &:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        &:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        &:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        &:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }
        @keyframes loading-spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
