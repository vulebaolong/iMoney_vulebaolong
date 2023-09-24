<template>
    <loading />
    <component :is="layout">
        <router-view />
    </component>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Loading from './components/Loading.vue';

export default {
  components: { Loading },
    setup() {

        const route = useRoute();

        const layout = computed(() => route.meta.layout + "-layout");

        return { layout };
    },
};
</script>

<style scoped></style>
