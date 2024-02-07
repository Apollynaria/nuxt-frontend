<template>
    <div class="relative min-w-[300px] select-none border border-gray-400 w-fit ">
        <div @click="clicked = !clicked"
            :class="['flex', 'text-lg', 'text-gray-500', 'cursor-text', 'items-center', 'justify-between']">
            <div v-if="choosenOptions.length === 0" class="p-1">
                <p class="ms-1">{{ title }}</p>
            </div>
            <div v-else class="flex">
                <div v-for="choosenOption in choosenOptions" :key="choosenOption" class="p-1">
                    <button class="border border-gray-400 rounded flex items-center" >
                        <p class="ms-1">{{ choosenOption }}</p>
                        <svg @click="deleteOption(choosenOption)" class="ms-2 me-1" xmlns="http://www.w3.org/2000/svg"
                            width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex ms-4">
                <svg v-if="choosenOptions.length !== 0" @click="deleteAll" class="cursor-pointer me-2"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8" />
                </svg>
                <svg v-if="!clicked" xmlns="http://www.w3.org/2000/svg" class="me-2" width="1em" height="1em"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="me-2" width="1em" height="1em"
                    viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496" />
                </svg>

            </div>
        </div>

        <div v-if="clicked" class="z-20 absolute border border-gray-400 bg-white w-full">
            <div v-for="option in options" :key="option" tabindex="-1" aria-hidden="true"
                class="border border-gray-300 hover:bg-gray-300 w-full">
                <input type="checkbox" :id="option" :value="option" class="me-2 ms-2" v-model="choosenOptions">
                <label :for="option" class="w-full absolute cursor-pointer">{{ option }}</label>
            </div>
        </div>

    </div>
</template>


<script lang="ts" setup>

const props = defineProps({
    title: {
        type: String,
        default: "Select"
    },
    options: {
        type: Array,
        default: () => []
    }
});    

const choosenOptions = ref([]);
const clicked = ref(false);
const emit = defineEmits(['update:choosenOptions']);

const deleteOption = (option) => {
    const ind  = choosenOptions.value.indexOf(option);
    choosenOptions.value.splice(ind, 1);
    emit('update:choosenOptions', choosenOptions.value);
};

const deleteAll = () => {
    choosenOptions.value = [];
    emit('update:choosenOptions', choosenOptions.value);
};

watch(choosenOptions, () => {
    emit('update:choosenOptions', choosenOptions.value);
})



</script>


<style lang="scss" scoped>
    
</style>