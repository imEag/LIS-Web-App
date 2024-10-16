import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatientLogin from '@/views/PatientLogin.vue'
import SpecialistLogin from '@/views/SpecialistLogin.vue'
import SpecialistConsult from '@/views/SpecialistConsult.vue'
import SpecialistSelect from '@/views/SpecialistSelect.vue'
import NewPatient from "@/views/NewPatient.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/paciente-login',
            name: 'paciente login',
            component: PatientLogin
        },
        {
            path: '/especialista-login',
            name: 'especialista login',
            component: SpecialistLogin
        },
        {
            path: '/Consulta',
            name: 'Consulta',
            component: SpecialistConsult
        },
        {
            path: '/especialista-select',
            name: 'especialista select',
            component: SpecialistSelect
        },
        {
            path: '/nuevo-paciente',
            name: 'nuevo paciente',
            component: NewPatient
        },
        {
            path: '/paciente-result/:legalId',
            name: 'paciente result',
            component: () => import('@/views/PatientResult.vue')
        },
        {
            path: '/paciente-perfil/:legalId',
            name: 'paciente perfil',
            component: () => import('@/views/PatientProfile.vue')
        }
    ]
})

export default router
