<script setup>
    import { useRoute } from 'vue-router'
    import userInfoVue from "@/components/userInfo.vue"
    import notesListVue from '../Components/noteslist.vue';

    const route = useRoute();
    const id = route.params.id;
</script>
    

<template>
    <el-scrollbar height="600px">
        <userInfoVue :userId="id"/>
        <notesListVue />
    </el-scrollbar>
</template>

<style lang="scss" scoped>

</style>
