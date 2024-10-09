<script setup>
import { ref } from 'vue';
import PageContainer from "@/components/PageContainer.vue";
import { getPatientHandler } from "@/services/api.js";
import imgSrc from '@/assets/images/image3.png';
import { useRouter } from 'vue-router';

const legalID = ref('');
const router = useRouter();
const message = ref(''); // Propiedad para el mensaje

const checkPatient = async () => {
  console.log('Verificando paciente con ID:', legalID.value);
  if (!legalID.value || legalID.value.trim() === '') {
    message.value = 'Por favor, ingresa un número de cédula válido.';
    return;
  }
  try {
    const response = await getPatientHandler(legalID.value);
    console.log('Respuesta de la API:', response);
    if (response && response.data.patient) {
      // Guardar el ID en localStorage o pasarlo como parámetro de ruta
      localStorage.setItem('currentPatientId', legalID.value);
      router.push({ 
        name: 'paciente result',
        params: { legalId: legalID.value }
      });
    } else {
      message.value = 'Paciente no encontrado.';
    }
  } catch (error) {
    console.error('Error al verificar el paciente:', error);
    message.value = 'Este paciente no existe.';
  }
};
</script>
<template>
  <PageContainer>
    <div class="patient-login">
      <img :src="imgSrc" alt="">
      <div class="menu">
        <h1>Inicio de sesión</h1>
        <input 
          placeholder="Número de cédula" 
          v-model="legalID" 
          id="patient-cedula" 
          class="input patient-cedula"
        >
        <button class="btn btn-primary" @click="checkPatient">Ingresar</button>
        <router-link to="/">
          <button class="btn btn-secondary">Volver</button>
        </router-link>
        <div v-if="message" class="error-message">{{ message }}</div> <!-- Muestra el mensaje aquí -->
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

  @include respond-to('tablet') {}

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

    .error-message {
      color: red; /* Estilo del mensaje de error */
      margin-top: 10px; /* Espaciado */
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
