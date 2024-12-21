import httpInstance from "@/utils/utils"

// 根据笔记id查询全部评论
export function getComments(note_id,token){
    return httpInstance.get('/comment/list/',{
        note_id:note_id
    },{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 发布评论
export function addComment(form,token){
    return httpInstance.post('/action/create/comment/',{
        content:form.content,
        note_id:form.noteId,
        reply_id:form.replyId
    },{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}