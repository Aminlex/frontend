<script setup>
    import { onMounted, ref } from 'vue'
    import { defineProps} from 'vue'
    import { getUserDeatil, getMyInfo } from "@/apis/user.js" 
    
    const props = defineProps({
        userId: Object
    })
    // 获取个人信息
    const userInfo = ref({})
    onMounted(()=>{
        setTimeout(async() => {
            if (props.userId !== -1) {
                userInfo.value  = (await getUserDeatil(props.userId)).data; 
            } else {
                userInfo.value = {
                    nickname: localStorage.getItem('nickname'),
                    avatar: localStorage.getItem('avatar'),
                    background: localStorage.getItem('background'),
                    signature: localStorage.getItem('signature'),
                    fans_num: localStorage.getItem('fans_num'),
                    follow_num: localStorage.getItem('follow_num'),
                    note_num: localStorage.getItem('note_num')
                }
            }
            
        }, 200);
        console.log("目录测试："+JSON.stringify(userInfo.value)); 
    })
   
</script>

<template>
    <div class="my-box">
        <img class="bgImg" v-if="userInfo.background" :src="userInfo.background" alt="">
        <img class="bgImg" v-else src="@/assets/default_bg.png" alt="">
        <div class="info-box">
            <!-- <div class="sign">{{signature}}</div> -->
            <div class="sign">{{userInfo.signature}}</div>
            <div class="author-box">
                <img class="avatar" :src="userInfo.avatar" alt="">
                <!-- <img :src="avatar" alt=""> -->
                <div class="left-box">
                    <div class="top-box">
                        <!-- <div class="author">{{nickname}}</div> -->
                        <div class="author">{{userInfo.nickname}}</div>
                        <button>+关注</button>
                    </div>
                    <div class="bottom-box">
                        <div class="info-items">
                            <p class="item-title">园龄</p>
                            <p>{{userInfo.fans_num}}</p>
                        </div>
                        <div class="info-items">
                            <p class="item-title">粉丝</p>
                            <p>{{userInfo.fans_num}}</p>
                        </div>
                        <div class="info-items">
                            <p class="item-title">关注</p>
                            <p>{{userInfo.follow_num}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-box{
    .bgImg{
        width: 100%;
        height: 285px;
        // border-radius: 20px;
        z-index: 1;
        opacity: 0.9;
    }
    .info-box{
        position: relative;
        .sign{
            position: absolute;
            top: -200px;
            left: 50%;
            transform: translateX(-50%);
            color: $theme-text;
        }
        .author-box{
            position: absolute;
            left: 20px;
            bottom: 10px;
            display: flex;
            img{
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-right: 15px;
            }
            .left-box{
                margin-top: 20px;
                .top-box,.bottom-box,.info-items{
                    display: flex;
                    align-items: center;
                    color: $theme-text;
                }
                .top-box{
                    .author{
                        font-size: 20px;
                        margin-right: 10px;
                    }
                }
                .bottom-box{
                    margin-top: 20px;
                    .info-items{
                        margin-right: 15px;
                        .item-title{
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>
