<script setup lang="ts">
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";
</script>

<template>
  <div class="page-container">
    <Header/>
    <main class="main-content">
      <slot/>
    </main>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

div.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

main {

}

</style>
