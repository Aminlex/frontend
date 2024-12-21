<script setup>
    import { defineProps} from 'vue'

    const props = defineProps({
        note:Object
    })

    // 判断用户是否收藏
    
</script>

<template>
    <div class="right-box">
        <div class="item">
            <i class="iconfont icon-liulan4"></i>
            {{note.borwse_num}}
        </div>
        <div class="item">
            <i class="iconfont icon-shoucang"></i>
            {{note.collect_num}}
        </div>
        <div class="item">
            <i class="iconfont icon-xihuan"></i>
            {{note.favor_num}}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.right-box{
    display: flex;
    .item{
        margin-right: 10px;
        color: #6f7ad4;
        .iconfont{
           font-weight: 600;
        }
    }
}
</style>
