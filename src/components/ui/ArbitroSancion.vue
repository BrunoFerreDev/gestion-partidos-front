<template>
    <div class="flex gap-2 items-center justify-center">
        <h2 class="text-xl font-bold  w-1/2">⚖️ Sanción a Árbitro</h2>
        <div class="flex gap-2">
            <input v-model="id" type="text" class="border p-2 rounded " placeholder="Buscar árbitro por DNI/FICHA"
                @keypress.enter.prevent="buscarArbitro" />
            <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded w-1/5" @click.prevent="buscarArbitro">
                Buscar
            </button>
            <button type="submit" class="bg-orange-600 text-white px-4 py-2 rounded w-1/5" @click.prevent="limpiar">
                Limpiar
            </button>
        </div>
    </div>
    <form class="space-y-4 pt-4">
        <div class="flex flex-col gap-2">
            <div class="info-jugador flex gap-2" v-if="resultados.nombre">
                <p class="w-1/2 font-medium border rounded p-2">
                    Nombre: {{ resultados.nombre + " " + resultados.apellido }}
                </p>
                <p
                    :class="resultados.estadoPersona === 'ACTIVO' ? 'w-1/2 font-medium border rounded p-2 text-green-600' : 'w-1/2 font-medium border rounded p-2 text-red-600'">
                    Estado: {{ resultados.estadoPersona }}</p>
            </div>
        </div>
        <div class="flex gap-2 items-center">
            <div class="w-full">
                <label class="block font-medium">Duración de la sanción</label>
                <select class=" border p-2 rounded w-full">
                    <option value="dias">Días</option>
                    <option value="años">Años</option>
                </select>
            </div>
            <div class="w-full">
                <label class="block font-medium">Cantidad</label>
                <input type="number" placeholder="Ej: 30 días / 1 año" class=" border p-2 rounded w-full" />
            </div>
        </div>

        <div>
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
import axios from "axios";
export default {
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
        async cargarEntidades() {
            if (!this.sancion.entidad) {
                this.listaEntidades = [];
                return;
            }

            try {
                const response = await fetch(`/api/${this.sancion.entidad}s`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.ok) {
                    this.listaEntidades = await response.json();
                }
            } catch (error) {
                console.error("Error cargando entidades:", error);
            }
        },
        mostrarNombre(item) {
            if (this.sancion.entidad === "club") return item.nombre;
            return `${item.nombre} ${item.apellido}`;
        },
        async guardarSancion() {
            console.log("Datos sanción:", this.sancion);
            // Ejemplo POST
            try {
                const response = await fetch(`/api/sanciones`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(this.sancion),
                });
                if (response.ok) {
                    alert("Sanción registrada con éxito ✅");
                    this.sancion = {
                        entidad: "",
                        entidadId: "",
                        tipo: "",
                        fecha: "",
                        duracion: "",
                        motivo: "",
                    };
                    this.listaEntidades = [];
                } else {
                    alert("Error al guardar sanción ❌");
                }
            } catch (error) {
                console.error("Error guardando sanción:", error);
            }
        },
        cambiarTab(tab) {
            this.limpiar();
            this.activeTab = tab;
        },
        limpiar() {
            this.resultados = {};
            this.id = "";
        },
    },
    computed: {
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
        buscarArbitro() {
            if (!this.id) {
                alert("Debe ingresar un ID");
                return;
            }
            let id = Number(this.id);
            console.log("Buscando arbitro..." + id);
            axios
                .get("http://localhost:8080/api/arbitros/" + id)
                .then((response) => {
                    this.resultados = response.data;
                    console.log(this.resultados);
                })
                .catch((error) => {
                    console.error("Error buscando arbitro:", error);
                });
        },

        buscarArbitro() {
            if (!this.id) {
                alert("Debe ingresar un ID");
                return;
            }
            let id = Number(this.id);
            console.log("Buscando arbitro..." + id);
            axios
                .get("http://localhost:8080/api/arbitros/" + id)
                .then((response) => {
                    this.resultados = response.data;
                    console.log(this.resultados);
                })
                .catch((error) => {
                    console.error("Error buscando arbitro:", error);
                });
        },
    },
}
</script>