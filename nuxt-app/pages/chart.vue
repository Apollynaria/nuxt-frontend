<template>
    <div class="w-full h-[80vh]">
        <h1 class="p-3">Sparkline test</h1>
        <ag-grid-vue class="ag-theme-quartz w-full h-[218px]" :columnDefs="columnDefs" :rowData="rowData"
            :defaultColDef="defaultColDef" :copyHeadersToClipboard="true">
        </ag-grid-vue>

        <h1 class="p-3">Sparkline bar</h1>
        <ag-grid-vue class="ag-theme-quartz w-full h-[218px]" :columnDefs="columnDefs2" :rowData="rowData2"
            :defaultColDef="defaultColDef" :copyHeadersToClipboard="true">
        </ag-grid-vue>

        <h1 class="p-3">Sparkline column</h1>
        <ag-grid-vue class="ag-theme-quartz w-full h-[218px]" :columnDefs="columnDefs3" :rowData="rowData"
            :defaultColDef="defaultColDef" :copyHeadersToClipboard="true">
        </ag-grid-vue>
    </div>
</template>

<script lang="ts" setup>

useSeoMeta({
    title: 'ag-grid графики',
});

import { AgGridVue } from 'ag-grid-vue3';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'ag-grid-enterprise';

import getData from '../public/data';
import getData2 from '../public/data2';

const rowData = ref();
const rowData2 = ref();
const rowHeight = ref();

const columnDefs = ref([
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                type: 'area',
                fill: 'rgba(216, 204, 235, 0.3)',
                line: { stroke: 'rgb(119,77,185)' },
                highlightStyle: { fill: 'rgb(143,185,77)' },
                axis: { stroke: 'rgb(204, 204, 235)' },
                marker: {
                    size: 3,
                    shape: 'circle',
                    fill: 'green',
                    stroke: 'green',
                    strokeWidth: 2
                },
                highlightStyle: {
                    size: 10,
                    fill: 'cyan',
                    stroke: 'cyan',
                },
            },
        },
    },
    { field: 'volume', type: 'numericColumn', maxWidth: 140 },
]);

const columnDefs2 = ref([
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                type: 'bar',
                fill: '#5470c6',
                stroke: '#91cc75',
                highlightStyle: { fill: '#fac858' },
                valueAxisDomain: [0, 1],
                paddingOuter: 0,
                padding: { top: 0, bottom: 0 },
                axis: {
                    stroke: '#7cecb3', 
                    strokeWidth: 3, 
                },
                label: {
                    enabled: true
                }
            },
        },
    },
    { field: 'volume', type: 'numericColumn', maxWidth: 140 },
]);

const columnDefs3 = ref([
{ field: 'symbol', maxWidth: 120 },
      { field: 'name', minWidth: 250 },
      {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
          sparklineOptions: {
            type: 'column',
            fill: '#fac858',
            highlightStyle: { stroke: '#fac858' },
            padding: { top: 10, bottom: 10 },
            label: { enabled: true, color: '#999999', placement: 'outsideEnd' },
          },
        },
      },
      { field: 'volume', type: 'numericColumn', maxWidth: 140 },
    ]);

const defaultColDef = ref({
    flex: 1,
    minWidth: 100,
});

onBeforeMount(() => {
    rowData.value = getData();
    rowData2.value = getData2();
});

</script>

<style lang="scss" scoped></style>