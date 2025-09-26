<template>
    <div class="bg-white shadow-lg rounded-lg w-[calc(100%-2rem)] mx-auto">
        <div class="relative bg-gradient-to-r from-blue-700 to-blue-500 rounded-t-lg text-white p-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1">
                        <span class="text-xs text-gray-800 font-bold">EMBLEMA</span>
                    </div>
                    <h2 class="text-2xl font-bold">BOCA UNIDOS (CTES.)</h2>
                </div>

                <div class="text-center">
                    <p class="text-4xl font-extrabold">1:0</p>
                    <p class="text-sm">Resultado Final</p>
                </div>

                <div class="flex items-center space-x-4">
                    <h2 class="text-2xl font-bold">CAMBA CUA</h2>
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1">
                        <span class="text-xs text-gray-800 font-bold">EMBLEMA</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex bg-gray-200 p-2 border-b border-gray-300">
            <button
                class="px-4 py-2 text-gray-800 font-semibold bg-white rounded-md shadow-sm border border-gray-300 mr-2">Local</button>
            <button
                class="px-4 py-2 text-gray-800 font-semibold bg-white rounded-md shadow-sm border border-gray-300 mr-2">Visitante</button>
            <button
                class="px-4 py-2 text-gray-800 font-semibold bg-white rounded-md shadow-sm border border-gray-300">Eventos</button>
        </div>

        <div class="p-6 mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Información del Partido</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label for="matchNum" class="block text-sm font-medium text-gray-700">Núm</label>
                    <input type="text" id="matchNum"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.id" placeholder="52174175">
                </div>

                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">Estado</label>
                    <select id="status" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.status">
                        <option value="scheduled">Programado</option>
                        <option value="in-progress">En Progreso</option>
                        <option value="finished">Finalizado</option>
                    </select>
                </div>

                <div>
                    <label for="stadium" class="block text-sm font-medium text-gray-700">Estadio</label>
                    <div class="flex items-center mt-1">
                        <input type="text" id="stadium"
                            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            v-model="matchData.stadium">
                    </div>
                </div>

                <div>
                    <label for="competition" class="block text-sm font-medium text-gray-700">Competición</label>
                    <input type="text" id="competition"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.competition">
                </div>

                <div>
                    <label for="pitch" class="block text-sm font-medium text-gray-700">Pitch</label>
                    <input type="text" id="pitch"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.pitch">
                </div>

                <div>
                    <label for="dateTime" class="block text-sm font-medium text-gray-700">Fecha/hora</label>
                    <input type="datetime-local" id="dateTime"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.dateTime">
                </div>

                <div>
                    <label for="ageCategory" class="block text-sm font-medium text-gray-700">Categoría de
                        edad</label>
                    <input type="text" id="ageCategory"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.ageCategory">
                </div>

                <div>
                    <label for="attendance" class="block text-sm font-medium text-gray-700">Asistencia</label>
                    <input type="number" id="attendance"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        v-model="matchData.attendance">
                </div>
            </div>
            <div class="border-t-2 border-t-gray-200 mt-4 py-5 flex flex-wrap gap-4">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 w-full">Arbitros y Oficiales del Partido</h3>
                <strong type="text" id="referee"
                    class="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm inline-flex gap-3">Arbitro
                    Principal:<span class="text-gray-800 font-semibold">
                        Principal</span>
                </strong>
                <strong type="text" id="referee"
                    class="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm inline-flex gap-3">Arbitro
                    Asistente:<span class="text-gray-800 font-semibold"> Asistente</span></strong>
                <strong type="text" id="referee"
                    class="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm inline-flex gap-3">Arbitro
                    Asistente
                    2:<span class="text-gray-800 font-semibold"> Asistente 2</span></strong>
                <strong type="text" id="referee"
                    class="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm inline-flex gap-3">Cuarto
                    Arbitro:<span class="text-gray-800 font-semibold">Cuarto</span></strong>


            </div>
            <div class="border-t-2 border-t-gray-200 mt-4 py-5 flex flex-wrap gap-4">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 w-full">Fases del Partido</h3>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">Fase de partido</th>
                            <th class="px-4 py-2">Tiempo Regular</th>
                            <th class="px-4 py-2">Tiempo Añadido</th>
                            <th class="px-4 py-2">Hora Inicio</th>
                            <th colspan="2" class="px-4 py-2">Resultado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Primer Tiempo</td>
                            <td class="text-center"><input type="number" min="1" max="90" value="1"
                                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm"></td>
                            <td class="text-center"><input type="number" min="0" max="90" value="0"
                                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm"></td>
                            <td><input type="time" id="startTime"
                                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm"></td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Segundo Tiempo</td>
                            <td class="text-center"><input type="number" min="1" max="90" value="1"
                                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm"></td>
                            <td class="text-center"><input type="number" min="0" max="90" value="0"
                                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm"></td>
                            <td><input type="time" id="startTime"
                                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm"></td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const matchData = reactive({
    id: '52174175',
    localTeam: 'BOCA UNIDOS (CTES.)',
    awayTeam: 'CAMBA CUA',
    score: '1:0',
    status: 'scheduled',
    competition: 'ZONA 1',
    stadium: 'C.A. BOCA UNIDOS (CTES.)',
    pitch: 'Elegir',
    dateTime: '2025-09-24T12:00',
    ageCategory: 'Seniors',
    attendance: '',
});

const saveData = () => {
    console.log('Datos del partido guardados:', matchData);
    alert('Datos guardados con éxito!');
};
</script>
<style scoped>
table {
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}


#startTime {
    width: 120px;
}
</style>