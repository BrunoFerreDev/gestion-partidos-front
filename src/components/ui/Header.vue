<template>
    <header class="mx-auto border rounded flex justify-between items-center p-4">
        <img src="/vite.svg" alt="Logo" class="logo h-20">
        <h3>Panel de Administración</h3>
        <div class="flex items-center gap-4">
            <article class="flex flex-col gap-2">
                <span>Usuario </span>
                <span>Usuario</span>
            </article>
            <img src="/vite.svg" alt="Logo" class="logo h-16">
        </div>
    </header>
</template>
<style scoped>
@reference "tailwindcss";
    
header {
    @apply w-[98dvw] xl:w-[95dvw] 2xl:w-[85dvw];
}
</style>