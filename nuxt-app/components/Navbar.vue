<template>
  <div id="app">

    <div class="topnav">
      <nuxt-link to="/test"><img src="../logo.svg" alt="logo" class='w-[26px]' /></nuxt-link>
      <nuxt-link to="/test">Тестовая страница</nuxt-link>
      <nuxt-link to="/api">Работа с API</nuxt-link>
      <nuxt-link to="/uiComponents">Библиотека компонентов</nuxt-link>
      <nuxt-link to="/agGrid">Библиотека ag-grid</nuxt-link>
      <nuxt-link to="/agGridLoadPage/table/size=25/page=1">ag-grid с прелоадером, пагинация</nuxt-link>
      <nuxt-link to="/importExcel">Импорт данных Excel</nuxt-link>
    </div>

  </div>
</template>
  
<script setup lang="ts">

</script>
  
<style>
.topnav {
  background-color: #333;
  overflow: hidden;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>