<template>
    <div v-if="loadingPage" class="absolute z-10 flex items-center justify-center w-full h-full bg-white/70">
        <LoadingOutlined class="text-4xl text-primary" />
    </div>
</template>

<script lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { computed, ComputedRef } from "vue";
export default {
    components: { LoadingOutlined },
    setup() {
        const store = useStore();
        const loadingPage: ComputedRef<boolean> = computed(() => store.state.loadingModule.loadingPage);
        return { loadingPage };
    },
};
</script>
