<script setup>
import {ref} from 'vue';
import PageContainer from "@/components/PageContainer.vue";
import imgSrc from '@/assets/images/image5_SpecialistLogin.png';
import {authenticateDoctor} from "@/services/api.js";
import {useRouter} from 'vue-router';

const user = ref('');
const password = ref('');
const router = useRouter();
const message = ref(''); // Mensaje de error

const checkDoctor = async () => {
  message.value = '';

  if (!user.value.trim() || !password.value.trim()) {
    message.value = 'Por favor, ingresa tu usuario y contraseña.';
    return;
  }
  try {
    const response = await authenticateDoctor(user.value, password.value);
    if (response && response.data.msg) {
      localStorage.setItem('currentDoctorUser', user.value);
      router.push('/especialista-select');
    } else {
      message.value = 'Usuario o contraseña incorrectos.';
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.value = 'Usuario o contraseña incorrectos.';
    } else {
      message.value = 'No se pudo verificar el especialista.';
    }
  }
};
</script>

<template>
  <PageContainer>
    <div class="specialist-login">

      <div class="menu">
        <h1>Inicio de sesión</h1>
        <input placeholder="Número de cédula" v-model="user" id="specialist-cedula" class="input specialist-cedula">
        <input placeholder="Contraseña" v-model="password" id="specialist-password" class="input specialist-password">
        <button class="btn btn-primary" @click="checkDoctor">Ingresar</button>
        <router-link to="/">
          <button class="btn btn-secondary">Volver</button>
        </router-link>
        <div v-if="message" class="error-message">{{ message }}</div>
      </div>
      <img :src="imgSrc" alt="">
    </div>

  </PageContainer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
@import "@/assets/styles/input.scss";

.specialist-login {
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

    .specialist-cedula,
    .specialist-password {
      width: 300px;
    }

    .error-message {
      color: red;
      margin-top: 10px;
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