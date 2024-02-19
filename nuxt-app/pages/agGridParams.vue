<template>
    <div class="w-full h-[80vh]">

        <ag-grid-with-preloader :colDefs="colDefs" :defaultColDef="defaultColDef"
            api_adr="https://www.ag-grid.com/example-assets/space-mission-data.json" @onGridReady="getGridApi"
            :page="Number(page)" :paginationPageSize="Number(page_size)" @onPaginationChanged="onPaginationChanged">
        </ag-grid-with-preloader>

    </div>
</template>

<script lang="ts" setup>

const page_size = ref(useRoute().query.page_size);
const page = ref(useRoute().query.page);


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
    {
        field: "price",
        valueFormatter: (params) => { return params.value.toLocaleString() + ' ₽'; },
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

const router = useRouter()

const onPaginationChanged = (page_fromchild, page_size_fromchild) => {

    const newQueryParams = {
        page_size: page_size_fromchild,
        page: page_fromchild + 1
    };

    page_size.value = page_size_fromchild;
    page.value = page_fromchild + 1;
    router.push({ name: 'agGridParams', query: newQueryParams })
};



</script>

<style lang="scss" scoped></style>