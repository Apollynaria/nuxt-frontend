<template>
    <div id="default-modal" tabindex="-1" aria-hidden="true"
        :class="['fixed', 'top-0', 'right-0', 'left-0', 'z-50', 'flex', 'justify-center', 'items-center', 'w-full', 'md:inset-0', 'h-full', 'max-h-full', 'bg-gray-700', 'bg-opacity-50']">
            <!-- Modal content -->
            <div class="relative bg-white w-2/5 rounded-lg shadow dark:bg-gray-700">

                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white me-8">
                        {{ title }}
                    </h3>
                    <slot name="head"></slot>
                    <my-button 
                        title="" 
                        color="gray"
                        @click="close"
                    >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                    </my-button>
                    
                </div>

                <!-- Modal body -->
                <div :class="['p-4', 'md:p-5', 'space-y-4', className]">
                    <div v-if="isLoading">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 animate-spin fill-blue-600 block mx-auto"
                        viewBox="0 0 24 24">
                            <path
                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                data-original="#000000" />
                        </svg>
                        <p class="text-center leading-relaxed text-blue-600">
                            Подождите... идет загрузка
                        </p>
                    </div>

                    <div v-if="isLoadedFile">
                        <svg class="w-10 block mx-auto text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z" clip-rule="evenodd"/>
                        </svg>
  
                        <p class="text-center leading-relaxed text-green-500">
                            Успешно загружено!
                            <a :href=link class="underline" download>Скачать</a>
                        </p>
                    </div>
                    

                    <p class="text-base leading-relaxed text-gray-500">
                        Выберите данные для загрузки файла
                    </p>
                    <slot name="body"></slot>


                    <div v-if="chooseDate">
                        <p class="text-base leading-relaxed text-white">
                            Выбор даты
                        </p>
                        <VueDatePicker v-model="date" locale="ru" :enable-time-picker="false"></VueDatePicker>
                    </div>

                    <div v-if="textInputData.length > 0">
                        <p class="text-base leading-relaxed text-white">
                            {{ textInputData }}
                        </p>
                        <input type="text" :placeholder=textInputData class="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500">

                    </div>

                    <div v-if="select.title.length > 0">
                        <p class="text-base leading-relaxed text-white">
                            {{ select.title }}
                        </p>
                        <select class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                            <option value="" selected disabled hidden>Выбрать значение</option>
                            <option v-for="option in select.arrSelect" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <slot name="footer"></slot>
                    <my-button :title=textButton @click="getFile" :disabled=isLoading color="green" />
                    <my-button class="ml-5" title="Отмена" @click="close" color="gray" />
                </div>
            </div>
    </div>
</template>

<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    title: {
            type: String,
            default: "Button"
        },
        textButton: {
            type: String,
            default: "Загрузить"
        },
        chooseDate: {
            type: Boolean,
            default: false
        },
        textInputData:{
            type: String,
            default: ''
        },
        select:{
            type: Object,
            default() {
                return { 
                    title: '',
                    arrSelect: [] 
                }
            }
        },
        isLoading:{
            type: Boolean,
            default: false
        },
        isLoadedFile:{
            type: Boolean,
            default: false
        },
        link:{
            type: String,
            default: ''
        }
});

const date = ref(null);

const className = {
    'pointer-events-none': props.isLoading,
    'select-none': props.isLoading
};

const emit = defineEmits(['close', 'sendFile']);

const close = () => {
    emit('close');
};

const getFile = () => {
    emit('getFile');
};
</script>

<style lang="scss" scoped>
    
</style>