<template>
    <div class="container space-y-2">
        <!-- TOTAL -->
        <div class="p-3 truncate rounded-lg">
            <div class="flex items-center justify-center gap-2">
                <i class="text-4xl text-dark t2ico t2ico-wallet"></i>
                <span class="text-2xl font-black truncate text-red">-${{ total }}</span>
            </div>
        </div>

        <!-- CATEGORY -->
        <div class="p-3 truncate bg-white rounded-lg">
            <a-select ref="select" v-model:value="formState.category_Id" :bordered="false" class="w-full" @change="handleChange">
                <a-select-option class="truncate" v-for="category in listCategory" :key="category._id" :value="category._id">
                    <div class="flex items-center w-full gap-2">
                        <span class="flex-shrink-0 w-6 h-6 rounded-md" :style="{ background: category.color }"></span>
                        <span class="text-base font-semibold truncate text-dark">{{ category.title }}</span>
                    </div>
                </a-select-option>
            </a-select>
        </div>

        <!-- LIST TRANSACTION -->
        <div v-for="transaction in listTransaction" :key="transaction._id" class="flex items-center gap-2 p-3 truncate bg-white rounded-lg">
            <!-- SQUARE -->
            <div class="flex-shrink-0 w-10 h-10 rounded-md" :style="{ backgroundColor: transaction.category_Id.color }"></div>

            <!-- TEXT -->
            <div class="flex flex-col self-stretch justify-center flex-1 truncate">
                <h2 class="text-lg font-black truncate text-dark">{{ transaction.note }}</h2>
                <span class="text-xs text-dark">{{ transaction.location }}</span>
            </div>

            <!-- PRICE AND DATE -->
            <div class="flex flex-col self-stretch justify-center flex-shrink-0 w-16 text-right">
                <h3 class="font-black truncate text-red">-${{ transaction.total }}</h3>
                <span class="text-xs text-dark">{{ transaction.createDay }}</span>
            </div>

            <!-- ACTION -->
            <div class="flex-shrink-0 space-y-1">
                <div class="">
                    <a-popconfirm placement="topRight" title="Are you sure delete this transaction?" @confirm="confirm(transaction)">
                        <a-button class="flex-shrink-0" danger size="small">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                        </a-button>
                    </a-popconfirm>
                </div>
                <!-- <div class="">
                    <a-button class="flex-shrink-0" size="small">
                        <template #icon>
                            <EditOutlined />
                        </template>
                    </a-button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, ref } from "vue";
import { useStore } from "vuex";
import { RouteLocationRaw } from "vue-router";
import { lcStorage } from "../helpers/lcStorage";
import { USER_LOGIN } from "../constant";
import { I_Category_res } from "../interfaces/categoryInterface";
import { I_transaction_res } from "../interfaces/transactionInterface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";

export default {
    beforeRouteEnter(to: RouteLocationRaw, from: RouteLocationRaw, next: any) {
        to;
        from;
        if (!lcStorage.get(USER_LOGIN)) {
            // Chuyển hướng nếu người dùng chưa đăng nhập
            next("/login");
        } else {
            // Nếu đã đăng nhập, tiếp tục hiển thị component
            next();
        }
    },
    components: {
        DeleteOutlined,
        EditOutlined,
    },
    setup() {
        const color = ref("#1668dc");
        const formState = {
            category_Id: "All transaction",
        };

        const store = useStore();

        store.dispatch("categoryModule/getListCategory");
        store.dispatch("transactionModule/getListTransaction");

        const listCategory: ComputedRef<I_Category_res[]> = computed(() => store.getters["categoryModule/categoryIntransaction"]);
        const listTransaction: ComputedRef<I_transaction_res[]> = computed(() => store.state.transactionModule.listFillterTransaction);
        const total: ComputedRef<number> = computed(() => store.state.transactionModule.total);

        const handleChange = (value: string) => {
            const categorySelected = listCategory.value.find((category) => category._id === value);

            if (categorySelected?.color !== undefined) color.value = categorySelected?.color;

            store.commit("transactionModule/fillterListTransaction", value);
        };

        const confirm = (transaction: I_transaction_res) => {
            return new Promise((resolve) => {
                store.dispatch("transactionModule/deleteTransaction", transaction._id).then(() => {
                    resolve(true);
                });
            });
        };

        return { confirm, listCategory, color, formState, handleChange, listTransaction, total };
    },
};
</script>
