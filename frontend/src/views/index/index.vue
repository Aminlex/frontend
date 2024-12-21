<script setup>
    import noteslistVue from "@/views/index/Components/noteslist.vue"
    import hotNotesVue from "@/views/index/Components/hotNotes.vue"
    import hotFavorsVue from "@/views/index/Components/hotFavors.vue"
    import calendarVue from "@/components/calendar.vue"
    import { Search, MoreFilled } from '@element-plus/icons-vue'
    import { onMounted, ref } from 'vue'
    import { getNotesList,getHotNotesList } from '@/apis/note'
    import { getHotTagsList } from '@/apis/tag'
    import { getMyConcerns, getMyInfo } from "@/apis/user"

    const tagslist = ref(["高等数学","大学物理","课程介绍","期末复习","考研","留学","计算机专业课","保研"])
    const tagSelect = ref()

    const notesList = ref([])
    const hotNotesList =ref([])
    const hotTagsList =ref([])
    const concernsList = ref([])
    const UserInfo = {
        background: localStorage.getItem('background'),
        avatar: localStorage.getItem('avatar'),
        nickname: localStorage.getItem('nickname'),
    }
    // const total = ref()
    // const page = ref(1)
    // const limit = ref(9)
    const keyword = ref('')
    onMounted(async ()=>{
        // 获取首页笔记热榜
        hotNotesList.value = (await getHotNotesList()).data;
        // 获取笔记热门分类
        hotTagsList.value = (await getHotTagsList()).data;
        

        // 获取首页展示笔记
        const res = (await getNotesList(keyword.value)).data;
        notesList.value = res.notes;
        // total.value = res.total;
        
        // 获取关注列表
        const token = localStorage.getItem('token')
        concernsList.value = (await getMyConcerns(token)).users;

        
    })
    
</script>

<template>
    <el-container class="main-container">
        <div class="main-box">
            <div class="content-box">
                <div class="left-box">
                    <hotNotesVue :topList="hotNotesList"/>
                    <hotFavorsVue :topList="hotTagsList"/>
                </div> 
                <div class="middle-box">
                    <div class="search-box">
                        <div class="search-input">
                            <el-icon><Search /></el-icon>
                            <input type="text" placeholder="search" v-model="keyword">
                        </div>
                        <!-- 搜索下拉框 -->
                        <div class="search-content" style="background:#fff;">
                            <div class="search-item" 
                                v-for="note in searchList"
                                :key="note.note_id">
                                <el-icon><Search /></el-icon>
                                <div>{{note.title}}</div>
                            </div>
                        </div>
                    </div>
                    <noteslistVue :notesList="notesList"/>
                    <!-- 笔记分页组件 -->
                    <div class="pages">
                        <el-pagination 
                            layout="prev, pager, next" 
                            :total="total"
                            :page-size="8" />
                    </div>
                </div>
                <div class="right-box">
                    <div>
                        <div class="top-box">
                            <img class="bgImg" v-if="UserInfo.background" :src="UserInfo.background" alt="">
                            <div class="author-box">
                                <img class="avatar" v-if="UserInfo.avatar" :src="UserInfo.avatar" alt="">
                                <p class="name">{{UserInfo.nickname}}</p>
                            </div>
                        </div>
                        <div class="concerns-box">
                            <div class="top-item">
                                <p>我的关注</p>
                                <el-icon class="more"><MoreFilled /></el-icon>
                            </div>
                            <div class="concerns">
                                <div class="concern-item"
                                    v-for="concern in concernsList"
                                    :key="concern.user_id">
                                        <!-- <img src="@/assets/avatar.png" alt=""> -->
                                        <img :src="concern.avatar" alt="">
                                        <p>{{concern.nickname}}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="bottom-box">
                        <calendarVue/>
                    </div>
                </div>
            </div>
        </div>
    </el-container>
</template>

<style lang="scss" scoped>
.main-container{
    display: flex;
    justify-content: space-around;
    background-color: $theme-color;
    margin-top: 20px;
}
.main-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.search-box{
    position: relative;
    height: 30px;
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
.content-box{
    display: flex;
    // .left-box{
       
        
    // }
    .middle-box{
        width: 850px;
        padding: 0 15px;
        color: $theme-text;
        border-radius: 10px;
        background-color: $theme-color;
        margin-left: 30px;
        p{
            padding: 20px 0;
            font-size: 20px;
            font-weight: bold;
            border-bottom: 2px solid $border-color;
        }
    }
    .right-box{
        position: relative;
        color: $theme-text;
        margin-left: 30px;
        // border-radius: 20%;
        .top-box{
            position: relative;
            width: 200px;
            height: 120px;
            .bgImg{
                width: 100%;
                height: 100%;
                border-radius: 20px;
                z-index: 1;
                opacity: 0.5;
            }
            .author-box{
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 20px;
                display: flex;
                align-items: end;
                .avatar{
                    z-index: 999;
                    width: 50px;
                    height: 50px;
                    border-radius: 50% 50% 0 50%;
                    margin-right: 10px;
                }
                p{
                    font-size: 16px;
                }
            }
        }
        .concerns-box{
            height: 60px;
            overflow: hidden;
            margin-top: 15px;
            .top-item{
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 14px;
                    color:$title-color;
                }
                .el-icon{
                    color:$light-tilte-color;
                }
            }
            .concerns{
                display: flex;
                justify-content: space-around;
                .concern-item{
                    display: flex;
                    flex-direction: column;
                    img{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                    }
                    p{
                        font-size: 10px;
                        color: $theme-text;
                    }
                }

            }
        }
    }
}
</style>
<style lang="scss">
.el-checkbox .el-checkbox__inner {
    background-color: $theme-color;
    border-color: $border-color; 
}
.el-checkbox .el-checkbox__label{
    margin-left: 18px;
}

/* 分页组件样式 */
.pages{
    display: flex;
    justify-content: end;
    .el-pagination{
        button,li{
            background-color: $theme-color;
            border: 1px solid $border-color;
            color:$text-color;
            margin: 5px;
        }
        .el-pager .is-active{
            border: 1px solid $theme-active;
        }
    }
} 
</style>