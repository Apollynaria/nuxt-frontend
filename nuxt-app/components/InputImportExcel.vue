<template>
    <input type="file" @change="handleFileChange"
        class="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
</template>


<script lang="ts" setup>
import * as XLSX from 'xlsx';
const emit = defineEmits(['rowDataIsReady']);

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

    const updatedRowData = jsonData.slice(1).map((row: any) => ({
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

    emit('rowDataIsReady', updatedRowData);
  };    

  reader.readAsArrayBuffer(file);
  
};
</script>


<style lang="scss" scoped>
    
</style>