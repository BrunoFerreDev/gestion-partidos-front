<script setup lang="ts">
import { IconBallFootball } from '@tabler/icons-vue';
import { IconUsersGroup } from '@tabler/icons-vue';
import { IconTrophyFilled } from '@tabler/icons-vue';
import TableMatches from '../components/TableMatches.vue';

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <div
            class=" flex flex-col gap-2 rounded-2xl p-6 border border-[#e9e8ce] shadow-sm hover:border-primary/50 transition-colors">
            <div class="flex justify-between items-start">
                <p class="text-[#1c1c0d]  text-base font-medium leading-normal">Torneos Activos</p>
                <IconTrophyFilled color="#9e9d47" />
            </div>
            <div class="flex items-end gap-2 mt-2">
                <p class="text-[#1c1c0d] tracking-tight text-3xl font-bold leading-tight">12</p>
                <p class="text-[#078816] text-sm font-bold mb-1 bg-[#078816]/10 px-2 py-0.5 rounded-full">+2%</p>
            </div>
        </div>
        <div
            class="flex flex-col gap-2 rounded-2xl p-6 border border-[#e9e8ce] shadow-sm hover:border-primary/50 transition-colors">
            <div class="flex justify-between items-start">
                <p class="text-[#1c1c0d]  text-base font-medium leading-normal">Clubes Totales</p>
                <IconUsersGroup color="#9e9d47" />
            </div>
            <div class="flex items-end gap-2 mt-2">
                <p class="text-[#1c1c0d] tracking-tight text-3xl font-bold leading-tight">10</p>
                <p class="text-[#078816] text-sm font-bold mb-1 bg-[#078816]/10 px-2 py-0.5 rounded-full">+2%</p>
            </div>
        </div>
        <div
            class="flex flex-col gap-2 rounded-2xl p-6 border border-[#e9e8ce] shadow-sm hover:border-primary/50 transition-colors">
            <div class="flex justify-between items-start">
                <p class="text-[#1c1c0d]  text-base font-medium leading-normal">Partidos Jugados</p>
                <IconBallFootball color="#9e9d47" />
            </div>
            <div class="flex items-end gap-2 mt-2">
                <p class="text-[#1c1c0d] tracking-tight text-3xl font-bold leading-tight">10</p>
                <p class="text-[#078816] text-sm font-bold mb-1 bg-[#078816]/10 px-2 py-0.5 rounded-full">+2%</p>
            </div>
        </div>
        <div
            class="flex flex-col gap-2 rounded-2xl p-6 border border-[#e9e8ce] shadow-sm hover:border-primary/50 transition-colors">
            <div class="flex justify-between items-start">
                <p class="text-[#1c1c0d]  text-base font-medium leading-normal">Jugadores Totales</p>
                <IconUsersGroup color="#9e9d47" />
            </div>
            <div class="flex items-end gap-2 mt-2">
                <p class="text-[#1c1c0d] tracking-tight text-3xl font-bold leading-tight">10</p>
                <p class="text-[#078816] text-sm font-bold mb-1 bg-[#078816]/10 px-2 py-0.5 rounded-full">+2%</p>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 mt-10 max-w-7xl mx-auto">
        <!-- Upcoming Matches Table (Spans 2 columns on large screens) -->
        <div class="xl:col-span-3 flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <h2 class="text-[#1c1c0d] :text-white text-2xl font-bold leading-tight">Próximos Encuentros</h2>
                <button class="text-sm font-bold text-[#1c1c0d] :text-white hover:text-[#9e9d47] transition-colors">Ver
                    todo</button>
            </div>
            <TableMatches />
        </div>
        <!-- Side Widget: Recent Activity & Quick Actions -->
        <div class="flex flex-col items-center gap-8">
            <!-- Quick Actions -->
            <div class="flex flex-col gap-4">
                <h2 class="text-[#1c1c0d] :text-white text-xl font-bold leading-tight">Acciones Rápidas</h2>
                <div class="flex flex-col max-w-32 items-center justify-center gap-3">
                    <button
                        class="flex flex-col items-center justify-center p-4 rounded-2xl bg-white :bg-[#1a1a0b] border border-[#e9e8ce] :border-[#3a3928] hover:border-primary transition-all group shadow-sm h-32">
                        <div
                            class="size-10 rounded-full bg-[#f4f4e6] :bg-[#2a2915] flex items-center justify-center mb-2 group-hover:bg-primary transition-colors">
                            <span class="material-symbols-outlined text-[#1c1c0d]">add</span>
                        </div>
                        <span class="text-sm font-bold text-[#1c1c0d] :text-white text-center">Registrar
                            Equipo</span>
                    </button>
                    <button
                        class="flex flex-col items-center justify-center p-4 rounded-2xl bg-white :bg-[#1a1a0b] border border-[#e9e8ce] :border-[#3a3928] hover:border-primary transition-all group shadow-sm h-32">
                        <div
                            class="size-10 rounded-full bg-[#f4f4e6] :bg-[#2a2915] flex items-center justify-center mb-2 group-hover:bg-primary transition-colors">
                            <span class="material-symbols-outlined text-[#1c1c0d]">edit_calendar</span>
                        </div>
                        <span class="text-sm font-bold text-[#1c1c0d] :text-white text-center">Programar
                            Partido</span>
                    </button>
                </div>
            </div>

        </div>
    </div>

</template>