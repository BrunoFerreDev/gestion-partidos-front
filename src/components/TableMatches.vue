<template>
              <div class="overflow-hidden rounded-3xl border border-[#e9e8ce]  bg-white  shadow-sm">
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[700px]">
                        <thead>
                            <tr class="bg-[#f8f8f5] :bg-[#2a2915] border-b border-[#e9e8ce] ">
                                <th
                                    class="px-6 py-4 text-left text-[#9e9d47] text-sm font-semibold uppercase tracking-wider w-24">
                                    Hora</th>
                                <th
                                    class="px-6 py-4 text-left text-[#9e9d47] text-sm font-semibold uppercase tracking-wider">
                                    Equipos</th>
                                <th
                                    class="px-6 py-4 text-left text-[#9e9d47] text-sm font-semibold uppercase tracking-wider w-40">
                                    Estadio</th>
                                <th
                                    class="px-6 py-4 text-right text-[#9e9d47] text-sm font-semibold uppercase tracking-wider w-32">
                                    Estado</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#e9e8ce] :divide-[#3a3928]">
                            <tr class="group hover:bg-[#fcfcf8] :hover:bg-[#23220f] transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex flex-col">
                                        <span class="text-[#1c1c0d] :text-white font-bold">18:00</span>
                                        <span class="text-xs text-[#9e9d47]">12 Oct</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div class="flex items-center gap-2 w-[140px] justify-end">
                                            <span class="text-[#1c1c0d] :text-white font-medium text-sm">Leones
                                                FC</span>
                                     
                                        </div>
                                        <span class="text-[#9e9d47] font-bold text-xs">VS</span>
                                        <div class="flex items-center gap-2 w-[140px]">
                                       
                                            <span class="text-[#1c1c0d] :text-white font-medium text-sm">Tigres</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2 text-[#9e9d47]">
                                        <span class="material-symbols-outlined text-lg">location_on</span>
                                        <span class="text-sm">Estadio Central</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <span
                                        class="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-[#1c1c0d] :text-primary">
                                        Programado
                                    </span>
                                </td>
                            </tr>
              
                        </tbody>
                    </table>
                </div>
            </div>
</template>