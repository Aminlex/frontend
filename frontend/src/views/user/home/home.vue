<script setup>
    import { useRoute } from 'vue-router'
    import userInfoVue from "@/components/userInfo.vue"
    import notesListVue from '../Components/noteslist.vue';

</script>
    

<template>
    <el-scrollbar height="600px">
        <userInfoVue />
        <notesListVue />
    </el-scrollbar>
</template>

<style lang="scss" scoped>

</style>
