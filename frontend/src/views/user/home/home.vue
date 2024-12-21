<script setup>
    import { useRoute } from 'vue-router'
    import userInfoVue from "@/components/userInfo.vue"
    import notesListVue from '../Components/noteslist.vue';

</script>
    

<template>
    <el-scrollbar height="600px">
        <userInfoVue userId="-1"/>
        <notesListVue />
    </el-scrollbar>
</template>

<style lang="scss" scoped>

</style>
