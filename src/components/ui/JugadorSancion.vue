<template>
    <h2 class="text-xl font-bold mb-4">⚽ Sanción a Jugador</h2>
    <form class="space-y-4 ">
        <div>
            <label class="block font-medium">Jugador</label>
            <div class="flex gap-2 w-full justify-between items-center">
                <input v-model="id" type="text" class="border p-2 rounded w-2/3"
                    placeholder="Buscar jugador por DNI/FICHA" @keypress.enter.prevent="buscarJugador" />
                <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded w-1/5"
                    @click.prevent="buscarJugador">
                    Buscar
                </button>
                <button type="submit" class="bg-orange-600 text-white px-4 py-2 rounded w-1/5" @click.prevent="limpiar">
                    Limpiar
                </button>
            </div>
        </div>
        <div class="info-jugador flex gap-2" v-if="resultados.nombre">
            <p class="w-1/2 font-medium border rounded p-2">
                Nombre: {{ resultados.nombre + " " + resultados.apellido }}
            </p>
            <p class="w-1/2 font-medium border rounded p-2">Club: {{ resultados.nombreClub }}</p>
        </div>
        <div class="flex flex-col gap-1 w-full">
            <label class="block font-medium">Fecha de suspension valida desde: </label>
            <input type="date" class="w-full border p-2 rounded" />
            <label class="block font-medium" for="duracion">Duración</label>
            <input type="number" placeholder="Cantidad de días/partidos" class="w-full border p-2 rounded"
                id="duracion" />
            <div class="flex flex-col w-full">
                <label class="block font-medium w-full">Tipo de Sanción</label>
                <select name="tipo" id="tipo" class=" border rounded h-10 w-full">
                    <option value="fechas">Fechas</option>
                    <option value="dias">Dias</option>
                    <option value="multa">Multa</option>
                </select>
            </div>
            <label class="block font-medium">Multa (opcional)
                <input type="number" placeholder="Monto en $" class="w-full border p-2 rounded" />
            </label>
            <label class="block font-medium">Motivo</label>
            <textarea class="w-full border p-2 rounded"></textarea>
        </div>
        <div class="flex items-center  justify-center w-3/5 mx-auto">
            <button class="bg-red-600 text-white px-4 py-2 rounded ">
                Guardar
            </button>
            <button class="bg-orange-600 text-white px-4 py-2 rounded ml-2">Cancelar y Limpiar</button>
        </div>
    </form>
</template>
<script>
import axios from 'axios';
export default {
    name: "JugadorSancion",
    data() {
        return {
            id: "",
            show: false,
            sancion: {
                entidad: "",
                entidadId: "",
                tipo: "",
                fecha: "",
                duracion: "",
                motivo: "",
            },
            listaEntidades: [],
            resultados: {},
        };
    },
    methods: {
        buscarJugador() {
            if (!this.id) {
                alert("Debe ingresar un ID");
                return;
            }
            let id = Number(this.id);
            console.log("Buscando jugador...");
            axios
                .get("http://localhost:8080/api/jugador/" + id)
                .then((response) => {
                    this.resultados = response.data;
                    console.log(this.resultados);
                })
                .catch((error) => {
                    console.error("Error buscando jugador:", error);
                });
        },
        limpiar() {
            this.show = false;
        },
    },
};
</script>