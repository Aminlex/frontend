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
    }
</script>

<template>
<el-scrollbar height="700px">
    <div class="notes-container">
        <div class="note-box" v-for="note in notesList" :key="note.id">
            <div class="note-top">
                <img :src="note.user_avatar" alt="">
                <div class="top-content"
                    style="cursor: pointer;"
                    @click="navToNoteDetail(note.id)">
                    <div class="title">{{note.title}}</div>
                    <div class="create-time">发布于 {{note.created_time}}</div>
                </div> 
            </div>
            <div class="abstract"
                style="cursor: pointer;"
                @click="navToNoteDetail(note.id)">
                    {{note.abstract}}
            </div>
            <div class="note-bottom">
                <div>
                    <div class="tags-box" v-for="tag in note.tags" :key="tag.id">
                        <div class="item">{{tag.tagname}}</div>
                    </div>
                </div>
                <div class="info">
                    <noteInfoNumVue :note="note"/>
                    <!-- <div class="right-box"> -->
                    <button @click="navToNoteDetail(note.id)">阅读</button>
                    <!-- </div> -->
                </div>
            </div>
            
        </div>
    </div>
    </el-scrollbar>
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
    width: 250px;
    height: 160px;
    // border: 1px solid $border-color;
    margin: 8px 0;
    padding: 10px;
    // border-radius: 10px;
    .note-top{
        display: flex;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
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
    }
    .abstract{
        color: #6f7ad4;
        font-size: 12px;
        line-height: 24px;
        height: 90px;
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
        }
    }
}

</style>
