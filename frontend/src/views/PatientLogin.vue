<script setup>
import PageContainer from "@/components/PageContainer.vue";
import imgSrc from '@/assets/images/image3.png';
</script>

<template>
  <PageContainer>
    <div class="patient-login">
      <img :src="imgSrc" alt="">
      <div class="menu">
        <h1>Inicio de sesión</h1>
        <input placeholder="Número de cédula" id="patient-cedula" class="input patient-cedula">
        <router-link to="/paciente-result">
          <button class="btn btn-primary">Ingresar</button>
        </router-link>
        <router-link to="/">
          <button class="btn btn-secondary">Volver</button>
        </router-link>
      </div>
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.patient-login {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;

  @include respond-to('tablet') {
  }

  @include respond-to('desktop') {
    flex-wrap: nowrap;

  }

  .menu {
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: $questrial;
    gap: 30px;

    h1 {
      margin: 0;
    }

    .btn {
      width: 260px;
    }

    .patient-cedula {
      width: 300px;
    }
  }

  img {
    width: 200px;

    @include respond-to('tablet') {
      width: 400px;
    }

    @include respond-to('desktop') {
      width: 500px;
    }
  }
}
</style>
