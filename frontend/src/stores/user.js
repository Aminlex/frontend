import { defineStore } from "pinia"

export const useUserStore = defineStore('user',{
    state:() => {
        return {
            isLoading:false,
            dialogVisible:false,
            commentVisibleIndex:-1 //当前评论的id
        }
    },
    actions:{
        
    }
})

