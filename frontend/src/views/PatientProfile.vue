<script setup lang="ts">
import PageContainer from "@/components/PageContainer.vue";
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getPatientHandler, updatePatient} from "@/services/api.js";

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

async function fetchPatientData() {
  isLoading.value = true;
  error.value = null;

  try {
    const patientId = route.params.legalId || localStorage.getItem('currentPatientId');

    if (!patientId) {
      throw new Error('No se encontró ID del paciente');
    }

    const patientResponse = await getPatientHandler(patientId);
    const patientInfo = patientResponse.data.patient;

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
        cholt: patientInfo.results?.[0]?.CHOLT || '',
        hdl: patientInfo.results?.[0]?.HDL || '',
        ldl: patientInfo.results?.[0]?.LDL || '',
        trig: patientInfo.results?.[0]?.TRIG || ''
      }
    };
  } catch (err) {
    console.error('Error al obtener los datos del paciente:', err);
    error.value = 'Error al cargar los datos del paciente';
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit() {
  try {
    const dataToUpdate = {
      firstName: patientData.value.personalInfo.nombre,
      lastName: patientData.value.personalInfo.apellido,
      age: patientData.value.personalInfo.edad,
      gender: patientData.value.personalInfo.genero,
      id: patientData.value.personalInfo.id,
    }
    await updatePatient(patientData.value.personalInfo.id, dataToUpdate);
    // Handle successful update (e.g., show success message, redirect)
    alert('Datos del paciente actualizados correctamente');

  } catch (err) {
    console.error('Error al actualizar los datos del paciente:', err);
    error.value = 'Error al actualizar los datos del paciente';
    alert('Error al actualizar los datos del paciente');
  }
}

onMounted(() => {
  fetchPatientData();
});
</script>

<template>
  <PageContainer>
    <div class="nuevo-paciente">
      <h1>Datos del paciente</h1>
      <p v-if="isLoading">Cargando datos del paciente...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <form v-else class="form-control" @submit.prevent="handleSubmit">
        <h2>Datos personales</h2>
        <div class="personal-data form-group">
          <input placeholder="Número de cédula" id="patient-legal-id" class="input legal-id" type="number"
                 v-model="patientData.personalInfo.documento" readonly>
          <input placeholder="Nombre" id="patient-first-name" class="input firstName"
                 v-model="patientData.personalInfo.nombre">
          <input placeholder="Apellido" id="patient-last-name" class="input lastName"
                 v-model="patientData.personalInfo.apellido">
          <input placeholder="Edad" id="patient-age" class="input age" type="number"
                 v-model="patientData.personalInfo.edad">
          <select id="patient-gender" class="input gender" v-model="patientData.personalInfo.genero">
            <option value="" disabled>Género</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
        <h2>Perfil lipídico</h2>
        <div class="results form-group">
          <label for="patient-cholt">CHOLT:</label>
          <input placeholder="CHOLT" id="patient-cholt" class="input cholt"
                 v-model="patientData.lipidProfile.cholt" readonly>
          <label for="patient-hdl">HDL:</label>
          <input placeholder="HDL" id="patient-hdl" class="input hdl" v-model="patientData.lipidProfile.hdl" readonly>
          <label for="patient-ldl">LDL:</label>
          <input placeholder="LDL" id="patient-ldl" class="input ldl" v-model="patientData.lipidProfile.ldl" readonly>
          <label for="patient-trig">TRIG:</label>
          <input placeholder="TRIG" id="patient-trig" class="input trig"
                 v-model="patientData.lipidProfile.trig" readonly>
        </div>
        <div class="buttons-container">
          <router-link to="/consulta">
            <button class="btn btn-secondary" type="button">Volver</button>
          </router-link>
          <button class="btn btn-primary" type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.nuevo-paciente {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: $questrial;
  justify-content: flex-start;
  align-items: center;

  h1 {
    text-align: center;
  }

  .form-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>