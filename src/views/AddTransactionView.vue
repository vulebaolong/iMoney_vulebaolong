<template>
    <!-- FORM -->
    <a-form :model="formState" layout="vertical" @finish="onFinish" @finishFailed="onFinishFailed">
        <!-- MAIN FORM -->
        <div class="py-4 mt-8 bg-white rounded-lg">
            <div class="container px-8">
                <!-- TOTAL -->
                <div class="flex items-center">
                    <label for="total" class="mb-6 mt-[19px] h-[54px]">
                        <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                            <span class="inline-block px-1 text-sm font-bold border rounded text-dark border-dark">USD</span>
                        </div>
                    </label>
                    <a-form-item class="flex-1 border-b border-gray-100" name="total" :rules="[{ required: true, message: 'Please input your total!' }]">
                        <span class="text-xs font-semibold text-dark">Total</span>
                        <a-input class="px-0 text-4xl" v-model:value="formState.total" size="small" :bordered="false" />
                    </a-form-item>
                </div>

                <!-- CATEGORY -->
                <div class="flex items-center truncate">
                    <label for="note" class="flex items-center mb-6 h-[38px]">
                        <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                            <span class="inline-block w-8 h-8 ml-auto">
                                <i class="text-2xl t2ico t2ico-category"></i>
                            </span>
                        </div>
                    </label>
                    <a-form-item class="flex-1 overflow-hidden border-b border-gray-100" name="category_Id" :rules="[{ required: true, message: 'Please input your category!' }]">
                        <a-select ref="select" v-model:value="formState.category_Id" :bordered="false" class="w-full">
                            <a-select-option class="truncate" v-for="category in listCategory" :key="category._id" :value="category._id">
                                <div class="flex items-center w-full gap-2">
                                    <span class="flex-shrink-0 w-6 h-6 rounded-md" :style="{ background: category.color }"></span>
                                    <span class="text-base font-semibold truncate text-dark">{{ category.title }}</span>
                                </div>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>

                <!-- NOTE -->
                <div class="flex items-center">
                    <label for="note" class="flex items-center mb-6 h-[38px]">
                        <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                            <span class="inline-block w-8 h-8 ml-auto">
                                <i class="text-2xl t2ico t2ico-document"></i>
                            </span>
                        </div>
                    </label>
                    <a-form-item class="flex-1 border-b border-gray-100" name="note" :rules="[{ required: true, message: 'Please input your note!' }]">
                        <a-input class="px-0" v-model:value="formState.note" size="small" :bordered="false" placeholder="note" />
                    </a-form-item>
                </div>

                <!-- CREATE DAY -->
                <div class="flex items-center">
                    <label for="createDay" class="flex items-center mb-6 h-[38px]">
                        <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                            <span class="inline-block w-8 h-8 ml-auto">
                                <i class="text-2xl t2ico t2ico-calendar"></i>
                            </span>
                        </div>
                    </label>
                    <a-form-item class="flex-1 border-b border-gray-100" name="createDay" :rules="[{ required: true, message: 'Please input your day!' }]">
                        <a-date-picker format="DD/MM/YYYY" class="w-full px-0" size="small" v-model:value="formState.createDay" :bordered="false" />
                    </a-form-item>
                </div>

                <!-- WALLET -->
                <!-- <div class="flex items-center">
                    <label for="wallet" class="flex items-center mb-6 h-[38px]">
                        <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                            <span class="inline-block w-8 h-8 ml-auto">
                                <i class="text-2xl t2ico t2ico-wallet"></i>
                            </span>
                        </div>
                    </label>
                    <a-form-item class="flex-1 border-b border-gray-100">
                        <span>My wallet</span>
                    </a-form-item>
                </div> -->
            </div>
        </div>

        <!-- MORE DETAILS -->
        <div v-if="!isMoreDetails" class="py-4 mt-8 bg-white rounded-lg">
            <button @click="isMoreDetails = true" class="w-full py-3 font-semibold bg-white rounded-lg text-primary" type="button">More Details</button>
        </div>

        <!-- SHOWW MORE DETAILS -->
        <template v-if="isMoreDetails">
            <!-- ADVANCE FORM -->
            <div class="py-4 mt-8 bg-white rounded-lg">
                <div class="container px-8">
                    <!-- LOCATION -->
                    <div class="flex items-center">
                        <label for="note" class="flex items-center mb-6 h-[38px]">
                            <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                                <span class="inline-block w-8 h-8 ml-auto">
                                    <i class="text-2xl t2ico t2ico-location"></i>
                                </span>
                            </div>
                        </label>
                        <a-form-item class="flex-1 border-b border-gray-100" name="location">
                            <a-input class="px-0" v-model:value="formState.location" size="small" :bordered="false" placeholder="location" />
                        </a-form-item>
                    </div>

                    <!-- WITH PERSON -->
                    <div class="flex items-center">
                        <label for="withPerson" class="flex items-center mb-6 h-[38px]">
                            <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                                <span class="inline-block w-8 h-8 ml-auto">
                                    <i class="text-2xl t2ico t2ico-users"></i>
                                </span>
                            </div>
                        </label>
                        <a-form-item class="flex-1 border-b border-gray-100" name="withPerson">
                            <a-input class="px-0" v-model:value="formState.withPerson" size="small" :bordered="false" placeholder="With person" />
                        </a-form-item>
                    </div>
                </div>
            </div>

            <!-- ADVANCE FORM -->
            <div v-if="false" class="py-4 mt-8 bg-white rounded-lg">
                <div class="container px-8">
                    <!-- AVATAR -->
                    <div class="flex items-center text-primary">
                        <label for="note" class="flex items-center mb-6 h-[38px]">
                            <div class="flex items-center w-12 h-full mr-4 leading-10 text-right">
                                <span class="inline-block w-8 h-8 ml-auto">
                                    <i class="text-2xl t2ico t2ico-camera"></i>
                                </span>
                            </div>
                        </label>
                        <a-form-item class="flex-1 border-b border-gray-100" name="location" :rules="[{ required: true, message: 'Please input your location!' }]">
                            <span class="font-semibold text-primary">Upload photo</span>
                        </a-form-item>
                    </div>
                </div>
            </div>
        </template>

        <!-- BUTTON -->
        <div class="container">
            <div class="mt-5">
                <a-form-item>
                    <a-button class="w-full" size="large" type="primary" html-type="submit">Add transaction</a-button>
                </a-form-item>
            </div>
        </div>
    </a-form>
</template>

<script lang="ts">
import { computed, ComputedRef, reactive, ref } from "vue";
import { useStore } from "vuex";
import { I_Category_res } from "../interfaces/categoryInterface";
import * as _dayjs from "dayjs";
const dayjs = _dayjs;

import { RouteLocationRaw } from "vue-router";
import { lcStorage } from "../helpers/lcStorage";
import { USER_LOGIN } from "../constant";

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
    setup() {

        const store = useStore();

        store.dispatch("categoryModule/getListCategory");

        const listCategory: ComputedRef<I_Category_res[]> = computed(() => store.state.categoryModule.listCategory);

        const isMoreDetails = ref(false);
        const formState = reactive({
            total: 0,
            category_Id: "",
            note: "",
            createDay: "",
            location: "",
            withPerson: "",
        });

        const onFinish = (values: any) => {
            values.total = +values.total;
            values.createDay = dayjs(values.createDay).format("DD/MM/YYYY");
            console.log(values);
            store.dispatch("transactionModule/createTransaction", values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log("Failed:", errorInfo);
        };

        return { formState, onFinish, onFinishFailed, isMoreDetails, listCategory };
    },
};
</script>
