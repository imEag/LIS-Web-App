<script setup>
import PageContainer from "@/components/PageContainer.vue";
import imgSrc from '@/assets/images/Result_PatientResult.png';
</script>

<template>
  <PageContainer>
    <div class="paciente-result">
      <div class="content">
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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