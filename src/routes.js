import { createRouter, createWebHistory } from "vue-router";

// Importamos formularios
import RegistroJugador from "./components/RegistroJugador.vue";
import RegistroEntrenador from "./components/RegistroEntrenador.vue";
import RegistroClub from "./components/RegistroClub.vue";
import RegistroArbitro from "./components/RegistroArbitro.vue";
import BuscarEntidad from "./views/BuscarEntidad.vue";
const routes = [
  {
    path: "/torneos/nuevo",
    name: "registrar-torneo",
    component: () => import("./views/RegistrarTorneoView.vue"),
  },
  { path: "/", component: () => import("./views/PosicionesView.vue") }, // redirigir por defecto
  { path: "/jugadores", name: "registrar-jugador", component: RegistroJugador },
  { path: "/entrenadores", component: RegistroEntrenador },
  { path: "/clubes", component: RegistroClub },
  { path: "/arbitros", component: RegistroArbitro },
  {
    path: "/buscar/jugadores",
    component: BuscarEntidad,
    name: "buscar-jugadores",
    props: { tipo: "jugador" },
  },
  {
    path: "/buscar/entrenadores",
    component: BuscarEntidad,
    name: "buscar-entrenadores",
    props: { tipo: "entrenador" },
  },
  {
    path: "/buscar/clubes",
    component: BuscarEntidad,
    name: "buscar-clubes",
    props: { tipo: "club" },
  },
  {
    path: "/buscar/torneos",
    name: "buscar-torneos",
    component: BuscarEntidad,
    props: { tipo: "torneo" },
  },
  {
    path: "/buscar/arbitros",
    name: "buscar-arbitros",
    component: BuscarEntidad,
    props: { tipo: "arbitro" },
  },
  {
    path: "/sanciones",
    name: "registrar-sancion",
    component: () => import("./views/RegistroSancion.vue"),
  },
  {
    path: "/sanciones/buscar",
    name: "buscar-sanciones",
    component: () => import("./views/BuscarSanciones.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
