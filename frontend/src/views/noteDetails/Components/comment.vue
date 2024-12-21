<script setup>
    import { reactive } from 'vue'
    import { defineProps } from 'vue'
    import { addComment } from '@/apis/comment'

    const props = defineProps({
        noteId:Number,
        replyId:Number
    })

    const token = localStorage.getItem('token')
    const avatar = localStorage.getItem('avatar')

    // 发布评论
    const form = reactive({})
    const createComment = async() =>{
        form.noteId = props.noteId;
        form.replyId = props.replyId;
        const res = await addComment(form,token);
        console.log("res:"+res);
    }

</script>

<template>
    <div class="send-box">
        <div class="top-box">
            <img :src="avatar" alt="">
            <div class="input-box">
                <input v-model="form.content"
                    type="text" placeholder="留下你的精彩评论吧!">
            </div>
        </div>
        <div class="button-box">
            <button @click="createComment">发布</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top-box{
    display: flex;
    align-items: center;
    padding: 10px;
    img{
        width: 50px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .input-box{
        border-radius: 10px;
        background-color: #fff;
        padding: 10px;
        width: 100%;
        input{
            color: #000;
        }
        input::placeholder {
            color: rgb(153, 153, 153,0.8); /* 灰色文字 */
            font-size: 14px; 
            opacity: 0.5; 
        }
    }
}
.button-box{
    padding: 0 20px;
    display: flex;
    justify-content: end;
}
</style>
