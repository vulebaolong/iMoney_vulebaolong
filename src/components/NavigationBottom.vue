<template>
    <footer class="fixed bottom-0 left-0 w-full pt-4 bg-white md:absolute p-b-safe-4">
        <div class="container h-full px-8">
            <ul class="flex items-center justify-between h-full">
                <li v-for="(navItem, index) in navItems" :key="index">
                    <router-link :to="navItem.router">
                        <i class="text-2xl t2ico" :class="navItem.icon"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script lang="ts">
import { reactive } from "vue";
import { NAV_ITEMS } from "../constant";
export default {
    setup() {
        const navItems = reactive(NAV_ITEMS);
        return { navItems };
    },
};
</script>

<style scoped></style>
