<template>
    <div class="w-full h-full">

        <p class="p-2">Простая таблица</p>
        <ag-grid-vue
            :rowData="rowData"
            :columnDefs="colDefs"
            class="ag-theme-quartz-dark w-[800px] h-[180px]"
        ></ag-grid-vue>

        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

        <p class="p-2">Таблица с различными свойствами</p>

        <div class="text-center mb-3 flex justify-center gap-3">
            <my-button @click="onUpdateSomeValues"
            title="Изменить значение Price"
            >
            </my-button>

            <my-button @click="showModalWindowExportCsv"
            title="Скачать CSV файл"
            color="gray"
            >
            </my-button>

            <my-button @click="getFileExcel"
            title="Скачать Excel файл"
            color="green"
            >
            </my-button>
        </div>

        <my-modal-window-export 
            v-if="isShowModalWindowExportCsv" 
            @close="isShowModalWindowExportCsv = false" 
            title="Экспорт csv файла"
            textButton="Загрузить CSV" 
            @getFile="getFileCsv">

            <template #body>
                <p class="text-green-400">Предпросмотр csv-файла</p>
                <textarea id="csvResult" class="p-2 bg-white mx-auto w-full text-sm border border-gray-300 outline-[#007bff] rounded" rows="5">{{ textareaText }}</textarea>
            </template>
        </my-modal-window-export>

        <ag-grid-vue
            class="ag-theme-quartz w-full h-[350px]"
            :columnDefs="colDefs2"
            :rowData="rowData2"
            :defaultColDef="defaultColDef"
            :pagination="true"
            :copyHeadersToClipboard="true"
            @grid-ready="onGridReady"
            :enableCharts="true"
            :enableRangeSelection="true"
        >
        </ag-grid-vue>

        <div class="text-center mb-3 flex justify-center gap-3 mt-3">
            <my-button @click="getTop10Price"
                title="Top 10 Price"
                color="red"
            >
            </my-button>
        </div>
    </div>
    
</template>

<script lang="ts" setup>

import axios from 'axios';

useSeoMeta({
    title: 'Работа с библиотекой ag-grid',
});

import { AgGridVue } from 'ag-grid-vue3';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import CompanyLogoRenderer from '~/components/CompanyLogoRenderer.vue';
import 'ag-grid-enterprise';

const rowData = ref([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
]); 
const colDefs = ref([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
]);

const colDefs2 = ref([
    { field: "mission" },
    { field: "company", cellRenderer: CompanyLogoRenderer }, 
    { field: "location" },
    { field: "date" },
    { field: "price",   
      valueFormatter: (params) => { return params.value.toLocaleString() + ' ₽' ; }, 
      editable: false, 
      minWidth: 1, 
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      sort: 'desc'
    },
    { field: "successful" },
    { field: "rocket" }
]);

const defaultColDef = ref({
    filter: true,
    editable: true,
});

const isShowModalWindowExportCsv = ref(false);
const textareaText = ref('');


const { data: rowData2 } = await axios.get('https://www.ag-grid.com/example-assets/space-mission-data.json');


const gridApi = ref();

const onGridReady = (params) => {
    gridApi.value = params.api;
};

const onUpdateSomeValues = () => {
    const rowCount = gridApi.value.getDisplayedRowCount();
    for (let i = 0; i < rowCount; i++) {
        const row = Math.floor(Math.random() * rowCount);
        const rowNode = gridApi.value.getDisplayedRowAtIndex(row);
        rowNode.setDataValue('price', Math.floor(Math.random() * 10000));
    }
};

const getFileCsv = () => {
    gridApi.value.exportDataAsCsv();
};

const getFileExcel = () => {
    gridApi.value.exportDataAsExcel();
};

const showModalWindowExportCsv = () => {
    isShowModalWindowExportCsv.value = !isShowModalWindowExportCsv.value;
    if (isShowModalWindowExportCsv){
        textareaText.value = gridApi.value.getDataAsCsv();
    }
};

const getTop10Price = () =>{

    gridApi.value.createRangeChart({
        cellRange: {
          rowStartIndex: 0,
          rowEndIndex: 9,
          columns: ['price', 'company'],
        },
        chartType: 'groupedColumn',
        chartThemeOverrides: {
          common: {
            title: {
              enabled: true,
              text: 'Top 10 Price',
            },
          },
        },
      });

};

</script>

<style lang="scss" scoped>
    
</style>