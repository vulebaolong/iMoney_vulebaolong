<template>
    <NavigationBrand />
    <div class="mt-8">
        <div class="container p-8">
            <!-- INFO -->
            <div v-if="userLogin" class="space-y-5">
                <div class="text-center">
                    <p class="text-2xl font-bold text-primary">{{ userLogin.name }}</p>
                    <p class="mt-1 font-semibold text-gray-400">{{ userLogin.email }}</p>
                </div>
                <div class="">
                    <!-- TOTAL -->
                    <div class="p-3 truncate rounded-lg">
                        <div class="flex items-center justify-center gap-2">
                            <i class="text-4xl text-dark t2ico t2ico-wallet"></i>
                            <span class="text-2xl font-black truncate text-red">-${{ total }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!userLogin" class="flex items-center justify-center gap-2">
                <router-link to="/login">
                    <a-button type="primary">Login</a-button>
                </router-link>
                <router-link to="/register">
                    <a-button type="primary">Register</a-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ComputedRef } from "vue";
import NavigationBrand from "../components/NavigationBrand.vue";
import { I_login_res } from "../interfaces/userInterface";

export default {
    components: { NavigationBrand },
    setup() {
        const store = useStore();

        const userLogin: ComputedRef<I_login_res> = computed(() => store.state.userModule.userLogin);

        if (userLogin.value) {
            store.dispatch("transactionModule/getListTransaction");
        }

        const total: ComputedRef<number> = computed(() => store.state.transactionModule.total);

        return { userLogin, total };
    },
};
</script>
