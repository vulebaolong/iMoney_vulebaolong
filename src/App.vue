<template>
    <div class="relative max-h-[1000px] max-w-xl h-screen w-screen bg-dark-light md:rounded-3xl rounded-none overflow-hidden">
        <loading />
        <div class="shadow-[rgba(100,100,111,0.3)_0px_2rem_6rem_0px] h-full w-full">
            <component :is="layout">
                <router-view />
            </component>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Loading from "./components/Loading.vue";

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
