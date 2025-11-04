<template>
    <q-layout view="lHh Lpr lFf" class="bg-grey-2">
        <q-page-container>
            <q-page class="flex flex-center" style="min-height: 100vh;">
                <q-card flat bordered class="q-pa-lg shadow-2">
                    <slot />
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
// No script needed for layout wrapper
</script>

<style scoped>
.q-card {
    width: 400px;
    max-width: 90vw;
}
</style>
