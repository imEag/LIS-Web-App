<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import PageContainer from "@/components/PageContainer.vue";
import imgSrc from '@/assets/images/Result_PatientResult.png';
import {getPatientHandler} from "@/services/api.js";

const route = useRoute();
const patientData = ref({
  personalInfo: {
    id: '',
    documento: '',
    nombre: '',
    apellido: '',
    edad: '',
    genero: ''
  },
  lipidProfile: {
    cholt: '',
    hdl: '',
    ldl: '',
    trig: ''
  }
});

const isLoading = ref(false);
const error = ref(null);

// Función para obtener los datos del paciente
async function fetchPatientData() {
  isLoading.value = true;
  error.value = null;

  try {
    // Obtener el ID del paciente de la ruta o del estado del router
    const patientId = route.params.legalId || localStorage.getItem('currentPatientId');

    if (!patientId) {
      throw new Error('No se encontró ID del paciente');
    }

    // Primero obtener los datos del paciente
    const patientResponse = await getPatientHandler(patientId);
    const patientInfo = patientResponse.data.patient;

    // Combinar la información
    patientData.value = {
      personalInfo: {
        id: patientInfo.id || '',
        documento: patientInfo.legalID || '',
        nombre: patientInfo.firstName || '',
        apellido: patientInfo.lastName || '',
        edad: patientInfo.age || '',
        genero: patientInfo.gender || ''
      },
      lipidProfile: {
        cholt: patientInfo.results[0]?.CHOLT || '',
        hdl: patientInfo.results[0]?.HDL || '',
        ldl: patientInfo.results[0]?.LDL || '',
        trig: patientInfo.results[0]?.TRIG || ''
      }
    };
  } catch (err) {
    console.error('Error al obtener los datos del paciente:', err);
    error.value = 'Error al cargar los datos del paciente';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchPatientData();
});
</script>

<template>
  <PageContainer>
    <div class="paciente-result">
      <div v-if="isLoading" class="loading">Cargando datos del paciente...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="content">
        <div class="data-section">
          <h2>Datos personales:</h2>
          <table class="table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Género</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ patientData.personalInfo.id }}</td>
              <td>{{ patientData.personalInfo.documento }}</td>
              <td>{{ patientData.personalInfo.nombre }}</td>
              <td>{{ patientData.personalInfo.apellido }}</td>
              <td>{{ patientData.personalInfo.edad }}</td>
              <td>{{ patientData.personalInfo.genero }}</td>
            </tr>
            </tbody>
          </table>
          <h2>Resultados de perfil lipídico:</h2>
          <table class="table2">
            <thead>
            <tr>
              <th>CHOLT</th>
              <th>HDL</th>
              <th>LDL</th>
              <th>TRIG</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ patientData.lipidProfile.cholt }}</td>
              <td>{{ patientData.lipidProfile.hdl }}</td>
              <td>{{ patientData.lipidProfile.ldl }}</td>
              <td>{{ patientData.lipidProfile.trig }}</td>
            </tr>
            </tbody>
          </table>
          <router-link to="/">
            <button class="btn btn-secondary">Volver</button>
          </router-link>
        </div>
        <img :src="imgSrc" alt="Resultado del paciente">
      </div>
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.paciente-result {
  padding: 20px;
  font-family: $questrial;
  font-size: 20px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include respond-to('tablet') {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  .data-section {
    width: 100%;
    margin-top: -60px;

    @include respond-to('tablet') {
      width: 60%;
      margin-right: 20px;
      margin-bottom: 0;
    }

    @include respond-to('desktop') {
      width: 70%;
    }

    h2 {
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .table, .table2 {
      width: 80%;
      border-collapse: collapse;
      margin-bottom: 20px;

      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }
    }

    .table2 {
      @include respond-to('tablet') {
        width: 70%;
      }

      @include respond-to('desktop') {
        width: 55%;
      }
    }

    .btn {
      background-color: $pale-blue;
      box-shadow: 0 4px 4px 0 #00000040;
      border: none;
      width: 200px;
      padding: 20px 0;
      border-radius: 25px;
      cursor: pointer;
      transition: background-color 0.1s;
      margin-top: 20px;
      margin-left: 500px;
    }
  }

  img {
    width: 200px;
    margin-left: 10px;
    margin-right: -900px;
    margin-top: -170px;

    @include respond-to('tablet') {
      width: 400px;
    }

    @include respond-to('desktop') {
      width: 280px;
    }
  }
}
</style>