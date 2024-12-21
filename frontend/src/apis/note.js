import httpInstance from "@/utils/utils"
import { ElMessage } from 'element-plus'

// 获取首页笔记(包括搜索)
export function getNotesList(keyword){
    return httpInstance.get("/note/list/",{
        params:{
            keyword:keyword
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 获取首页热榜笔记
export function getHotNotesList(){
    return httpInstance.get("/hot/note/")
    .then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 根据笔记id获取笔记详情
export function getNoteDetail(note_id){
    return httpInstance.get(`/note/${note_id}/`)
        .then(res=>{
            return res.data;
        }).catch(err=>{
            ElMessage.error('获取出错！')
        })
}

// 添加笔记
export function addNote(form,token){
    return httpInstance.post('/edit/',{
        title:form.title,
        abstract:form.abstract,
        content:form.content,
        tags:[]
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        ElMessage.error('上传失败！')
    })
}

// 处理上传的图片
export function handelImageFile(file,token){
    const formData = new FormData();
    formData.append('img',file);
    return httpInstance.post('/action/upload/img/',formData,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        const user = useUserStore();
        user.isLoading = false;
        ElMessage.error('上传出错！')
    })
}

// ai辅助功能
export function aiText(tool,text,token){
    return httpInstance.post('/action/ai/',{
        tool:tool,
        text:text
    },{
        headers:{
            'Authorization': `Bearer ${token}`,
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        const user = useUserStore();
        user.isLoading = false;
        ElMessage.error('上传出错！')
    })
}
