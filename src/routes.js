import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./components/ui/Posiciones.vue")
    },
    {
        path: "/torneo/nuevo",
        name: "nuevo-torneo",
        component: () => import("./components/forms/FormTorneo.vue")
    },
    {
        path: "/torneo/buscar",
        name: "buscar-torneo",
        component: () => import("./components/buscar/BuscarTorneo.vue")
    },
    {
        path: "/partidos/buscar",
        props: route => ({
            codigoTorneo: route.query.codigoTorneo,
            fechaTorneo: route.query.fechaTorneo,
            local: route.query.local,
            visitante: route.query.visitante,
            idPartido: route.query.idPartido
        }),
        name: "partidos",
        component: () => import("./views/ParitdoView.vue")
    },
    {
        path: "/jugador/nuevo",
        name: "nuevo-jugador",
        component: () => import("./components/forms/FormJugador.vue")
    },
    {
        path: "/jugador/buscar",
        name: "buscar-jugadores",
        component: () => import("./components/buscar/BuscarJugador.vue")
    },
    {
        path: "/ct/nuevo",
        name: "nuevo-ct",
        component: () => import("./components/forms/FormCT.vue")
    },
    {
        path: "/ct/buscar",
        name: "buscar-ct",
        component: () => import("./components/buscar/BuscarCT.vue")
    },
    {
        path: "/club/nuevo",
        name: "nuevo-club",
        component: () => import("./components/forms/FormClub.vue")
    },
    {
        path: "/club/buscar",
        name: "buscar-club",
        component: () => import("./components/buscar/BuscarClub.vue")
    },
    {
        path: "/arbitro/nuevo",
        name: "nuevo-arbitro",
        component: () => import("./components/forms/FormArbitro.vue")
    },
    {
        path: "/arbitro/buscar",
        name: "buscar-arbitros",
        component: () => import("./components/buscar/BuscarArbitro.vue")
    },
    {
        path: "/sanciones",
        name: "sanciones",
        component: () => import("./views/SancionView.vue")
    },
    {
        path: "/buscar/persona",
        name: "buscar",
        component: () => import("./views/BuscarView.vue")
    },
    {
        path: "/buscar/:tipo",
        name: "buscar-detalle",
        component: () => import("./views/BuscarDetalleView.vue")
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router