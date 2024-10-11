<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import PageContainer from "@/components/PageContainer.vue";
import {getAllPatients, deletePatient,} from "@/services/api.js";

const router = useRouter();
const patients = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Fetch patients from the database
const fetchPatients = async () => {
  try {
    isLoading.value = true;
    const response = await getAllPatients();
    patients.value = response.data.patients;
  } catch (err) {
    console.error('Error fetching patients:', err);
    error.value = err.response?.data?.message || 'Failed to load patients. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Handle view patient action
const viewPatient = async (legalId) => {
  try {
    router.push(`/paciente-perfil/${legalId}`);
  } catch (err) {
    console.error('Error fetching patient details:', err);
    error.value = err.response?.data?.message || 'Failed to load patient details. Please try again.';
  }
};

// Handle update patient action
const handleUpdatePatient = (legalId) => {
  router.push(`/paciente-perfil/${legalId}`);
};

// Handle delete patient action
const handleDeletePatient = async (id) => {
  if (confirm('Are you sure you want to delete this patient?')) {
    try {
      await deletePatient(id);
      await fetchPatients(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting patient:', err);
      error.value = err.response?.data?.message || 'Failed to delete patient. Please try again.';
    }
  }
};

// Fetch patients when the component is mounted
onMounted(fetchPatients);
</script>

<template>
  <PageContainer>
    <div class="patient-list">
      <h1>Lista de pacientes</h1>
      <div v-if="isLoading">Loading patients...</div>
      <div v-else-if="error">{{ error }}</div>
      <table v-else>
        <thead>
        <tr>
          <th>Documento</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patients" :key="patient.legalID">
          <td>{{ patient.legalID }}</td> <!-- Mostrar solo el Documento -->
          <td>{{ patient.firstName }}</td>
          <td>{{ patient.lastName }}</td>
          <td>
            <button class="action-btn view" @click="viewPatient(patient.legalID)">🔍</button>
            <button class="action-btn update" @click="handleUpdatePatient(patient.legalID)">🔄</button>
            <button class="action-btn delete" @click="handleDeletePatient(patient.id)">❌</button>
          </td>
        </tr>
        </tbody>
      </table>
      <router-link to="/nuevo-paciente">
        <button class="btn btn-primary">Nuevo paciente</button>
      </router-link>
      <router-link to="/">
        <button class="btn btn-secondary">Volver</button>
      </router-link>
    </div>
  </PageContainer>
</template>

<style scoped>
.patient-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.action-btn.view:hover {
  color: blue;
}

.action-btn.update:hover {
  color: green;
}

.action-btn.delete:hover {
  color: red;
}

.btn {
  width: 200px;
  margin: 5px;
}
</style>
