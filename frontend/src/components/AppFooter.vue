<template>
  <footer>
    <div>
      <p class="footer-text">
        Hospital Alma Mater
      </p>
    </div>
  </footer>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

footer {
  background: linear-gradient(to right, $marine-blue, $teal-blue);
  height: 70px;
  width: 100%;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

p.footer-text {
  color: $white;
  font-size: 40px;
  text-align: center;
  margin: 0;
}

</style>