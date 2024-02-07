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
const choosenOptions = ref([]);

const clickBtn = () => {
    console.log("btnClicked");
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

</script>


<style lang="scss" scoped>
    
</style>