<script setup>
    import noteslistVue from "@/views/index/Components/noteslist.vue"
    import { Search } from '@element-plus/icons-vue'
    import { onMounted, ref } from 'vue'
    import { getNotesList } from '@/apis/note'

    const notesList = ref({})
    const total = ref()
    onMounted(async ()=>{
        const res = await getNotesList();
        notesList.value = res.records;
        total.value = res.total;
    })
</script>

<template>
    <div class="favor-box">
        <div class="title">收藏的笔记</div>
        <div class="search-box">
            <div class="search-input">
                <el-icon><Search /></el-icon>
                <input type="text" placeholder="search">
            </div>
        </div>
        <noteslistVue :notesList="notesList"/>
        <!-- 笔记分页组件 -->
        <!-- <div class="pages">
            <el-pagination 
                layout="prev, pager, next" 
                :total="total"
                :page-size="8" />
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.favor-box{
    width: 850px;
    padding: 0 15px;
    color: $theme-text;
    border-radius: 10px;
    background-color: $theme-color;
    margin-left: 30px;
    
    .title{
        text-align: center;
        color: $light-tilte-color;
        margin-bottom: 20px;
    }
    .search-box{
        position: relative;
        height: 25px;
        margin-bottom: 20px;
        // border-radius: 10px; 
        background-color: $low-theme-color;
        .search-input{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            .el-icon{
                margin-right: 10px;
            }
            input{
                width: 100%;
                height: 15px;
                font-size: 14px;
                border: none;
                outline: none;
                background-color: $low-theme-color;
            }
            input:focus{
                color:$theme-text;
            }
            .el-icon{
                color: $theme-text;
                font-size: 20px;
            }
        }
        .search-content{
            position: absolute;
            z-index: 999;
            .search-item{
                display: flex;
                width: 100%;
            }
        }
    }
    p{
        padding: 20px 0;
        font-size: 20px;
        font-weight: bold;
        border-bottom: 2px solid $border-color;
    }
}
</style>
