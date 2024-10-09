import axios from 'axios';

export function createPatient(patient) {
    return axios.post('/patients', patient);
}

export const createResult = (result) => {
    return axios.post('/results', result);
}

export const getPatientHandler = (legalId) => {
    // Incluye el legalId en la URL de la solicitud
    return axios.get(`/patients/${legalId}`);
  }

