<script setup>
    import notesListVue from "@/views/user/home/notesList/noteslist.vue"
    import { getByColumnId } from "@/apis/column"
    import { useRoute} from 'vue-router'

    const notesList = ref([])
    const column = ref([])

    const route = useRoute()
    const id = route.params.id;

    onMounted(async ()=>{
        const res = await getByColumnId(id);
        column.value = res.data;
        notesList.value = res.data.notes;
        // total.value = res.total;
    })
    
</script>

<template>
    <div class="top-container">
        <div class="title">{{ column.column_name }}</div>
        <!-- 专栏文章 -->
        <div class="notes-container">
            <notesListVue :notesList="notesList"/>
        </div>  
  </div>
</template>

<style lang="scss" scoped>
// 通用容器样式
.top-container {
  background-color: $low-theme-color;
  min-height: 100vh;
  padding: 20px; // 假设1rpx = 1px
}

// 标题样式
.title {
  text-align: center;
  background-color: $theme-color;
  color: $light-text-color;
  font-size: 14px;
  padding: 10px; // 假设1rpx = 1px
}

// 信息样式
.info {
  font-size: $tag-fontSize;
  color: $tag-color;
}

// 笔记容器样式
.notes-container {
  border-radius: 10px; // 假设1rpx = 1px
}
</style>
