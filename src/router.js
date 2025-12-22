import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/torneos",
      component: () => import("./views/Torneos.vue"),
    },
    {
      path: "/clubes",
      component: () => import("./views/Clubes.vue"),
    },
    {
      path: "/arbitros",
      component: () => import("./views/Arbitros.vue"),
    },
  ],
});

export default router;