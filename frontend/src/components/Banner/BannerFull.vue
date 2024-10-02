<script setup>
import imageSrc from '@/assets/images/image1.png';

</script>

<template>
  <div class="banner-full-container">
    <h1 class="title">LIMS</h1>
    <div class="separator">
      <div class="line"></div>
      <img :src="imageSrc" alt="image">
      <div class="line"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.banner-full-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  h1 {
    color: $black;
    margin: 0;
    font-size: 60px;
    font-family: $comfortaa;
    font-weight: 900;
  }

  .separator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    img {
      height: 100px;
      margin: 0 10px;
    }

    .line:first-child {
      width: 30%;
      height: 10px;
      background: linear-gradient(to right, $white, $teal-blue);
    }

    .line:last-child {
      width: 30%;
      height: 10px;
      background: linear-gradient(to left, $white, $teal-blue);
    }
  }
}
</style>
