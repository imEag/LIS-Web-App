<script setup>
import PageContainer from "@/components/PageContainer.vue";
import phoneImgSrc from '@/assets/images/image4_SelectSpecialist.png';
</script>

<template>
  <PageContainer>
    <div class="especialista-select">
      <img :src="phoneImgSrc" alt="">
      <div class="menu">
        <router-link to="/consulta">
          <button class="btn btn-primary">Consulta</button>
        </router-link>
        <router-link to="/New-Pacient">
          <button class="btn btn-third">Nuevo Paciente</button>
        </router-link>
        <router-link to="/especialista-login">
          <button class="btn btn-secondary">Volver</button>
        </router-link>
      </div>
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.especialista-select {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;

  @include respond-to('tablet') {
    align-items: center;
  }

  @include respond-to('desktop') {
    flex-wrap: nowrap;
  }

  .menu {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: $questrial;
    gap: 20px;
    margin-top: auto;
    margin-bottom: auto;

    h1 {
      margin: 0;
    }

    .btn {
      width: 260px;
    }
  }

  img {
    width: 150px; // Reducido de 200px

    @include respond-to('tablet') {
      width: 300px; // Reducido de 500px
    }

    @include respond-to('desktop') {
      width: 400px; // Reducido de 600px
    }
  }
}
</style>