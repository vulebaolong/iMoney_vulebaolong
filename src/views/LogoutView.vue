<template>
    
</template>

<script lang="ts">
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore()
        store.commit('userModule/logout')
        store.commit('categoryModule/logout')
        store.commit('transactionModule/logout')
        return {};
    },
};
</script>

<style scoped></style>
