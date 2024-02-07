<template>
     <div id="default-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-gray-700 bg-opacity-50">
            <!-- Modal content -->
            <div class="relative bg-white w-2/5 rounded-lg shadow dark:bg-gray-700">

                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold me-8 text-white">
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
                <div class="p-4 md:p-5 space-y-4">
                    <p class="text-base leading-relaxed text-gray-500">
                        Выберите файл {{ types }}
                    </p>
                    <slot name="body"></slot>
                    <input type="file" @change="handleFileUpload()" id="file" name="file" ref="file" :accept=types class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-500 file:hover:bg-gray-600 file:text-white rounded" />
                    <p v-if="!fileIsUpload" class="text-base leading-relaxed text-red-500">
                        Файл не выбран.
                    </p>
                    <p v-if="fileIsUpload" class="text-base leading-relaxed text-green-500">
                        Файл выбран.
                    </p>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <slot name="footer"></slot>
                    <my-button :title=textButton @click="sendFile" :disabled=!fileIsUpload color="green" />
                    <my-button class="ml-5" title="Отмена" @click="close" color="gray" />
                </div>
            </div>
    </div>
</template>

<script lang="ts" setup>
    
const props = defineProps({
    title: {
        type: String,
        default: "Button"
    },
    textButton: {
        type: String,
        default: "Отправить"
    },
    types: {
        type: String,
        default: ".jpg .png"
    }
});

const fileIsUpload = ref(false);
const file = ref('');

const emit = defineEmits(['close', 'sendFile']);

const close = () => {
    fileIsUpload.value = false;
    emit('close');
};

const handleFileUpload = () => {
    fileIsUpload.value = true;
};

const sendFile = () => {
    emit('sendFile', file.value);
};
</script>

<style lang="scss" scoped>
    
</style>