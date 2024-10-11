import axios from 'axios';

// Existing functions
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

// New functions
export const getAllPatients = () => {
    return axios.get('/patients');
}

export const deletePatient = (id) => {
    return axios.delete(`/patients/${id}`);
}

// Rename getPatientHandler to getPatient for consistency
export const getPatient = getPatientHandler;