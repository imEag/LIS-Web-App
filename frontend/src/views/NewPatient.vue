<script setup>
import {ref} from 'vue';
import PageContainer from "@/components/PageContainer.vue";
import {createPatient, createResult} from "@/services/api.js";

const legalID = ref('');
const firstName = ref('');
const lastName = ref('');
const age = ref('');
const gender = ref('');
const cholt = ref('');
const hdl = ref('');
const ldl = ref('');
const trig = ref('');

const resetForm = () => {
  legalID.value = '';
  firstName.value = '';
  lastName.value = '';
  age.value = '';
  gender.value = '';
  cholt.value = '';
  hdl.value = '';
  ldl.value = '';
  trig.value = '';
};

const handleSubmit = async () => {
  // Validate form
  if (!legalID.value || !firstName.value || !lastName.value ||
      !age.value || gender.value === '' || !cholt.value || !hdl.value ||
      !ldl.value || !trig.value) {
    alert('Por favor, llene todos los campos');
    return;
  }

  const patientData = {
    legalID: legalID.value,
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
    gender: gender.value,
  };

  const lipidProfileData = {
    CHOLT: cholt.value,
    HDL: hdl.value,
    LDL: ldl.value,
    TRIG: trig.value,
  };

  try {
    const {data: {patient: createdPatient}} = await createPatient(patientData);
    await createResult({...lipidProfileData, patient: createdPatient._id});
    resetForm();

    alert('Patient and lipid profile created successfully');
  } catch (error) {
    console.error('Error creating patient or lipid profile:', error);
    alert('Failed to create patient or lipid profile');
  }
};
</script>

<template>
  <PageContainer>
    <div class="nuevo-paciente">
      <h1>Nuevo paciente</h1>
      <form class="form-control" @submit.prevent="handleSubmit">
        <h2>Datos personales</h2>
        <div class="personal-data form-group">
          <input placeholder="Número de cédula" id="new-patient-legal-id" class="input legal-id" type="number"
                 v-model="legalID">
          <input placeholder="Nombre" id="new-patient-first-name" class="input firstName" v-model="firstName">
          <input placeholder="Apellido" id="new-patient-last-name" class="input lastName" v-model="lastName">
          <input placeholder="Edad" id="new-patient-age" class="input age" type="number" v-model="age">
          <select id="new-patient-gender" class="input gender" v-model="gender">
            <option value="" disabled selected>Género</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
        <h2>Perfil lipídico</h2>
        <div class="results form-group">
          <label for="new-patient-cholesterol">CHOLT:</label>
          <input placeholder="CHOLT" id="new-patient-cholt" class="input cholt" v-model="cholt">
          <label for="new-patient-hdl">HDL:</label>
          <input placeholder="HDL" id="new-patient-hdl" class="input hdl" v-model="hdl">
          <label for="new-patient-ldl">LDL:</label>
          <input placeholder="LDL" id="new-patient-ldl" class="input ldl" v-model="ldl">
          <label for="new-patient-trig">TRIG:</label>
          <input placeholder="TRIG" id="new-patient-trig" class="input trig" v-model="trig">
        </div>
        <div class="buttons-container">
          <router-link to="/especialista-select">
            <button class="btn btn-secondary" type="button">Volver</button>
          </router-link>
          <button class="btn btn-primary" type="submit">Ingresar</button>
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