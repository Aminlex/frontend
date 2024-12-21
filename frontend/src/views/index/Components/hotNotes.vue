<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { defineProps} from 'vue'
    import { MoreFilled ,Refresh} from '@element-plus/icons-vue'

    const props = defineProps({
        topList:Object
    })

    const token = localStorage.getItem('token')

    const router = useRouter()
    const navToNoteDetail = (id) =>{
        window.open(`/note/${id}`, '_blank');
    }
   
</script>

<template>
<div class="left-box">
    <div class="top">
        <div class="title">
            <i class="iconfont icon-xihuan"></i>
            <p>热门文章</p>
        </div>
        <p class="more">刷新</p>
    </div>
    <div class="notes-container">
        <div class="note-box" v-for="(note,index) in topList" :key="note.id" >
            <!-- <div class="image-box" v-bind:style="{ Image: `url('${imageMap[note.id]}')` }"></div> -->
            <div class="top-info">
                <div class="note-info" @click="navToNoteDetail(note.id)" style="cursor: pointer;">
                    <div style="display: flex;">
                        <div class="note-number" :class="`number-color-${index % 5}`">{{ index + 1 }}.</div> 
                        <div class="title">{{note.title}}</div>
                    </div>
                    <div class="item">
                        {{note.browse_num}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.left-box{
    width: 200px;
    height: 340px;
    overflow: hidden;
    flex-direction: column;
    padding: 10px;
    color: $theme-text;
    border-radius: 10px;
    background-color: $low-theme-color;
    .top{ 
        display: flex;
        padding: 10px 0;
        align-items: center;
        justify-content: space-between;
        .title{
            display: flex;
            align-items: center;
            font-size: 14px;
            .iconfont{
                margin-right: 3px;
                color:#D84A4C;
                font-size: 20px;
                font-weight: 800;
            }
        }
        .more{
            font-size: 10px;
            color: rgb(255, 255, 255,0.7);
        }
    }

}
.note-box{
    display: flex;
    margin-top: 10px;
    padding: 2px;
   // border-radius: 10px;
    .top-info{
        position: relative;
        width: 200px;
        .note-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .note-number{
                margin-right: 10px;
                font-size: 12px;
            }
            // .number-color-0 {
            //     color: red; /* 编号1的颜色 */
            // }
            // .number-color-1 {
            //     color: rgba(255, 0, 0, 0.824); /* 编号2的颜色 */
            // }
            // .number-color-2 {
            //     color: rgb(255, 111, 0); /* 编号3的颜色 */
            // }
            // .number-color-3 {
            //     color: orange; /* 编号4的颜色 */
            // }
            // .number-color-4 {
            //     color: rgba(255, 166, 0, 0.66); /* 编号5的颜色 */
            // }
            .title{
                color: $theme-text;
                font-size: 12px;
                white-space: nowrap; /* 保持文本在一行显示 */
                overflow: hidden;     /* 隐藏溢出的内容 */
                text-overflow: ellipsis; /* 显示省略号 */
                width: 140px;
            }
            .item{
                color:#BFC0CB;
                font-size: 8px;
            }
        }   
    }
}
</style>
