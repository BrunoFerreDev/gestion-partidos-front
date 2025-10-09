<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-md">
        <div
          class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 flex justify-between items-start"
        >
          <div>
            <h1
              class="text-3xl font-bold text-white flex items-center gap-3 mb-2"
            >
              <IconBallFootball size="38" color="black" />
              {{ torneo.nombre }}
            </h1>
            <h4 class="text-gray-100 capitalize">
              {{
                torneo.temporada +
                " - " +
                torneo.tipo +
                " - " +
                " Fecha: " +
                partido.fechaTorneo +
                " - " +
                partido.estado
              }}
            </h4>
            <p class="text-green-100 mt-2">Complete los datos del encuentro</p>
          </div>
          <button
            @click="$router.back()"
            class="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-colors shadow-lg"
          >
            Volver
          </button>
        </div>
        <div class="p-8">
          <div class="mb-8">
            <h2
              class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
            >
              <Users class="w-5 h-5 text-green-600" />
              Equipos
            </h2>
            <div class="flex gap-10 items-center justify-around w-full mt-5">
              <div class="flex flex-col items-center">
                <img
                  src="https://www.pngkit.com/png/full/1-11662_futbol-logo-png-futbol-png.png"
                  alt=""
                  class="w-12"
                />
                <p class="text-sm font-medium text-gray-700">Equipo Local</p>
                <p class="text-lg font-semibold text-gray-800">
                  {{ partido.local }}
                </p>
              </div>
              <strong class="text-2xl font-bold text-gray-800">vs</strong>
              <div class="flex flex-col items-center">
                <img
                  src="https://www.pngkit.com/png/full/1-11662_futbol-logo-png-futbol-png.png"
                  alt=""
                  class="w-12"
                />
                <p class="text-sm font-medium text-gray-700">
                  Equipo Visitante
                </p>
                <p class="text-lg font-semibold text-gray-800">
                  {{ partido.visitante }}
                </p>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center justify-between">
              <h2
                class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
              >
                <Calendar class="text-green-600" size="24" />
                Fecha y Hora
              </h2>
              <Lock v-if="fechaHabilitada" class="text-green-600" size="24" />
              <LockKeyholeOpenIcon v-else class="text-green-600" size="24" />
            </div>
            <div class="">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  v-if="!partido.fechaCalendario"
                >
                  Fecha
                </label>
                <span
                  v-if="partido.fechaCalendario"
                  class="text-gray-700 uppercase"
                  >{{ partido.fechaCalendario }}</span
                >
                <input
                  type="datetime-local"
                  name="fecha"
                  :disabled="fechaHabilitada"
                  v-model="fecha"
                  v-else
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div class="mb-8 flex items-center justify-start flex-wrap">
            <button
              v-if="!partido.fechaCalendario"
              @click="abrirModa = true"
              class="bg-green-600 text-white cursor-pointer border border-gray-300 rounded-lg px-3 py-2 hover:bg-green-700 transition inline-flex items-center gap-2"
            >
              Guardar Fecha y Hora
            </button>
            <BaseModal
              title="Confirmar cambio de hora?"
              message="Desea confirmar el cambio de hora?"
              confirmText="Confirmar"
              :show="abrirModa"
              @close="abrirModa = false"
              @confirm="guardarFechaHora"
            />
          </div>
          <DesignarArbitros :partidoId="idPartido" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Calendar, Users } from "lucide-vue-next";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { LockKeyholeOpenIcon } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { IconBallFootball } from "@tabler/icons-vue";
import { Lock } from "lucide-vue-next";
import DesignarArbitros from "../components/ui/DesignarArbitros.vue";
import BaseModal from "../components/ui/BaseModal.vue";
const route = useRoute();
const partido = ref({});
const torneo = ref({});
const idPartido = ref(route.query.idPartido);

const abrirModa = ref(false);

// Estados de habilitación (fecha, estadio, etc.)
const fechaHabilitada = ref();
//Fecha y hora
const fecha = ref("");

const obtenerPartido = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "http://localhost:8080/api/partido/buscar?codigoTorneo=" +
      route.query.codigoTorneo +
      "&fechaTorneo=" +
      route.query.fechaTorneo +
      "&local=" +
      route.query.local +
      "&visita=" +
      route.query.visitante,
    headers: {},
  };
  axios
    .request(config)
    .then((response) => {
      partido.value = response.data;
      fechaHabilitada.value = partido.value.fechaCalendario ? true : false;
    })
    .catch((error) => {
      console.log(error);
    });
};
const obtenerTorneo = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "http://localhost:8080/api/torneo/codigo?codigo=" +
      route.query.codigoTorneo,
    headers: {},
  };
  axios
    .request(config)
    .then((response) => {
      torneo.value = response.data;
      console.log(torneo.value);
      obtenerPartido();
    })
    .catch((error) => {
      console.log(error);
    });
};
const guardarFechaHora = () => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url:
      "http://localhost:8080/api/partido/actualizar/fecha?id=" +
      idPartido.value +
      "&fecha=" +
      fecha.value,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert("Fecha y hora guardada correctamente");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(() => {
  obtenerTorneo();
});
</script>
