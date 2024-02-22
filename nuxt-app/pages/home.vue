<template>
    <div class="contact">
        <h1 class="text-2xl font-bold underline text-center mt-3">
            Главная страница с анимацией
        </h1>
        <transition-group tag="ul" appear @before-enter="beforeEnter" @enter="enter">
            <li v-for="(card, index) in cards" :key="card.name" :data-index="index">
                <span class="material-icons underline">{{ card.name }}</span>
                <div>{{ card.text }}</div>
                <Icon :name="card.icon" color="black" size="24"/>
            </li>
        </transition-group>

        <div class="flex gap-4 justify-center">
            <my-button title="-1" @click="counterStore.decrement()" color="red"></my-button>
            <h1 class="text-2xl font-bold text-center mt-3">counterStore:</h1>
            <h1 class="text-2xl font-bold text-center mt-3 text-blue-500">{{ counterStore.getCount }}</h1>
            <my-button title="+1" @click="counterStore.increment()" color="green"></my-button>
        </div>

        <div class="flex gap-4 justify-center">
            <h1 class="text-2xl font-bold text-center mt-3">User uuid from userStore:</h1>
            <h1 class="text-2xl font-bold text-center mt-3 text-blue-500">{{ userStore.getUser.login.uuid }}</h1>

        </div>
        
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import gsap from 'gsap';

import { useCounterStore } from '@/stores/counter';
import { useUserStore } from '@/stores/user';

const counterStore = useCounterStore();
const userStore = useUserStore();
const email = await useAsyncData('user', () => userStore.fetchUser())

definePageMeta({
    pageTransition: {
        name: 'rotate'
    }
})

useSeoMeta({
    title: 'HomePage',
});

const cards = ref([]);

onMounted(() => {
    cards.value = [
        { name: 'Карточка 1', text: 'Какой-то текст 1', icon: 'akar-icons:air' },
        { name: 'Карточка 2', text: 'Какой-то текст 2', icon: 'akar-icons:coffee' },
        { name: 'Карточка 3', text: 'Какой-то текст 3', icon: 'akar-icons:dribbble-fill' },
        { name: 'Карточка 4', text: 'Какой-то текст 4', icon: 'akar-icons:bug' },
    ];
});

const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(100px)';
};

const enter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: done,
        delay: el.dataset.index * 0.2
    });
};

</script>
  
<style scoped>
.contact ul {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    max-width: 400px;
    margin: 60px auto;
}

.contact li {
    list-style-type: none;
    background: rgb(240, 240, 240);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    line-height: 1.5rem;
}

.rotate-enter-active,
.rotate-leave-active {
    transition: all 0.3s;
}

.rotate-enter-from,
.rotate-leave-to {
    opacity: 0;
    transform: rotate3d(1, 1, 1, -15deg);
}
</style>
  