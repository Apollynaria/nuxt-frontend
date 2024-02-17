<template>
  <div id="app">
    <div class="absolute z-20 cursor-pointer top-0 h-[50px] right-0 mr-4 mt-[5px]" @click="isShowNavbar = !isShowNavbar">
      <Icon :name="isShowNavbar ? 'mdi:close' : 'ic:baseline-menu'" :color="isShowNavbar ? 'white' : 'black'" size="40" />
    </div>


    <div class=" relative z-10 h-[53px]">
      <transition name="fade">
        <div v-if="isShowNavbar" class="topnav">
          <nuxt-link to="/home"><img src="../logo.svg" alt="logo" class='w-[26px]' /></nuxt-link>
          <nuxt-link v-for="(url, index) in urls" :key="url.name" :to="url.name">
            <Icon :name="url.icon" size="20" />
            {{ url.text }}
          </nuxt-link>
        </div>
      </transition>

    </div>

  </div>
</template>
  
<script setup lang="ts">

const isShowNavbar = ref(true);

const urls = ref([
  { name: '/test', text: 'Тест', icon: 'icon-park-outline:block-one' },
  { name: '/api', text: 'API', icon: 'svg-spinners:6-dots-rotate' },
  { name: '/uiComponents', text: 'Библиотека компонентов', icon: 'material-symbols:book-2' },
  { name: '/agGrid', text: 'ag-grid', icon: 'material-symbols:backup-table' },
  { name: '/agGridLoadPage/table/size=25/page=1', text: 'ag-grid с прелоадером, пагинация', icon: 'iconoir:multiple-pages-empty' },
  { name: '/importExcel', text: 'Импорт данных Excel', icon: 'mdi:import' },
  { name: '/chart', text: 'ag-grid графики', icon: 'material-symbols:add-chart-outline-rounded'},
  { name: '/pivotAndCrossFire', text: 'pivotApi & CrossFireApi', icon: 'material-symbols:add-chart-outline-rounded'},
  { name: '/chartjs', text: 'chart js', icon: 'material-symbols:add-chart-outline-rounded'},
])
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

  &.router-link-active {
    background-color: #ddd;
    color: black;
  }
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a:active {
  background-color: #04AA6D;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}


</style>