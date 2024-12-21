<script setup>
    import { ref,onMounted,computed } from 'vue'
    import { useUserStore } from '@/stores/user'
    import noteslistVue from "@/views/user/Components/noteslist.vue"
    import columnslistVue from "@/views/user/Components/columnslist.vue"
    import concernslistVue from "@/views/user/Components/concernslist.vue"
    import favorslistVue from "@/views/user/Components/favorslist.vue"
    import { useRoute} from 'vue-router'
    import { getMyNotes, getMyColumns, getMyConcerns, getMyFavors} from '@/apis/user'

    // 全局数据存储
    const token = ref(localStorage.getItem('token'))
    const nickname = ref(localStorage.getItem('nickname'));
    const avator = ref(localStorage.getItem('avator'));
    const signature = ref(localStorage.getItem('signature'));
  
   
    // 获取其他用户的信息
    const route = useRoute()
    const userId = route.params.id

    // 挂载时加载用户的全部信息
    const mynotes = ref({})
    const myfavors = ref({})
    onMounted(async ()=>{
        mynotes.value = (await getMyNotes(token.value)).data.records;
        myfavors.value = (await getMyFavors(token.value)).data.records;
    })
</script>

<template>
    <el-container class="main-container">
        <div class="main-box">
            <div class="my-box">
                <div class="info-box">
                    <img :src="avator" alt="">
                    <div>
                        <div class="author">{{nickname}}</div>
                        <div class="sign">{{signature}}</div>
                    </div>
                </div>
                <div class="menu-box">
                    <el-tabs tab-position="left"  class="tabs-box">
                        <el-tab-pane label="笔记">
                            <noteslistVue :notesList="mynotes"/>
                        </el-tab-pane>
                        <el-tab-pane label="专栏">
                            <columnslistVue :userId="userId"/>
                        </el-tab-pane>
                        <el-tab-pane label="关注">
                            <concernslistVue :userId="userId"/>
                        </el-tab-pane>
                        <el-tab-pane label="收藏">
                            <favorslistVue :notesList="myfavors"/>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </el-container>
</template>

<style lang="scss" scoped>
.main-container{
    display: flex;
    justify-content: center;
    background-color: $theme-color;
}
.main-box{
    display: flex;
    justify-content: center;
}
.my-box{
    margin-top: 20px;
    width: 800px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 8px;
    background-color: #141414;
    border: 2px solid $border-color;
    .info-box{
        display: flex;
        align-items: center;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border:2px solid #c8cfcf;
            margin-right: 20px;
        }
        .author{
            font-weight: bold;
            color: $text-color;
        }
        .sign{
            margin-top: 10px;
            font-size: 12px;
            color: $text-color;
        }
    }
    .menu-box{
        margin-top: 30px;
        .el-tab-pane{
           margin-left: 50px;
        }
    }
}
</style>
<style lang="scss">
.el-tabs__item.is-active {
    color: $theme-active;
}
.el-tabs__item{
    color: $text-color;
}
.el-tabs__item:hover{
    color: $theme-active;
}
.el-tabs__active-bar{
    background-color: $theme-active;
}
</style>