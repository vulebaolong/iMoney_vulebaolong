<template>
    <NavigationHeader />
    <div class="pb-24">
        <slot />
    </div>
    <NavigationBottom v-if="meta.isShowFooter" />
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavigationHeader from "../components/NavigationHeader.vue";
import NavigationBottom from "../components/NavigationBottom.vue";

export default {
    components: { NavigationHeader, NavigationBottom },
    setup() {
        const route = useRoute();
        console.log(computed(() => route.meta).value);
        return {
            meta: computed(() => route.meta),
        };
    },
};
</script>
