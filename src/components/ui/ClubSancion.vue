<template>
    <div class="flex gap-2 items-center justify-center">
        <h2 class="text-xl font-bold w-1/2">🏟️ Sanción a Club</h2>
        <div class="flex gap-2 w-full justify-between items-center">
            <input v-model="id" type="text" class="border p-2 rounded w-2/2" placeholder="Buscar club por DNI/FICHA"
                @keypress.enter.prevent="buscarClub" />
            <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded w-1/5" @click.prevent="buscarClub">
                Buscar
            </button>
            <button type="submit" class="bg-orange-600 text-white px-4 py-2 rounded w-1/5" @click.prevent="limpiar">
                Limpiar
            </button>
        </div>
    </div>
    <form class="space-y-4 pt-4">

        <div class="info-jugador flex gap-2" v-if="resultados.nombre">
            <p class="w-1/2 font-medium border rounded p-2">
                Club: {{ resultados.nombre }}
            </p>
            <p
                :class="resultados.estado === 'ACTIVO' ? 'w-1/2 font-medium border rounded p-2 text-green-600' : 'w-1/2 font-medium border rounded p-2 text-red-600'">
                Estado: {{ resultados.estado }}</p>
        </div>

        <div>
            <label class="block font-medium">Tipo de Sanción</label>
            <select class="w-full border p-2 rounded">
                <option>Multa económica</option>
                <option>Reducción de puntos</option>
                <option>Advertencia</option>
            </select>
        </div>

        <div>
            <label class="block font-medium">Monto de Multa (si aplica)</label>
            <input type="number" placeholder="$" class="w-full border p-2 rounded" />
        </div>
        <div>
            <label class="block font-medium">Puntos a reducir (si aplica)</label>
            <input type="number" placeholder="Ej: -3" class="w-full border p-2 rounded" />
        </div>
        <div>
            <label class="block font-medium">Motivo</label>
            <textarea class="w-full border p-2 rounded"></textarea>
        </div>
        <div class="flex items-center  justify-center w-full mx-auto">
            <button class="bg-red-600 text-white px-4 py-2 rounded ">
                Guardar
            </button>
            <button class="bg-orange-600 text-white px-4 py-2 rounded ml-2">Cancelar y Limpiar</button>
        </div>
    </form>
</template>
<script>
import axios from "axios";
export default {
    name: "ClubSancion",
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
            tabs: ["Jugador", "Cuerpo Técnico", "Club", "Árbitro"],
            activeTab: "Jugador",
            resultados: {},
        };
    },
    methods: {
        buscarClub() {
            if (!this.id) {
                alert("Debe ingresar un ID");
                return;
            }
            let id = Number(this.id);
            console.log("Buscando club...");
            axios
                .get("http://localhost:8080/api/club/" + id)
                .then((response) => {
                    this.resultados = response.data;
                    console.log(this.resultados);
                })
                .catch((error) => {
                    console.error("Error buscando club:", error);
                });
        },
        limpiar() {
            this.id = "";
            this.resultados = {};
            this.show = false;
        },
    },
};
</script>
<style>
textarea {
    resize: none;
    height: 100px;
}
</style>