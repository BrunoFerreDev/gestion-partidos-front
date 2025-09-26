<template>
    <h1 v-if="jugador">BuscarJugador</h1>
    <FichaJugador v-else :person="jugador" />
</template>

<script setup>
import { ref } from 'vue';
import FichaJugador from '../ui/FichaJugador.vue';
const jugador = ref();

const buscarJugador = () => {
    jugador.value = {
        name: 'Juan Pérez',
        role: 'Jugador',
        email: 'juan.perez@example.com',
        phone: '123-456-789',
        address: '123 calle principal',
        birthdate: '1990-01-01',
        avatar: 'https://via.placeholder.com/150',
    };
};
</script>
