<template>
    <div class="w-full h-[80vh]">

        <ag-grid-with-preloader
            :colDefs="colDefs"
            :defaultColDef="defaultColDef"
            api_adr="https://www.ag-grid.com/example-assets/space-mission-data.json"
            @onGridReady="getGridApi"
        >
        </ag-grid-with-preloader>
        
    </div>
</template>

<script lang="ts" setup>

useSeoMeta({
    title: 'Тестовая таблица ag-grid',
});

import { AgGridVue } from 'ag-grid-vue3';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import 'ag-grid-enterprise';

const colDefs = ref([
    { field: "mission" },
    { field: "company" }, 
    { field: "location" },
    { field: "date" },
    { field: "price",   
      valueFormatter: (params) => { return params.value.toLocaleString() + ' ₽' ; }, 
      editable: false, 
      minWidth: 1, 
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    { field: "successful" },
    { field: "rocket" }
]);

const defaultColDef = ref({
    filter: true,
    editable: true,
});

const gridApi = ref();

const getGridApi = (gridFromChild) => {
    gridApi.value = gridFromChild
};

   
</script>

<style lang="scss" scoped>
    
</style>