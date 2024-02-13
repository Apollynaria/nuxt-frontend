<template>
    <div class="w-full h-[80vh]">
        <div class="p-3 space-y-8 font-[sans-serif] max-w-md mx-auto">
            <input type="file" @change="handleFileChange"
                class="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
        </div>
        <div class="h-full flex w-full justify-center">
            <ag-grid-vue 
            class="ag-theme-quartz w-full h-full" 
            :rowData="rowData" 
            :columnDefs="columnDefs"
            :autoSizeStrategy="{type: 'fitGridWidth',}"
            :defaultColDef="defaultColDef"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import * as XLSX from 'xlsx';

const countries = ref(['China', 'Russia', 'Czech Republic', 'Croatia', 'New Zealand', 'South Korea', 'Sweden', 'South Korea', 'Australia']);

const columnDefs = ref([
  { field: 'athlete', headerName: 'Athlete', minWidth: 180 },
  { field: 'age', headerName: 'Age' },
  { field: 'country', headerName: 'Country', minWidth: 150, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: countries }, },
  { field: 'year', headerName: 'Year' },
  { field: 'date', headerName: 'Date', minWidth: 130 },
  { field: 'sport', headerName: 'Sport', minWidth: 100 },
  { field: 'gold', headerName: 'Gold' },
  { field: 'silver', headerName: 'Silver' },
  { field: 'bronze', headerName: 'Bronze' },
  { field: 'total', headerName: 'Total' },
]);

const defaultColDef = ref({
    filter: true,
    editable: true,
});

const rowData = ref([]);


const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array((e.target as any).result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    rowData.value = jsonData.slice(1).map((row: any) => ({
      athlete: row[0],
      age: row[1],
      country: row[2],
      year: row[3],
      date: typeof row[4] === 'number' ? XLSX.SSF.format('yyyy-mm-dd', row[4]) : row[4].split('/').reverse().join('-'),
      sport: row[5],
      gold: row[6], 
      silver: row[7],
      bronze: row[8],
      total: row[9],
    }));
  };    

  reader.readAsArrayBuffer(file);
};

</script>

<style>
</style>