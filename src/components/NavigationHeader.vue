<template>
    <header class="py-8">
        <div class="container px-8">
            <div class="flex items-center justify-between">
                <!-- LEFT -->
                <div class="">
                    <h1 v-if="meta.text" class="ml-2 text-xl font-bold text-dark">{{ meta.text }}</h1>
                </div>

                <!-- RIGHT -->
                <!-- <div class="flex items-center justify-center">
                    <ul>
                        <li>
                            <i class="text-2xl t2ico- t2ico-notification"></i>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { computed, ComputedRef } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { I_login_res } from '../interfaces/userInterface';
export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        const userLogin: ComputedRef<I_login_res> = computed(() => store.state.userModule.userLogin);
        return {
            meta: computed(() => route.meta),
            userLogin,
        };
    },
};
</script>
