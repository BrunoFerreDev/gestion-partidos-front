<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <header class="bg-white rounded-lg shadow p-4 mb-4 sticky top-4 z-10">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h1 class="text-xl font-bold">Panel de árbitro — Cargar partido</h1>
            <p class="text-xs text-gray-500">
              Modo mobile-first · Registra amonestaciones, expulsiones,
              sustituciones, goles e informa en PDF.
            </p>
          </div>
          <div class="flex gap-2">
            <button @click="generateReport" class="btn">Ver informe</button>
            <button @click="exportReportPDF" class="btn">Exportar PDF</button>
          </div>
        </div>
      </header>

      <!-- Match info -->
      <section class="bg-white rounded-lg shadow p-3 mb-4">
        <div class="grid grid-cols-1 gap-2">
          <input
            v-model="match.home"
            placeholder="Equipo local"
            class="input"
          />
          <input
            v-model="match.away"
            placeholder="Equipo visitante"
            class="input"
          />
          <div class="flex gap-2">
            <input
              v-model.number="match.duration"
              type="number"
              placeholder="Duración (min)"
              class="input flex-1"
            />
            <input v-model="match.date" type="date" class="input w-40" />
          </div>
        </div>
      </section>

      <!-- Players & Quick actions -->
      <section class="bg-white rounded-lg shadow p-3 mb-4">
        <h2 class="font-semibold mb-2">Plantel</h2>
        <form
          @submit.prevent="addPlayer"
          class="grid grid-cols-1 sm:grid-cols-4 gap-2"
        >
          <input
            v-model="newPlayer.name"
            placeholder="Nombre"
            class="input sm:col-span-2"
          />
          <input
            v-model.number="newPlayer.number"
            placeholder="#"
            type="number"
            class="input w-full sm:w-24"
          />
          <select v-model="newPlayer.team" class="input">
            <option :value="match.home">{{ match.home || "Local" }}</option>
            <option :value="match.away">{{ match.away || "Visitante" }}</option>
          </select>
          <button class="btn sm:col-span-4">Agregar jugador</button>
        </form>

        <div class="mt-3 grid grid-cols-1 gap-2 max-h-64 overflow-auto">
          <div
            v-for="p in players"
            :key="p.id"
            class="p-2 rounded border flex items-center justify-between"
          >
            <div>
              <div class="text-sm font-medium">
                #{{ p.number }} — {{ p.name }}
              </div>
              <div class="text-xs text-gray-500">
                {{ p.team }} • {{ statusText(p) }}
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="quickEvent('goal', p)"
                :disabled="locked(p)"
                class="btn-sm"
              >
                Gol
              </button>
              <button
                @click="quickEvent('yellow', p)"
                :disabled="locked(p)"
                class="btn-sm"
              >
                A
              </button>
              <button
                @click="quickEvent('red', p)"
                :disabled="locked(p)"
                class="btn-sm"
              >
                R
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Event form -->
      <section class="bg-white rounded-lg shadow p-3 mb-4">
        <h2 class="font-semibold mb-2">Agregar evento</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <select v-model="event.type" class="input">
            <option value="goal">Gol</option>
            <option value="yellow">Amarilla</option>
            <option value="red">Expulsión directa</option>
            <option value="sub">Sustitución</option>
            <option value="other">Otro</option>
          </select>

          <select v-model="event.playerId" class="input">
            <option value="" disabled>Seleccionar jugador</option>
            <option
              v-for="p in players"
              :key="p.id"
              :value="p.id"
              :disabled="locked(p)"
            >
              #{{ p.number }} - {{ p.name }}
            </option>
          </select>

          <input
            v-model.number="event.minute"
            type="number"
            :max="match.duration"
            placeholder="Minuto"
            class="input"
          />
        </div>
        <textarea
          v-model="event.notes"
          placeholder="Notas (opcional)"
          class="input h-20 mt-2"
        ></textarea>
        <div class="flex gap-2 mt-3">
          <button @click="addEventFromForm" class="btn flex-1">
            Agregar evento
          </button>
          <button @click="clearEventForm" class="btn-outline">Limpiar</button>
        </div>
      </section>

      <!-- Substitution quick -->
      <section class="bg-white rounded-lg shadow p-3 mb-4">
        <h2 class="font-semibold mb-2">Sustitución rápida</h2>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <select v-model="sub.fromId" class="input sm:col-span-2">
            <option value="">Jugador a sacar</option>
            <option
              v-for="p in players.filter(
                (p) => !p.substituted && !isExpelled(p)
              )"
              :key="p.id"
              :value="p.id"
            >
              #{{ p.number }} - {{ p.name }} ({{ p.team }})
            </option>
          </select>
          <input
            v-model="sub.toName"
            placeholder="Nombre suplente"
            class="input"
          />
          <input
            v-model.number="sub.toNumber"
            type="number"
            placeholder="# suplente"
            class="input"
          />
          <select v-model="sub.team" class="input">
            <option :value="match.home">{{ match.home || "Local" }}</option>
            <option :value="match.away">{{ match.away || "Visitante" }}</option>
          </select>
          <input
            v-model.number="eventMinute"
            type="number"
            placeholder="Minuto"
            class="input w-full sm:w-28"
          />
          <button @click="makeSub" class="btn sm:col-span-4">
            Confirmar sustitución
          </button>
        </div>
      </section>

      <!-- Timeline -->
      <section class="bg-white rounded-lg shadow p-3 mb-12">
        <h2 class="font-semibold mb-2">Cronología</h2>
        <div v-if="events.length === 0" class="text-sm text-gray-500">
          No hay eventos registrados.
        </div>
        <ul class="space-y-2">
          <li
            v-for="(e, idx) in sortedEvents"
            :key="idx"
            class="p-2 border rounded"
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="text-sm font-medium">
                  {{ e.minute }}' — {{ labelFor(e.type) }} —
                  {{ e.playerName || "-" }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ e.team || "" }} • {{ e.notes }}
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="revertEvent(idx)" class="btn-sm">
                  Deshacer
                </button>
                <button @click="removeEvent(idx)" class="btn-sm btn-danger">
                  Borrar
                </button>
              </div>
            </div>
          </li>
        </ul>

        <div class="mt-4 flex gap-2">
          <button @click="generateReport" class="btn">
            Ver / Editar informe
          </button>
          <button @click="downloadReport" class="btn-outline">
            Descargar JSON
          </button>
        </div>
      </section>

      <!-- Report modal (full screen on mobile) -->
      <div
        v-if="reportVisible"
        class="fixed inset-0 bg-black/50 z-20 p-4 overflow-auto"
      >
        <div class="bg-white rounded-lg shadow-lg mx-auto max-w-xl p-4">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-lg font-semibold">Informe del partido</h3>
            <div class="flex gap-2">
              <button @click="exportReportPDF" class="btn">Exportar PDF</button>
              <button @click="reportVisible = false" class="btn-outline">
                Cerrar
              </button>
            </div>
          </div>

          <div id="reportContent" class="mt-3 text-sm">
            <div class="mb-3">
              <strong>{{ match.home }}</strong> vs
              <strong>{{ match.away }}</strong>
              <div class="text-xs text-gray-500">
                Duración: {{ match.duration }}' • Fecha: {{ match.date }}
              </div>
            </div>

            <div class="mb-2">
              <h4 class="font-semibold">Eventos</h4>
              <ol class="list-decimal ml-5">
                <li
                  v-for="e in sortedEvents"
                  :key="e.minute + e.type + e.playerId"
                >
                  <strong>{{ e.minute }}' - {{ labelFor(e.type) }}</strong> —
                  {{ e.playerName || e.notes }}
                  <span class="text-xs text-gray-500">({{ e.team }})</span>
                </li>
              </ol>
            </div>

            <div>
              <h4 class="font-semibold">Jugadores</h4>
              <ul class="list-disc ml-5 text-xs">
                <li v-for="p in players" :key="p.id">
                  #{{ p.number }} - {{ p.name }} — {{ p.team }} — Amarillas:
                  {{ p.yellowCount || 0 }} • Rojas: {{ p.redCount || 0 }} •
                  Sustituido: {{ p.substituted ? "Sí" : "No" }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button @click="downloadReport" class="btn">Descargar JSON</button>
            <button @click="reportVisible = false" class="btn-outline">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArbitroPanelMobile",
  data() {
    return {
      match: {
        home: "Local",
        away: "Visitante",
        duration: 90,
        date: new Date().toISOString().slice(0, 10),
      },
      players: [],
      newPlayer: { name: "", number: null, team: "Local" },
      events: [],
      event: { type: "goal", playerId: "", minute: 1, notes: "" },
      eventMinute: 1,
      sub: { fromId: "", toName: "", toNumber: null, team: "" },
      reportVisible: false,
    };
  },
  computed: {
    sortedEvents() {
      return [...this.events].sort((a, b) => a.minute - b.minute);
    },
    prettyReport() {
      return JSON.stringify(this.buildReport(), null, 2);
    },
  },
  created() {
    this.sub.team = this.match.home;
  },
  methods: {
    statusText(p) {
      if (p.expulsed) return "Expulsado";
      if (p.substituted) return "Sustit.";
      return "Activo";
    },
    locked(p) {
      return p.substituted || p.expulsed;
    },
    isExpelled(p) {
      return p.expulsed;
    },

    addPlayer() {
      if (!this.newPlayer.name || !this.newPlayer.number)
        return alert("Completá nombre y número");
      const id =
        Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      this.players.push({
        id,
        name: this.newPlayer.name,
        number: this.newPlayer.number,
        team: this.newPlayer.team || this.match.home,
        yellowCount: 0,
        redCount: 0,
        substituted: false,
        expulsed: false,
      });
      this.newPlayer = { name: "", number: null, team: this.match.home };
    },

    quickEvent(type, player) {
      this.event.type = type;
      this.event.playerId = player.id;
      this.event.minute = this.eventMinute || 1;
      this.addEventFromForm();
    },

    addEventFromForm() {
      const p = this.players.find((x) => x.id === this.event.playerId);
      if (!p && this.event.type !== "sub")
        return alert("Seleccioná un jugador válido");
      if (p && this.locked(p))
        return alert(
          "No se pueden agregar eventos a un jugador sustituido o expulsado"
        );
      const minute = Number(this.event.minute) || 0;
      const base = {
        minute,
        type: this.event.type,
        notes: this.event.notes || "",
      };
      if (this.event.type === "sub") return this.makeSub();
      const ev = { ...base, playerId: p.id, playerName: p.name, team: p.team };
      this.events.push(ev);

      if (this.event.type === "yellow") {
        p.yellowCount = (p.yellowCount || 0) + 1;
        if (p.yellowCount >= 2) {
          p.redCount = (p.redCount || 0) + 1;
          p.expulsed = true;
          this.events.push({
            minute,
            type: "red-yellow",
            playerId: p.id,
            playerName: p.name,
            team: p.team,
            notes: "2ª amarilla -> expulsado",
          });
        }
      }

      if (this.event.type === "red") {
        p.redCount = (p.redCount || 0) + 1;
        p.expulsed = true;
      }

      if (this.event.type === "goal") p.goals = (p.goals || 0) + 1;
      this.clearEventForm();
    },

    makeSub() {
      const from = this.players.find((x) => x.id === this.sub.fromId);
      if (!from) return alert("Seleccioná el jugador a sacar");
      if (this.isExpelled(from))
        return alert("No se puede sustituir a un jugador expulsado");
      if (from.substituted) return alert("Ese jugador ya fue sustituido");
      if (!this.sub.toName || !this.sub.toNumber)
        return alert("Completá los datos del suplente");
      const id =
        Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const incoming = {
        id,
        name: this.sub.toName,
        number: this.sub.toNumber,
        team: this.sub.team || from.team,
        yellowCount: 0,
        redCount: 0,
        substituted: false,
        expulsed: false,
      };
      this.players.push(incoming);
      from.substituted = true;
      const minute = Number(this.eventMinute) || 0;
      this.events.push({
        minute,
        type: "sub-out",
        playerId: from.id,
        playerName: from.name,
        team: from.team,
        notes: `Sale por ${incoming.name}`,
      });
      this.events.push({
        minute,
        type: "sub-in",
        playerId: incoming.id,
        playerName: incoming.name,
        team: incoming.team,
        notes: `Entra por ${from.name}`,
      });
      this.sub = {
        fromId: "",
        toName: "",
        toNumber: null,
        team: this.match.home,
      };
    },

    removeEvent(idx) {
      const e = this.events.splice(idx, 1)[0];
      if (!e) return;
      const p = this.players.find((x) => x.id === e.playerId);
      if (!p) return;
      if (e.type === "goal") p.goals = Math.max(0, (p.goals || 0) - 1);
      if (e.type === "yellow") {
        p.yellowCount = Math.max(0, (p.yellowCount || 0) - 1);
        const autoIdx = this.events.findIndex(
          (ev) =>
            ev.playerId === p.id &&
            ev.type === "red-yellow" &&
            ev.minute === e.minute
        );
        if (autoIdx !== -1) {
          this.events.splice(autoIdx, 1);
          p.expulsed = false;
          p.redCount = Math.max(0, (p.redCount || 0) - 1);
        }
      }
      if (e.type === "red") {
        p.redCount = Math.max(0, (p.redCount || 0) - 1);
        p.expulsed = false;
      }
      if (e.type === "sub-out") {
        p.substituted = false;
      }
    },

    revertEvent(idx) {
      this.removeEvent(idx);
    },

    clearEventForm() {
      this.event = { type: "goal", playerId: "", minute: 1, notes: "" };
    },

    labelFor(t) {
      const map = {
        goal: "Gol",
        yellow: "Amarilla",
        red: "Expulsión",
        "red-yellow": "Expulsión (2ª amarilla)",
        sub: "Sustitución",
        "sub-in": "Entrada",
        "sub-out": "Salida",
        other: "Otro",
      };
      return map[t] || t;
    },

    buildReport() {
      return {
        match: this.match,
        players: this.players.map((p) => ({
          name: p.name,
          number: p.number,
          team: p.team,
          yellowCount: p.yellowCount,
          redCount: p.redCount,
          substituted: !!p.substituted,
          expulsed: !!p.expulsed,
          goals: p.goals || 0,
        })),
        events: this.sortedEvents,
      };
    },

    generateReport() {
      this.reportVisible = true;
    },

    downloadReport() {
      const data = JSON.stringify(this.buildReport(), null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${this.match.home || "local"}_vs_${
        this.match.away || "visitante"
      }_informe.json`;
      a.click();
      URL.revokeObjectURL(url);
    },

    // PDF export using html2pdf (loads CDN if needed) - exports the report modal (or full page if closed)
    async exportReportPDF() {
      const targetId = this.reportVisible ? "reportContent" : null;
      const element = targetId
        ? document.getElementById(targetId)
        : document.body;
      if (!element) return alert("No hay contenido para exportar");

      // load html2pdf if not present
      if (typeof window.html2pdf === "undefined") {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        }).catch(() => {
          return alert("No se pudo cargar la librería de exportación");
        });
      }

      const opt = {
        margin: 10,
        filename: `${this.match.home || "local"}_vs_${
          this.match.away || "visitante"
        }_informe.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // add a temporary header with match info to the exported DOM
      const header = document.createElement("div");
      header.style.textAlign = "center";
      header.style.marginBottom = "8px";
      header.innerHTML = `<h2>${this.match.home || ""} vs ${
        this.match.away || ""
      }</h2><div style="font-size:12px">Duración: ${
        this.match.duration
      }' • Fecha: ${this.match.date}</div>`;

      const wrapper = document.createElement("div");
      wrapper.appendChild(header);
      wrapper.appendChild(element.cloneNode(true));

      // use html2pdf
      try {
        window.html2pdf().set(opt).from(wrapper).save();
      } catch (err) {
        alert("Error al generar PDF: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
.input {
  @reference "tailwindcss"
   @apply w-full border rounded px-3 py-2 text-sm;
}
.btn {
  @reference "tailwindcss"

  @apply bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm font-medium;
}
.btn-outline {
  @reference "tailwindcss"

  @apply border px-4 py-2 rounded text-sm;
}
.btn-sm {
  @reference "tailwindcss"

  @apply bg-gray-100 px-3 py-1 rounded text-xs;
}
.btn-danger {
  @reference "tailwindcss"

  @apply bg-red-600 text-white px-3 py-1 rounded text-xs;
}
@media (min-width: 640px) {
  @reference "tailwindcss"
  .input {
    @apply text-sm;
  }
}
</style>
