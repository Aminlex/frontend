<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { defineProps} from 'vue'
    import noteInfoNumVue from "@/components/noteInfoNum.vue"

    const props = defineProps({
        notesList:Object
    })

   
    const router = useRouter()
    const navToNoteDetail = (id) =>{
      // console.log("id:"+id);
       window.open(`/note/${id}`, '_blank');
    //   router.push(`/note/${id}`)
    }
</script>

<template>
    <div class="notes-container">
        <div class="note-box" v-for="note in notesList" :key="note.note_id">
            <div class="top-info">
                <div @click="navToNoteDetail(note.note_id)" style="cursor: pointer;">
                    <div class="title">{{note.title}}</div>
                    <div class="abstract">{{note.abstract}}</div>
                </div>
                <!-- <el-dropdown trigger="click" v-if="props.userId == id">
                    <el-icon class="more"><MoreFilled /></el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="editNote(note.id)">修改笔记</el-dropdown-item>
                            <el-dropdown-item @click="delNote(note.id)">删除笔记</el-dropdown-item>
                            <el-dropdown-item @click="selectColumns(note.id)">添加到专栏</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown> -->
            </div>
            <div class="info">
                <div class="left-box">
                    <div class="tags-box" v-for="tags in note.tags" :key="tags.tag_id">
                        <div class="item">{{tags.tagname}}</div>
                    </div>
                </div>
                <noteInfoNumVue :note="note"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.note-box{
    // font-family: '微软雅黑';
    background-color: $low-theme-color;
    width: 500px;
    border: 1px solid $border-color;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    .top-info{
        position: relative;
        .title{
            padding: 10px 0;
            // font-weight: bold;
            color: $theme-text;
            font-size: 18px;
        }
        .abstract{
            color: $text-color;
            font-size: 14px;
            line-height: 24px;
        }
        .el-dropdown{
            position: absolute;
            top: 10px;
            right: 20px;
        }
    }
    .info{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: $text-color;
        padding: 10px 0;
        .left-box{
            display: flex;
            .item{
                margin-right: 10px;
            }
        }
        .tags-box .item{
            border: 1px solid $theme-active;
            color: $theme-active;
            border-radius: 12px;
            font-size: 10px;
            padding: 5px;
        }
    }
}

</style>
