<script setup>
    import { onMounted, ref, defineProps} from 'vue'
    import { useRoute } from 'vue-router'
    import { getMyNotes } from '@/apis/user'
    import noteInfoNumVue from "@/components/noteInfoNum.vue"
    import { CloseBold } from '@element-plus/icons-vue'

    const notesList = ref({})
    const total = ref()

    onMounted(async ()=>{
        const res = await getMyNotes();
        notesList.value = res.data;
        // total.value = res.total;
    })

    const navToNoteDetail = (id) =>{
       window.open(`/note/${id}`, '_blank');
    //   router.push(`/note/${id}`)
    }
</script>

<template>
    <div class="notes-container">
        <div class="note-box" v-for="note in notesList" :key="note.note_id">
            <div class="note-top">
                <!-- <img :src="note.avator" alt=""> -->
                <!-- <img src="@/assets/avator.png" alt=""> -->
                <div class="top-content"
                    @click="navToNoteDetail(note.note_id)">
                    <div class="title">{{note.title}}</div>
                    <div class="create-time">发布于 {{note.create_time}}</div>
                </div> 
                <el-icon><CloseBold /></el-icon>
            </div>
            <div class="abstract">{{note.abstract}}</div>
            <div class="note-bottom">
                <div>
                    <div class="tags-box" v-for="tags in note.tags" :key="tags.tag_id">
                        <div class="item">{{tags.tagname}}</div>
                    </div>
                </div>
                <div class="info">
                    <noteInfoNumVue :note="note"/>
                    <div class="right-box">
                        <button class="edit-button">编辑</button>
                        <button>阅读</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.notes-container{
    background-color: $low-theme-color;
    display: flex;        /* 启用弹性布局 */
    flex-wrap: wrap;      /* 允许项目换行 */
    justify-content: space-between;
    padding: 2px 8px;
}
.note-box{
    // font-family: '微软雅黑';
    position: relative;
    background-color: $theme-color;
    width: 300px;
    height: 160px;
    // border: 1px solid $border-color;
    margin: 8px 0;
    padding: 10px;
    // border-radius: 10px;
    .note-top{
        display: flex;
        justify-content: space-between;
        // align-items: center;
        .top-content{
            .title{
                white-space: nowrap; /* 保持文本在一行显示 */
                overflow: hidden;     /* 隐藏溢出的内容 */
                text-overflow: ellipsis; /* 显示省略号 */
                width: 200px;
                color: $title-color;
                font-size: 16px;
                margin-bottom: 5px;
            }
            .create-time{
                color: rgb(255, 255, 255,0.5);
                font-size: 10px;
            }
        }
        .el-icon{
            border: 2px solid $theme-active;
            border-radius: 50%;
            padding: 2px;
            color: $theme-active;
            opacity: 0.7;
        }
    }
    .abstract{
        color: #6f7ad4;
        font-size: 12px;
        line-height: 24px;
    }
    .note-bottom{
        position: absolute;
        bottom: 0;
        width: 90%;
         .tags-box .item{
            border: 1px solid $theme-active;
            color: $theme-active;
            border-radius: 12px;
            font-size: 10px;
            padding: 5px;
        }
        .info{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: $text-color;
            padding: 10px 0;
            .edit-button{
                background-color: $theme-color;
                color: $theme-active;
                border: 1px solid $theme-active;
                margin-right: 10px;
            }
        }
    }
}

</style>
