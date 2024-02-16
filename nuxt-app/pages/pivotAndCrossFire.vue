<template>
  <div class="w-full h-[80vh] text-center">
    <h1 class="text-2xl p-3 underline">PivotApi</h1>
    <ag-grid-vue class="ag-theme-quartz w-full h-[350px]" :columnDefs="columnDefs" :rowData="rowData"
      :defaultColDef="defaultColDef" :pagination="true" :copyHeadersToClipboard="true" @grid-ready="onGridReady"
      :autoGroupColumnDef="autoGroupColumnDef" :pivotMode="true" :popupParent="popupParent"
      @first-data-rendered="onFirstDataRendered">
      >
    </ag-grid-vue>
    <div id="myChart" class="h-[500px]"></div>

    <hr>
    <h1 class="text-2xl p-3 underline">CrossFireApi</h1>
    <div id="pieChart" class="ag-theme-quartz my-chart"></div>
    <ag-grid-vue class="ag-theme-quartz w-full h-[350px]" :columnDefs="columnDefs2"
      :defaultColDef="defaultColDef2" :pagination="true" :copyHeadersToClipboard="true" @grid-ready="onGridReady2"
      :enableCharts="true" @first-data-rendered="onFirstDataRendered2">
      >
    </ag-grid-vue>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';

useSeoMeta({
  title: 'PivotApi and CrossFireApi',
});

import { AgGridVue } from 'ag-grid-vue3';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import 'ag-grid-enterprise';

import getData from '../public/dataCrossFire';

const gridApi = ref();


const columnDefs = ref([
  { field: 'country', pivot: true },
  { field: 'year', rowGroup: true },
  { field: 'sport', rowGroup: true },
  { field: 'total', aggFunc: 'sum' },
  { field: 'gold', aggFunc: 'sum' },
]);

const defaultColDef = ref({
  editable: true,
  flex: 1,
  minWidth: 130,
  filter: true,
});
const autoGroupColumnDef = ref();
const popupParent = ref();

onBeforeMount(() => {
  autoGroupColumnDef.value = {
    minWidth: 200,
  };
  popupParent.value = document.body;
});

const onFirstDataRendered = (params) => {
  params.api.createPivotChart({
    chartType: 'groupedColumn',
    chartContainer: document.querySelector('#myChart'),
    chartThemeOverrides: {
      common: {
        navigator: {
          enabled: true,
          height: 10,
        },
      },
    },
  });
  setTimeout(
    () => params.api.getDisplayedRowAtIndex(2).setExpanded(true),
    0
  );
};
const onGridReady = (params) => {
  gridApi.value = params.api;
};

const updateData = (data) => {
  rowData.value = data;
};

const { data: rowData } = await axios.get('https://www.ag-grid.com/example-assets/wide-spread-of-sports.json');
console.log(rowData)

const columnDefs2 = ref([
  { field: 'salesRep', chartDataType: 'category' },
  { field: 'handset', chartDataType: 'category' },
  { field: 'sale', chartDataType: 'series' },
  { field: 'saleDate', chartDataType: 'category' },
]);

const gridApi2 = ref();
const defaultColDef2 = ref({
  flex: 1,
  filter: 'agSetColumnFilter',
  floatingFilter: true,
});

const onFirstDataRendered2 = (params) => {
  params.api.createCrossFilterChart({
    chartType: 'pie',
    cellRange: {
      columns: ['salesRep', 'sale'],
    },
    aggFunc: 'sum',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Sales by Representative ($)',
        },
      },
      pie: {
        series: {
          title: {
            enabled: false,
          },
          calloutLabel: {
            enabled: false,
          },
        },
        legend: {
          position: 'right',
        },
      },
    },
    chartContainer: document.querySelector('#pieChart'),
  });
};

const onGridReady2 = (params) => {

  gridApi2.value = params.api;

  getData().then((rowData2) => params.api.setGridOption('rowData', rowData2));
};

</script>

<style lang="scss" scoped></style>