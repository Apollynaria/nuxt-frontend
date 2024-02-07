<template>
    <div class="container mx-auto">
        <div>
            <h3 class="mt-2 ">fetch</h3>
            <div v-if="pending">
                Loading ...
            </div>
            <div v-else>
                <ul class="list-disc">
                    <li v-for="(post, index) in posts" :key="index" class="underline decoration-pink-500">{{ post.title }}
                    </li>
                </ul>
            </div>
        </div>
        <button type="button" @click="refresh" class="text-white 
    bg-blue-700 
    hover:bg-blue-800 
    focus:ring-4 
    focus:ring-blue-300 
    font-medium rounded-lg 
    text-sm px-5 py-2.5 mb-2 mt-2
    dark:bg-blue-600 
    dark:hover:bg-blue-700 
    focus:outline-none 
    dark:focus:ring-blue-800">Загрузить заново</button>

        <div>
            <h3 class="mt-2 ">asyncData</h3>
            <ul class="list-disc">
                <li v-for="(user, index) in users" :key="index" class="underline decoration-blue-500">{{ user.name }}</li>
            </ul>
        </div>

    </div>
</template>

<script lang="ts" setup>

 useSeoMeta({
    title: 'Работа с API',
  })

import axios from 'axios'

const { data: posts, pending, refresh } = await useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=10')

</script>

<style lang="scss" scoped></style>