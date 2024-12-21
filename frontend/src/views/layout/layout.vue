<script setup>
    import { House, Edit, Avatar } from '@element-plus/icons-vue'
    import { Message, Bell, Histogram } from '@element-plus/icons-vue'
    import { ref, onMounted } from 'vue'
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router'

    const id = ref(1)

    const token = localStorage.getItem('token')
    const avatar = localStorage.getItem('avatar')
    onMounted(()=>{

        // console.log("Avatar:", avatar); // 检查 avatar 的值
        // console.log("Token ", token) 
        // window.addEventListener('beforeunload', (event) => {
        //     localStorage.clear(); // 用户关闭网页时清除所有localStorage数据
        // });
    })

    // 退出登录
    const router = useRouter()
    const exit = ()=>{
        localStorage.clear();
        router.push('/login') 
    }
    
</script>

<template>
    <div class="index-contanier">
        <el-container class="index-box">
            <el-header height="60px">
                <div class="title">WutNote</div>
                <div class="menu-box">
                    <div class="header-menu">
                        <div>
                            <router-link class="menu-item" to="/home" active-class="active">
                                <el-icon><House /></el-icon>
                                <span>首页</span>
                            </router-link>
                        </div>
                        <div>
                            <router-link class="menu-item" to="/create" active-class="active">
                                <el-icon><Edit /></el-icon>
                                <span>创作</span>
                            </router-link>
                        </div>
                        <div>
                            <router-link class="menu-item" to="'/my/home'" active-class="active">
                                <el-icon><Avatar /></el-icon>
                                <span>我的</span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="others">
                    <el-icon><Message /></el-icon>
                    <el-icon><Bell /></el-icon>
                    <el-icon><Histogram /></el-icon>
                </div>
                <el-dropdown v-if="token">
                    <div  >
                        <img class="avatar"  v-if="token" :src="avatar" alt="">
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <router-link to="/my/update">
                                <el-dropdown-item>个人资料</el-dropdown-item>
                            </router-link>
                            <el-dropdown-item @click="exit()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <div v-else>
                    <button class="login-button" @click="router.push('/login')">登录</button>
                </div>
            </el-header>
            <router-view></router-view>
        </el-container>
        <div class="bottom-box">
            <div class="policy">
                <p>关于我们</p>
                <p>隐私政策</p>
            </div>
            <!-- <div class="features">

            </div> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.index-contanier{
    background-color: $theme-color;
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
}
.el-header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: $theme-color;
    .title{
        font-size: 18px;
        font-weight: 800;
        color: #B4B8EF;
    }
    .menu-box{
        padding: 0 250px;
            .header-menu{
                border: none;
                display: flex;
                justify-content: space-around;
            .active{
                border-bottom:3px solid $theme-active;
                font-weight: bold;
            }
            .menu-item{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px 10px;
                margin: 0 40px;
                color:$theme-text;
                .el-icon{
                    font-size: 24px;
                    color: $theme-active;
                    margin-right: 10px;
                }
                span{
                    white-space: nowrap;
                }
            }
        
        }
    }
    .others{
        display: flex;
        .el-icon{
            color: #B4B8EF;
            font-size: 18px;
            font-weight: bold;
            margin: 5px;
        }
    }
    .avatar{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border:2px solid #c8cfcf;
    }
}

.bottom-box{
    position: absolute;
    bottom: 30px;
    right: 80px;
    .policy{
        margin: 30px;
        border-top:1px solid #BFC0CB;
        color:#BFC0CB;
        display:flex;
        justify-content: space-around;
        font-size:8px;
        p{
            margin: 2px 10px;
        }
    }
}

@media(max-width:900px){
    .index-contanier{
        width: 900px;
    }
}
</style>
