import httpInstance from "@/utils/utils"

// 根据专栏id获取专栏信息
export function getByColumnId(columnid){
    return httpInstance.get(`/note/column/${columnid}/`)
    .then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 根据专栏id删除专栏
export function deleteColumn(id){
    return httpInstance.delete('/section/delete',{
        params:{
            id:id
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}