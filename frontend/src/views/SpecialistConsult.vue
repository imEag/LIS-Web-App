<script setup>
import PageContainer from "@/components/PageContainer.vue";
import imgSrc from '@/assets/images/image5_SpecialistLogin.png';

// Datos de los pacientes
const patients = [
  { id: "001", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" },
  { id: "002", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" },
  { id: "003", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" },
  { id: "004", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" },
  { id: "005", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" },
  { id: "006", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" },
  { id: "007", document: "1007240356", firstName: "Luisa Fernanda", lastName: "Salazar" }
];
</script>

<template>
  <PageContainer>
    <div class="patient-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.document }}</td>
            <td>{{ patient.firstName }}</td>
            <td>{{ patient.lastName }}</td>
            <td>
              <button class="action-btn view">🔍</button>
              <button class="action-btn update">🔄</button>
              <button class="action-btn delete">❌</button>
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
