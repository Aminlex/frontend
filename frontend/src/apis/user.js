import httpInstance from "@/utils/utils"

// 登录
export function login(form){
    return httpInstance.post('/login/',{
            username:form.name,
            pwd:form.pass
    },{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 根据用户id查询用户个人信息
export function getUserDeatil(user_id){
    return httpInstance.get(`/user/${user_id}/`)
    .then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 获取用户的关注
export function getUserConcerns(token){
    return httpInstance.get('/account/my/',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 获取个人信息
export function getMyInfo(token){
    return httpInstance.get('/user/my/',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 获取我的笔记
export function getMyNotes(id){
    return httpInstance.get('/note/user/created/', id).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}
// 获取我的笔记
// export function getMyNotes(token){
//     return httpInstance.get('/note/user/created/',{
//         headers:{
//             'Authorization': `Bearer ${token}`
//         }
//     }).then(res=>{
//         return res.data
//     }).catch(err=>{
//         ElMessage.error('获取出错！')
//     })
// }

// 获取我的笔记专栏
export function getMyColumns(token){
    return httpInstance.get('/group/note/',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 获取我的关注
export function getMyConcerns(token){
    return httpInstance.get('/user/follow_list/',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 获取我的收藏
export function getMyFavors(token){
    return httpInstance.get('/account/favors/',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        return res.data
    }).catch(err=>{
        ElMessage.error('获取出错！')
    })
}

// 修改个人信息
// export function updateInfo(){
//     return httpInstance.post()
// }