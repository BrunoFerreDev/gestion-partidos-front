<script setup>
import { IconLayoutDashboardFilled, IconTrophyFilled, IconUsersGroup, IconSettingsFilled, IconHelpCircleFilled, IconLogout2 } from '@tabler/icons-vue';

</script>

<template>
    <nav class="h-screen w-64 bg-gray-50 flex flex-col justify-start items-start p-4 border-r border-gray-300 ">
        <div class="flex items-center justify-center gap-2">
            <picture class="w-12 h-12">
                <img src="/vite.svg" alt="">
            </picture>
            <div class="text-sm">
                <h3>League Manager</h3>
                <strong>admin</strong>
            </div>
        </div>
        <ul class="flex flex-col gap-4 mt-4 w-full">
            <RouterLink to="/">
                <li>
                    <IconLayoutDashboardFilled />
                    Dashboard
                </li>
            </RouterLink>
            <RouterLink to="/torneos">
                <li>
                    <IconTrophyFilled />
                    Torneos
                </li>
            </RouterLink>
            <RouterLink to="/clubes">
                <li>
                    <IconUsersGroup />
                    Clubes
                </li>
            </RouterLink>
            <RouterLink to="/arbitros">
                <li>
                    <IconUsersGroup />
                    Arbitros
                </li>
            </RouterLink>
            <RouterLink>
                <li>
                    <IconSettingsFilled />
                    Configuracion
                </li>
            </RouterLink>
        </ul>
        <div class="mt-auto border-t border-gray-300 pt-4 w-full flex flex-col gap-2 items-start ">
            <button>
                <IconHelpCircleFilled />
                Ayuda
            </button>
            <button>
                <IconLogout2 />
                Cerrar Sesión
            </button>
        </div>
    </nav>
</template>
<style scoped>
li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: .8rem;
    width: 100%;

    &:hover {
        background-color: #0d7ff2;
        border-radius: 4px;
        color: #fff;
    }
}

button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: .8rem;
    width: 100%;
    border-radius: 4px;

    &:hover {
        background-color: #0d7ff2;
        border-radius: 4px;
        color: #fff;
    }
}
</style>