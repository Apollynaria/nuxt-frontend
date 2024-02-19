<template>
    <div>
        <div style="height: 100%">
            <ag-grid-vue class="ag-theme-quartz w-full h-[340px]" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
                @grid-ready="onGridReady">
            </ag-grid-vue>
        </div>
        <div class="h-[400px] flex gap-4 justify-around">
            <Bar class="h-75" v-if="loaded" :data="processedChartData" :options="options" />
            <Line class="h-75" v-if="loaded" :data="processedChartData" :options="options" />
        </div>
        <div class="h-[400px] flex gap-4 justify-around mt-5">
            <Doughnut class="h-75" v-if="loaded" :data="processedChartData" :options="options" />
            <Pie class="h-75" v-if="loaded" :data="processedChartData" :options="options" />
        </div>
    </div>
</template>
                    
<script setup lang="ts">

useSeoMeta({
    title: 'Chart js',
});

import { ref } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js'
import { Bar, Line, Doughnut, Pie } from 'vue-chartjs';
import getData from '../public/dataChart';

const loaded = ref(false);

const columnDefs = ref([
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
]);

const gridApi = ref();
const defaultColDef = ref({
    flex: 1,
    minWidth: 100,
    editable: true
});

const rowData = ref();
const options = ref({ responsive: true });

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

const onGridReady = (params) => {
    gridApi.value = params.api;
    getData().then((newRowData) => {
        rowData.value = newRowData;
        params.api.setGridOption('rowData', rowData.value);
        loaded.value = true;
    });
};

const processedChartData = computed(() => {
    const labels = rowData.value.map((row) => row.country);
    const countGold = rowData.value.map((row) => row.gold);

    return {
        labels: labels,
        datasets: [{
            data: countGold,
            label: 'Count of gold',
            backgroundColor: ['#41B883', '#fe676e', '#00D8FF', '#DD1B16', '#FDEE00', '#8f7dff', '#50586d'],
        }]
    };
});


</script>

<style lang="scss" scoped></style>