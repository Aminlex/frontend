<script setup>
    import notesListVue from "@/views/user/home/notesList/noteslist.vue"
    import { getColumnsNotes } from "@/apis/note"

    const notesList = ref([])
    const columnsList = ref([])
    
</script>

<template>
    <div class="top-container">
        <div class="title">专栏分类-高等数学(11)</div>
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
