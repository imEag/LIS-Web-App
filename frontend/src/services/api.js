import axios from 'axios';

export function createPatient(patient) {
    return axios.post('/patients', patient);
}

export const createResult = (result) => {
    return axios.post('/results', result);
}

export const getPatientHandler = (legalId) => {
    return axios.get(`/patients/${legalId}`);
}