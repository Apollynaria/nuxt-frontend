<template>
    <div class="w-full h-full flex justify-around">
        <div>
            <h3 class="ms-2 text-2xl">getShips&limit</h3>
            <ol class="list-decimal p-5">
                <li v-for="(ship, index) in data.ships" :key="ship.id" class="underline decoration-blue-500 ms-3">{{
                    ship.name }} / {{ ship.type }}
                </li>
            </ol>
            <pre> {{ data }} </pre>
        </div>

        <div>
            <h3 class="ms-2 text-2xl">getRockets&offset</h3>
            <ol class="list-decimal p-5">
                <li v-for="(rocket, index) in data2.rockets" :key="rocket.id" class="underline decoration-blue-500 ms-3">
                {{rocket.name }} / {{ rocket.country }}
                </li>
            </ol>
            <pre> {{ data2 }} </pre>
        </div>

    </div>
</template>

<script lang="ts" setup>

useSeoMeta({
    title: 'GraphQL',
});

import getShips from '../queries/getShips';
import getRockets from '../queries/getRockets';

const variables = { limit: 5 };
const variables2 = {offset: 2};

const { data } = await useAsyncQuery(getShips, variables);
const { data: data2 } = await useAsyncQuery(getRockets, variables2);


</script>

<style lang="scss" scoped></style>