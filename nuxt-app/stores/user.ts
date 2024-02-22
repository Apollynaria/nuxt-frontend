import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user',() => {
    const user = ref({});

    const fetchUser = async() => {
        const response = await axios.get('https://randomuser.me/api/');
        user.value = response.data.results[0];
    }

    const getUser = computed(() => user.value)

    return {
        user, fetchUser, getUser
    }

});