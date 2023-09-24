<template>
    <NavigationBrand />
    <div class="pb-24">
        <slot />
    </div>
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
