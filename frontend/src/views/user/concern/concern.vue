<script setup>
    import { Search } from '@element-plus/icons-vue'
    import { onMounted, ref } from 'vue'
    import { getMyConcerns } from '@/apis/user'

    const concernslist = ref({})
    onMounted(async ()=>{
        const res = await getMyConcerns();
        concernslist.value = res.records;
    })

    // const concernslist = ref([{
    //     "user_id": 2,
    //     "avatar": null,
    //     "nickname": "xiaowang",
    //     "signature": "小王同学真的很爱学习"
    //   },
    //   {
    //     "user_id": 3,
    //     "avatar": null,
    //     "nickname": "lisi",
    //     "signature": "李四同学正在修炼中..."
    //   }])
</script>

<template>
    <el-scrollbar height="600px">
            <p>关注的用户</p>
            <div class="search-box">
                <div class="search-input">
                    <el-icon><Search /></el-icon>
                    <input type="text" placeholder="search">
                </div>
            </div>
            <div class="concerns-container">
                <div class="concerns-box" v-for="concern in concernslist" :key="concern.user_id">
                    <div class="my-box">
                        <img class="bgImg" src="@/assets/avatar.png" alt="">
                        <div class="author-box">
                            <div class="top-box">
                                <img class="avatar" src="@/assets/avatar.png" alt="">
                                <!-- <img :src="avatar" alt=""> -->
                                <div class="left-box">
                                    <div class="top-box">
                                        <div class="author">{{concern.nickname}}</div>
                                    </div>
                                    <div class="bottom-box">
                                        <div class="info-items">
                                            <p>0</p>
                                            <p class="item-title">关注</p>
                                        </div>
                                        <div class="info-items">
                                            <p>0</p>
                                            <p class="item-title">笔记</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sign">{{concern.signature}}</div>
                        </div>
                    </div>
                    <div class="note-bottom">
                        <div class="left-text">关注于 2023-12</div>
                        <div class="right-box">
                            <button class="cancel">取消关注</button>
                            <button>设置分组</button>
                        </div>
                    </div>
                    
                </div>
            </div>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-scrollbar{
    text-align: center;
    p{
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
    .concerns-container{
        background-color: $low-theme-color;
        display: flex;        /* 启用弹性布局 */
        flex-wrap: wrap;      /* 允许项目换行 */
        // justify-content: space-between;
        padding: 2px 8px;
        .concerns-box{
            background-color: $theme-color;
            width: 260px;
            height: 180px;
            // border: 1px solid $border-color;
            margin: 8px 10px;
            padding: 10px;
            border-radius: 10px;
            .my-box{
                position: relative;
                .bgImg{
                    width: 100%;
                    height: 130px;
                    border-radius: 10px;
                    z-index: 1;
                    opacity: 0.5;
                }
                .author-box{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    color: $theme-text;
                    .top-box{
                        display: flex;
                        align-items: center;
                        img{
                            width: 65px;
                            height: 65px;
                            border-radius: 50%;
                            margin-right: 15px;
                        }
                        .left-box{
                            .top-box,.bottom-box,.info-items{
                                display: flex;
                                align-items: center;
                            }
                            .top-box{
                                .author{
                                    font-size: 20px;
                                    margin-right: 10px;
                                }
                            }
                            .bottom-box{
                                margin-top: 5px;
                                .info-items{
                                    margin-right: 10px;
                                    p{
                                        color: $theme-text;
                                        font-size: 12px;
                                        margin-right: 5px;
                                        white-space: nowrap;
                                    }
                                }
                            }
                        }
                    }
                    .sign{
                        margin-top: 15px;
                        font-size: 12px;
                    }
                }
            }
            .note-bottom{
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left-text{
                    color: $theme-text;
                    opacity: 0.7;
                    font-size: 12px;
                }
                .right-box{
                    display: flex;
                    button{
                        width: 70px;
                        height: 25px;
                        // padding: 5px;
                        font-size: 13px;
                    }
                    .cancel{
                        background-color: #DCEBFE;
                        opacity: 0.9;
                        color: #262323;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
}
    
</style>
