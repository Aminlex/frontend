<script setup>
    import { ref, onMounted } from 'vue'
    import calendarVue from "@/components/calendar.vue"
    import { MoreFilled } from '@element-plus/icons-vue'
    import { getMyColumns } from '@/apis/user'
    import { HomeFilled,Promotion,StarFilled,Setting } from '@element-plus/icons-vue'

    const id = ref(1)

    // 判断菜单选中给出右侧操作显示
    const activeIndex = ref('1')

    // 根据用户id查询专栏信息
    const columnslist = ref(null)
    const getColumnsInfo = async()=>{
        const token = localStorage.getItem('token')
        columnslist.value = (await getMyColumns(token)).data.records;
        // const res = await getColumnsById(props.userId,token);
        // columnslist.value = res.data;
        // console.log("columnslist:"+JSON.stringify(columnslist.value));
    }
    onMounted(()=>getColumnsInfo())
    // 更改菜单选中的值
    const handleSelect = (key, keyPath) =>{
      activeIndex.value = key; // 更新当前选中的菜单项
    }
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    :default-active="activeIndex"
                    @select="handleSelect">
                    <router-link :to="'/my/home'">
                        <el-menu-item index="1">
                            <el-icon><HomeFilled /></el-icon>
                            <template #title>首页</template>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="'/my/concern'">
                        <el-menu-item index="2">
                            <el-icon><Promotion /></el-icon>
                            <template #title>关注</template>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="'/my/collect'">
                        <el-menu-item index="3" >
                            <el-icon><StarFilled /></el-icon>
                            <template #title>收藏</template>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="'/my/update'">
                        <el-menu-item index="4">
                            <el-icon><Setting /></el-icon>
                            <template #title>个人中心</template>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-aside width="250px">
                <calendarVue/>
                <!-- 我的专栏 -->
                <div v-if="activeIndex == '1'" 
                    class="aside-box">
                    <div class="aside-item">
                        <div class="title">
                            <p>笔记专栏</p>
                            <p>(25)</p>
                        </div>
                        <!-- <router-link :to="`/user/${id}/home/columns`"> -->
                            <el-icon><MoreFilled /></el-icon>
                        <!-- </router-link> -->
                    </div>
                    <div class="bottom-item">
                        <div class="column-item"
                            v-for="column in columnslist"
                            :key="column.column_id"
                        >
                            {{column.name}}
                        </div>
                    </div>
                </div>
                <!-- 用户分组 -->
                <div v-else-if="activeIndex == '2'" class="aside-box">
                    <div class="aside-item">
                        <div class="title">
                            <p>用户分组</p>
                            <p>(4)</p>
                        </div>
                        <el-icon><MoreFilled /></el-icon>
                    </div>
                    <div class="bottom-item">
                        <div class="column-item"
                        v-for="column in columnslist"
                        :key="column.column_id">
                            {{column.name}}
                        </div>
                    </div>
                </div>
            </el-aside>
        </el-container>
    </div>
  
</template>

<style lang="scss" scoped>
    
</style>
<style lang="scss">
    .el-menu{  
        border-right: none;
        overflow: hidden;
        li{
            height: 35px;
            background-color: $theme-color;
            color: #6f7ad4;
            i{
                margin-left: 5px;
                color: #00d1b2;
                border-left: 3px solid $theme-color;
            }
        }
        li:hover{
            background-color: $theme-color;
        }
        .is-active{
            color: #6f7ad4;
            i{
                color: #ffd257;
                border-left: 3px solid $theme-active;
            }
        }
    }
    // .el-main{
    //     // background-color: pink;
    // }
    .aside-box{
        width: 200px;
        margin-top: 50px;
        border: 1px solid $border-color;
        border-radius: 15px;
        padding: 10px;
        .aside-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                display: flex;
                color: $theme-text;
                font-size: 14px;
            }
            .el-icon{
                color: $light-tilte-color;
            }
        }
        .bottom-item{
            margin-top: 10px;
            .column-item{
                width: auto;
                margin: 5px;
                font-size: 10px;
                padding: 3px;
                color: $title-color;
                border-radius: 50px;
                border: 1px solid $border-color;
            }
        }
    }
</style>
