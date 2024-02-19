<template>
    <div class="w-full h-full">
        <h3 class="ms-2 text-2xl">getShips</h3>
        <ol class="list-decimal p-5">
            <li v-for="(ship, index) in data.ships" :key="ship.id" class="underline decoration-blue-500 ms-3">{{ ship.name }} / {{ ship.type }}
            </li>
        </ol>
        <pre> {{ data }} </pre>
    </div>
</template>

<script lang="ts" setup>

useSeoMeta({
    title: 'GraphQL',
})

import getShips from '../queries/getShips'

const variables = { limit: 10 }

const { data } = await useAsyncQuery(getShips, variables)

</script>

<style lang="scss" scoped></style>