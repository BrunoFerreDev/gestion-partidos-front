<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Registrar Eventos del Partido</h1>

    <!-- Formulario -->
    <div class="bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <label class="block font-medium">Tipo de Evento</label>
        <select v-model="nuevoEvento.tipo" class="w-full border rounded p-2">
          <option disabled value="">Seleccione...</option>
          <option value="gol">Gol</option>
          <option value="amonestacion">Amonestación</option>
          <option value="expulsion">Expulsión</option>
          <option value="sustitucion">Sustitución</option>
        </select>
      </div>

      <div>
        <label class="block font-medium">Jugador a afectar</label>
        <input
          v-model="nuevoEvento.jugador"
          type="text"
          placeholder="Nombre del jugador"
          class="w-full border rounded p-2"
        />
      </div>

      <div>
        <label class="block font-medium">Minuto</label>
        <input
          v-model.number="nuevoEvento.minuto"
          type="number"
          placeholder="Ej: 45"
          class="w-full border rounded p-2"
        />
      </div>

      <div v-if="nuevoEvento.tipo === 'sustitucion'">
        <label class="block font-medium">Nro del Jugador que entra</label>
        <input
          v-model="nuevoEvento.jugadorEntra"
          type="text"
          placeholder="Nombre del jugador que entra"
          class="w-full border rounded p-2"
        />
      </div>

      <button
        @click="agregarEvento"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar Evento
      </button>
    </div>

    <!-- Línea de tiempo -->
    <div v-if="eventos.length" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Línea de Tiempo</h2>
      <ul class="space-y-2">
        <li
          v-for="(e, i) in eventosOrdenados"
          :key="i"
          class="p-2 border rounded flex justify-between bg-gray-50"
        >
          <span>
            <strong>{{ e.minuto }}'</strong> — {{ e.tipo }} —
            {{ e.jugador }}
            <span v-if="e.tipo === 'sustitucion'">
              (Entra: {{ e.jugadorEntra }})
            </span>
          </span>
          <button @click="eliminarEvento(i)" class="text-red-600 hover:underline">
            Eliminar
          </button>
        </li>
      </ul>
    </div>

    <!-- Resumen de jugadores -->
    <div v-if="jugadoresResumen.length" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Resumen del Partido</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">Jugador</th>
            <th class="border p-2">Goles</th>
            <th class="border p-2">Amarillas</th>
            <th class="border p-2">Expulsado</th>
            <th class="border p-2">Sustitución</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(jugador, idx) in jugadoresResumen" :key="idx">
            <td class="border p-2">{{ jugador.nombre }}</td>
            <td class="border p-2 text-center">{{ jugador.goles }}</td>
            <td class="border p-2 text-center">{{ jugador.amarillas }}</td>
            <td class="border p-2 text-center">
              <span v-if="jugador.expulsado" class="text-red-600 font-bold">Sí</span>
              <span v-else>No</span>
            </td>
            <td class="border p-2">
              <span v-if="jugador.sustitucion" class="text-blue-600">
                Entra: {{ jugador.sustitucion }}
              </span>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        @click="guardarEventos"
        class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar Todo
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";

const nuevoEvento = reactive({
  tipo: "",
  jugador: "",
  minuto: null,
  jugadorEntra: ""
});

const eventos = ref([]); // Todos los eventos cargados

const eventosOrdenados = computed(() =>
  [...eventos.value].sort((a, b) => a.minuto - b.minuto)
);

const jugadoresResumen = computed(() => {
  const jugadores = [];

  for (const e of eventosOrdenados.value) {
    let jugador = jugadores.find(j => j.nombre === e.jugador);

    if (!jugador) {
      jugador = {
        nombre: e.jugador,
        goles: 0,
        amarillas: 0,
        expulsado: false,
        expulsiones: 0,
        sustitucion: null,
        sustituciones: 0
      };
      jugadores.push(jugador);
    }

    // Si ya está expulsado o sustituido, ignorar eventos posteriores
    if (jugador.expulsado || jugador.sustituciones >= 1) {
      continue;
    }

    switch (e.tipo) {
      case "gol":
        jugador.goles++;
        break;
      case "amonestacion":
        if (jugador.amarillas < 2) {
          jugador.amarillas++;
          if (jugador.amarillas === 2) {
            jugador.expulsado = true;
            jugador.expulsiones++;
          }
        }
        break;
      case "expulsion":
        if (jugador.expulsiones < 1) {
          jugador.expulsado = true;
          jugador.expulsiones++;
        }
        break;
      case "sustitucion":
        if (jugador.sustituciones < 1) {
          jugador.sustitucion = e.jugadorEntra || "Desconocido";
          jugador.sustituciones++;
        }
        break;
    }
  }

  return jugadores;
});

function agregarEvento() {
  if (!nuevoEvento.tipo || !nuevoEvento.jugador || !nuevoEvento.minuto) {
    alert("Complete los campos obligatorios");
    return;
  }

  // ✅ Validación previa
  const eventosPrevios = eventos.value
    .filter(e => e.jugador === nuevoEvento.jugador && e.minuto < nuevoEvento.minuto);

  const fueExpulsado = eventosPrevios.some(e =>
    e.tipo === "expulsion" ||
    (e.tipo === "amonestacion" && contarAmarillasHasta(e.minuto, nuevoEvento.jugador) >= 2)
  );

  const fueSustituido = eventosPrevios.some(e => e.tipo === "sustitucion");

  if (fueExpulsado || fueSustituido) {
    alert(`⚠ El jugador ${nuevoEvento.jugador} ya fue ${
      fueExpulsado ? "expulsado" : "sustituido"
    } antes del minuto ${nuevoEvento.minuto} y no puede recibir más eventos.`);
    limpiarFormulario();
    return;
  }

  eventos.value.push({ ...nuevoEvento });
  limpiarFormulario();
}

function contarAmarillasHasta(minuto, jugador) {
  return eventos.value.filter(
    e => e.jugador === jugador && e.tipo === "amonestacion" && e.minuto <= minuto
  ).length;
}

function limpiarFormulario() {
  nuevoEvento.tipo = "";
  nuevoEvento.jugador = "";
  nuevoEvento.minuto = null;
  nuevoEvento.jugadorEntra = "";
}

function eliminarEvento(index) {
  eventos.value.splice(index, 1);
}

function guardarEventos() {
  console.log("Datos a enviar:", {
    eventos: eventosOrdenados.value,
    resumen: jugadoresResumen.value
  });
  // Aquí harías la llamada a tu API con fetch/axios
}
</script>