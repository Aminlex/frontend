<script setup>
    import { useRoute } from 'vue-router'
    import userInfoVue from "@/components/userInfo.vue"
</script>
    

<template>
    <el-scrollbar height="600px">
        <userInfoVue />
        <router-view></router-view>
    </el-scrollbar>
</template>

<style lang="scss" scoped>

</style>
