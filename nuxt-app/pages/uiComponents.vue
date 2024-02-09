<template>
    <div class="container mx-auto">

        <h1 class="text-2xl font-bold mt-3">
            Библиотека компонентов
        </h1>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <h1 class="text-2xl font-bold">
            Кнопка с прелоадером
        </h1>

        <br>

        <my-button 
            @click="clickBtn" 
            :disabled="true" 
            :appendIcon="true" 
            title="Загрузка" 
            color="blue" 
        />

        <br>

        <my-button 
            @click="clickBtn" 
            :disabled="false" 
            :appendIcon="false" 
            color="gray" 
            title="Кнопка во всю ширину"
            :fullWidth="true" 
        />

        <br>

        <my-button 
            @click="clickBtnLoading" 
            :disabled=isLoading 
            :appendIcon=isLoading 
            :color=colorBtn 
            :title=title 
        />

        <br>

        <my-button 
            @click="clickBtn" 
            :disabled="false" 
            :appendIcon="false" 
            title="Кнопка с переданным цветом"
            color="yellow" 
        >*slot*</my-button>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <h1 class="text-2xl font-bold">
            Select с мультивыбором
        </h1>

        <br>

        <my-select 
            class="w-50"
            title="Выбрать значения" 
            :options="options.slice().sort()"
            @update:choosenOptions="updateChoosenOptions"
        />

        <div class="mb-2">Выбранные значения в родителе:</div>
        <div v-for="option in choosenOptions" :key="option"
                class="">
                {{ option }}
            </div>

        <br>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <h1 class="text-2xl font-bold">
            Модальное окно импорта
        </h1>

        <br>

        <my-button 
            @click="clickBtnModalWindowImport" 
            :disabled="false" 
            :appendIcon="false" 
            title="Импорт файлов"
            color="blue" 
        />

        <br>

        <h1 class="text-2xl font-bold">
            Модальное окно экспорта
        </h1>

        <br>

        <my-button 
            @click="clickBtnModalWindowExport" 
            :disabled="false" 
            :appendIcon="false" 
            title="Экспорт файлов"
            color="blue" 
        />

        <my-modal-window-import 
            v-if="showModalWindowImport" 
            @close="closeModalWindowImport" 
            @sendFile="getImportFile"
            title="Импорт файлов"
            textButton="Загрузить и отправить" 
            types=".jpg, .png">
            <template #body class="text-gray-300">*Расширение через slot*</template>
        </my-modal-window-import>


        <my-modal-window-export 
            v-if="showModalWindowExport" 
            @close="closeModalWindowExport" 
            title="Экспорт файлов"
            textButton="Загрузить файл" 
            :chooseDate="true" 
            textInputData="Введите ФИО" 
            :select="testObj"
            link="/logo.svg"
            :isLoading="isLoadingModalExport" 
            :isLoadedFile="isLoadedFile" 
            @getFile="getFile">
            <template #body class="text-gray-300">*Расширение через slot*</template>
        </my-modal-window-export>


    </div>
</template>


<script lang="ts" setup>
useSeoMeta({
    title: 'Библиотека UI компонентов',
})
const isLoading = ref(false);
const title = ref("Проверка загрузки");
const colorBtn = ref("red");
const showModalWindowImport = ref(false);
const showModalWindowExport = ref(false);
const testObj = {
    title: 'Выбор города',
    arrSelect: ['Город 1', 'Город 2', 'Город 3']
};
const isLoadingModalExport = ref(false);
const isLoadedFile = ref(false);
const options = ref([
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
    "Нижний Новгород",
    "Челябинск",
    "Омск",
    "Самара"
]);
const choosenOptions = reactive([]);
const file = ref('');

const clickBtn = () => {
    console.log("btnClicked");
};

const clickBtnModalWindowImport = () => {
    showModalWindowImport.value = !showModalWindowImport.value;
};

const closeModalWindowImport = () => {
    showModalWindowImport.value = false;
};

const clickBtnModalWindowExport = () => {
    showModalWindowExport.value = !showModalWindowExport.value;
};

const closeModalWindowExport = () => {
    showModalWindowExport.value = false;
    isLoadingModalExport.value = false;
    isLoadedFile.value = false;
};

const clickBtnLoading = async () => {
    colorBtn.value = colorBtn.value === "red" ? "green" : "red";
    isLoading.value = true;
    title.value = "Загрузка...";
    await new Promise(resolve => setTimeout(resolve, 2000));
    isLoading.value = false;
    title.value = "Успешно загружено!";
    colorBtn.value = "green";
};

const getFile = async () => {
    isLoadingModalExport.value = true;
    isLoadedFile.value = false;
    await new Promise(resolve => setTimeout(resolve, 2000));
    isLoadingModalExport.value = false;
    isLoadedFile.value = true;
};

const getImportFile = (importedFile) => {
    console.log(importedFile);
};

const updateChoosenOptions = (newChoosenOptions) => {
    choosenOptions.splice(0, choosenOptions.length, ...newChoosenOptions);
};


</script>


<style lang="scss" scoped>
    
</style>