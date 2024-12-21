<script setup>
    import { defineProps} from 'vue'
    import { reactive } from 'vue'
    import { useUserStore } from '@/stores/user'

    const props = defineProps({
        comment:Object,
        imgSize:Number,
        display:String,
        margin:String
    })

    // 控制子评论的浮动属性
    const styleObject = reactive({
        display: props.display
    });

    // 控制子评论内容的间距
    const styleMargin = reactive({
        margin: props.margin,
        color:'#DDDFE4'
    });

    // 评论组件的控制
    const user = useUserStore()
    const isCommentShow = (comment_id)=>{
        if(user.commentVisibleIndex == comment_id){
            user.commentVisibleIndex = -1;
        }else{
            user.commentVisibleIndex = comment_id;
        }
        
        
    }
</script>

<template>
    <div class="comment-box">
        <img :src="comment.user_avatar" alt="" :width="props.imgSize" :height="props.imgSize">
        <div style="padding:10px 0;">
            <div class="top-item" :style="styleObject">
                <div class="author-info">
                    {{comment.user_nickname}}
                </div>
                <div class="info-box" :style="styleMargin">
                    {{comment.content}}
                </div>
            </div>
            <div class="bottom-item">
                <div>{{comment.created_time}}</div>
                <div>
                    <i class="iconfont icon-xihuan"></i>
                    {{comment.like_num}}
                </div>
                <div @click="isCommentShow(comment.id)" class="response">回复</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.comment-box{
    display: flex;
    img{
        border-radius: 50%;
        margin-right: 10px;
    }
    .top-item{
        .author-info{
            color: $text-color;
            font-size: 14px;
            margin-right: 15px;
            white-space: nowrap;
        }
    }
    .bottom-item{
        display: flex;
        div{
            font-size: 13px;
            color: $text-color;
            margin-right: 20px;
        }
        .response:hover{
            color: $theme-active;
            cursor: pointer;
        }
    }
}
</style>
