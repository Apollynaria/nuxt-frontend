<template>

    <div class="w-full h-[80vh]">

        <div class="flex justify-center">
            <my-button class="p-6" @click="onUpdateTable"
                title="Получить данные"
                color="gray" 
                :disabled="isLoading"
                :appendIcon="isLoading"
                >
            </my-button>
        </div>

        <div class="h-full flex w-full justify-center">
            <div v-if="isLoading" class="h-full flex">
                <svg aria-hidden="true"  role="status" class="w-[70px] h-[70px] m-auto text-black animate-spin"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor" />
                </svg>
            </div>

            <ag-grid-vue v-if="!isLoading && !isStartState"
                class="ag-theme-quartz w-full h-full"
                :columnDefs="props.colDefs"
                :rowData="rowData"
                :defaultColDef="props.defaultColDef"
                :pagination="true"
                :copyHeadersToClipboard="true"
                @grid-ready="onGridReady"
                @pagination-changed="onPaginationChanged"
                :paginationPageSize="props.paginationPageSize"
                :paginationPageSizeSelector="paginationPageSizeSelector"
            >
            </ag-grid-vue>

        </div>

    </div>

</template>
<script lang="ts" setup>
import { AgGridVue } from 'ag-grid-vue3';
import axios from 'axios';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import 'ag-grid-enterprise';


const props = defineProps({
    colDefs: {
        type: Object,
        default: {}
    },
    defaultColDef: {
        type: Object,
        default: {}
    },
    api_adr: {
        type: String,
        default: ''
    },
    page: {
        type: Number,
        default: 1
    },
    paginationPageSize: {
        type: Number,
        default: 25
    }
});
    
const isLoading = ref(false);
const isStartState = ref(true);
const rowData = ref();
const gridApi = ref();
const paginationPageSizeSelector = ref([25, 50, 100]);

const emit = defineEmits(['onGridReady', 'onPaginationChanged']);

const onGridReady = (params) => {
    params.api.paginationGoToPage(props.page - 1);
    gridApi.value = params.api;
    emit('onGridReady', gridApi);
};


const onUpdateTable = async () => {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await axios.get(props.api_adr);
    rowData.value = response.data;
    isLoading.value = false;  
};  

onUpdateTable();
isStartState.value = false;


const onPaginationChanged = () => {    
    
    if (gridApi.value && !isNaN(gridApi.value.paginationGetCurrentPage()) ) {
        emit('onPaginationChanged', gridApi.value.paginationGetCurrentPage(), gridApi.value.paginationGetPageSize());
    }
};

</script>
<style lang="scss" scoped>
    
</style>