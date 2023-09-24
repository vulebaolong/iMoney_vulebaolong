<template>
    <NavigationBrand />
    <slot />
</template>

<script lang="ts">
import NavigationBrand from "../components/NavigationBrand.vue";

export default {
    setup() {
        return {};
    },
    components: { NavigationBrand },
};
</script>
