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

export const updatePatient = (id, patientDataToUpdate) => {
    return axios.put(`/patients/${id}`, patientDataToUpdate);
}

export const authenticateDoctor = (user, password) => {
    return axios.post('/doctors', {user, password});
}