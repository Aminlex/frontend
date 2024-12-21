<script setup>
    import { useRoute} from 'vue-router'
    import { useUserStore } from '@/stores/user'
    import { onMounted, ref, computed, reactive } from 'vue'
    import noteInfoNumVue from "@/components/noteInfoNum.vue"
    import commentVue from '@/views/noteDetails/Components/comment.vue'
    import commentContentVue from '@/views/noteDetails/Components/commentContent.vue'
    import userInfoVue from "@/components/userInfo.vue"
    import { getNoteDetail } from '@/apis/note'
    import { getComments } from '@/apis/comment'

    const route = useRoute()
    const user = useUserStore()
    const noteId = route.params.id;

    const noteInfo = ref({})
    const commentsList = ref([])
    const token = localStorage.getItem('token')
    onMounted(async ()=>{
        // 获取笔记详情
        const noteForm = reactive({
            id:noteId
        })
        noteInfo.value  = (await getNoteDetail(noteForm.id)).data; 
        // 获取笔记评论
        commentsList.value  = (await getComments(noteId,token)).data;
    })

    // 目录生成
    const headers = computed(() => {
        // 使用 DOMParser 来解析 HTML 字符串
        const parser = new DOMParser();
        const doc = parser.parseFromString(noteInfo.value.dontent, 'text/html');
        // 查询解析后的文档中的 h1, h2, h3 元素
        const headerElements = doc.querySelectorAll('h1, h2, h3');
        // 将 NodeList 转换为包含 id 和 textContent 的对象数组
        return Array.from(headerElements).map((el, index) => ({
            id: el.id || `header-${index}`,
            textContent: el.textContent.trim(),
        }));
    });



</script>

<template>
    <div class="main-container">
        <div class="note-box">
            <!-- 用户详情 -->
            <userInfoVue :userId="noteInfo.user_id"/>
            <!-- 笔记详情 -->
            <div class="note-detail">
                <p class="title">{{noteInfo.title}}</p>
                <div class="content" v-html="noteInfo.content"></div>
            </div>
            <!-- 评论区域 -->
            <div class="comment-container">
                <div class="top">
                    <p class="left-item">评论</p>
                    <!-- <p>11295</p> -->
                </div>
                <commentVue :noteId="noteId" :replyId="0"/>
                <div>
                    <div class="comment-detail"
                        v-for="comment in commentsList.value"
                        :key="comment.id">
                        <commentContentVue :comment="comment" imgSize="50px" display="block" margin="10px 0"/>
                        <commentVue v-if="user.commentVisibleIndex === comment.id"
                            :noteId="noteId" :replyId="comment.id"/>
                        <div class="subcomment-detail">
                            <div v-for="subcomment in comment.subcomments"
                                :key="subcomment.id">
                                <commentContentVue :comment="subcomment" imgSize="30px"  display="flex" margin="0 0 5px 0"/>
                                <commentVue v-if="user.commentVisibleIndex === subcomment.id"
                                    :noteId="noteId" :replyId="subcomment.id"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 目录区域 -->
        <div class="context-box">
            <p>目录</p>
            <ul class="toc-list">
                <!-- 使用 v-for 渲染传递的 HTML 中的标题 -->
                <li
                    v-for="(header, index) in headers"
                    :key="`header-${index}`">
                    {{ header.textContent }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-container{
    background-color: $theme-color;
    display: flex;
    justify-content: end;
    min-height: 100vh;
}
.note-box{
    width: 1000px;
    background-color: $low-theme-color;
    justify-content: center;
    margin: 20px 0;
    padding: 20px;
    .note-detail{
        margin-top: 20px;
        padding: 16px;
        background-color: $theme-color;
        color: $title-color;
        border-radius: 4px;
        .title{
            font-size: 30px;
            font-weight: bold;
        }
    }
    /* 评论区域样式 */
    .comment-container{
        background-color: $theme-color;
        padding-top: 80px;
        padding: 20px;
        .top{
            display: flex;
            align-items: center;
            color: $theme-text;
            .left-item{
                font-size: 22px;
                margin-right: 10px;
            }
        }
    }
    .subcomment-detail{
        margin: 0 50px;
    }
}

.context-box{
    width: 280px;
    p{
        
    }
    ul{
        align-items: center;
    }
    li{
        color: $title-color;
    }
    li::before{
        color: $theme-active;
    }
}


</style>
<style lang="scss">
    .content p{
        margin: 5px;
    }
</style>
