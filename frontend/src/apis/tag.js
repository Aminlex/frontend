import httpInstance from "@/utils/utils"
import { ElMessage } from 'element-plus'

// 获取首页热榜分类
export function getHotTagsList(){
    return httpInstance.get("/hot/tag/")
    .then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}