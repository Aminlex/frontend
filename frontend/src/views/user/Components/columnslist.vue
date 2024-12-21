<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import { defineProps} from 'vue'
    import { MoreFilled } from '@element-plus/icons-vue'
    import { getMyColumns } from '@/apis/user'
    import { getByColumnId, deleteColumn } from '@/apis/column'

    const props = defineProps({
        userId:Number
    })

    // const id = localStorage.getItem('id')
    const id = ref(1)

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

    // 专栏信息表单
    const columnForm = reactive({})
    const rules = {
        "name":[
            { required: true, message: '专栏名称不能为空' }
        ]
    }

    // 操作专栏弹窗控制
    const columnDialogVisible = ref(false)
    const actionType = ref('')

    // 添加专栏
    const addColumn = async(type)=>{
        columnDialogVisible.value = true;
        actionType.value = type;
    }

    // 编辑专栏
    const columnId = ref(0)  //编辑的专栏id
    const editColumn = async(type,id)=>{
        columnDialogVisible.value = true;
        actionType.value = type;
        columnId.value = id;
        const res = (await getByColumnId(columnId.value)).data;
        columnForm.name = res.title;
        columnForm.introduction = res.abstract;
    }

    // 删除专栏
    const delColumn = async(id)=>{
        const res = await deleteColumn(id);
        console.log("res:"+res);
        if(res.flag){
            ElMessage.success('删除成功！')
            getColumnsInfo();
        }else{
            ElMessage.error('删除失败！')
        }
    }

    // 根据专栏id查询专栏的笔记
    const notesColumn = ref(null)
    const getNotesList = async(id)=>{
        const res = await getNotesByColumnId(id);
        notesColumn.value = res.data;
    }

    // 将笔记从专栏中移除
    const deleteNoteFromColumn = async(noteId,columnId)=>{
        const res = await delNoteColumn(noteId,columnId);
        if(res.flag){
            ElMessage.success('删除成功！')
            getNotesList(columnId);
            getColumnsInfo();
        }else{
            ElMessage.error('删除失败！')
        }
    }

    
    // 表单提交校验
    const columnFormRef = ref(null)
    const columnCheck = ()=>{
        columnFormRef.value.validate(async (valid) => {
            if (valid) {
                // 编辑和增加操作
                if(actionType.value == 'edit'){
                    const res = await updateColumns(columnId.value,columnForm,token);
                    if(res.flag == true){
                        columnFormRef.value.resetFields();
                        columnDialogVisible.value = false;
                        ElMessage.success('修改成功！')
                    }else{
                        ElMessage.error('修改失败！')
                    }
                }else if(actionType.value == 'add'){
                    const res = await insertColumn(columnForm,token);
                    if(res.flag == true){
                        columnFormRef.value.resetFields();
                        columnDialogVisible.value = false;
                        ElMessage.success('添加成功！')
                    }else{
                        ElMessage.error('添加失败！')
                    }
                }
                // 重新获取数据更新
                getColumnsInfo()
            } else {
                return false;
            }
        })
    }

    const activeName = ref('1')

    const note_id = ref()
    // 笔记的跳转
    const navToNoteDetail = (id) =>{
        note_id.value = id;
        load();
        window.open(`/note/${id}`, '_blank');
    }

     //点击笔记增加浏览量
    const load = async() =>{
        const res = await addBrowse(note_id);
        if(!res.data.flag){
            ElMessage({ type: 'error', message: "获取失败！" })
        }
    }
</script>

<template>
    <div>
        <!-- 折叠专栏笔记 -->
        <el-scrollbar height="600px">
            <div class="columns-container">
                <el-collapse class="column-box" v-model="activeName" v-for="column in columnslist" :key="column.column_id"
                            accordion @change="getNotesList(column.id)">
                    <div class="top-item">
                        <div class="name">{{column.name}}</div>
                        <el-dropdown trigger="click" v-if="props.userId == id">
                            <el-icon class="more"><MoreFilled /></el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="editColumn('edit',column.column_id)">修改专栏</el-dropdown-item>
                                    <el-dropdown-item @click="delColumn(column.column_id)">删除专栏</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="bottom-item">
                        <el-collapse-item :title="column.note_num+'篇笔记'">
                            <div v-for="note in notesColumn" :key="note.id">
                                <div class="note-item">
                                    <div @click="navToNoteDetail(note.id)">{{note.title}}</div>
                                    <button @click="deleteNoteFromColumn(note.id,column.id)" v-if="props.userId == id">-</button>
                                </div>
                            </div>
                        </el-collapse-item>
                    </div>
                </el-collapse>
            </div>
        </el-scrollbar>
        <!-- 专栏添加按钮 -->
        <div class="add-button" @click="addColumn('add')" v-if="props.userId == id">
            <button class="add-column">+</button>
        </div>
        <!-- 添加专栏和笔记弹出框 -->
        <el-dialog
            v-model="columnDialogVisible"
            width="400px"
            title="专栏信息"
            align-center
            center>
            <el-form :model="columnForm" ref="columnFormRef"
                label-position="top">
                <el-form-item label="专栏名称" prop="name" required :rules="rules.name">
                    <el-input
                        v-model="columnForm.name"
                        style="width: 300px"
                        maxlength="20"
                        placeholder="专栏名称"
                        show-word-limit
                        type="text"
                    />
                </el-form-item>
                    <el-form-item label="简介" prop="introduction">
                        <el-input
                            v-model="columnForm.introduction"
                            maxlength="100"
                            style="width: 300px"
                            :rows="4" :cols="25"
                            placeholder="可填写简介"
                            show-word-limit
                            type="textarea"
                            resize="none"
                        />
                    </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="columnCheck">提交</el-button>
            </div>
            </template>
        </el-dialog>
    </div>
    
</template>


<style lang="scss" scoped>
/* 专栏折叠样式 */
.columns-container{
    position: relative;
    .column-box{
        width: 500px;
        padding: 10px 20px;
        margin-bottom: 20px;
        border: none;
        background-color: $low-theme-color;
        border-radius: 10px;
        .top-item{
            display: flex;
            justify-content: space-between;
            .name{
                color: $text-color;
            }
            .more{
                margin-right: 8px;
                cursor: pointer;
            }
        }
        .bottom-item{
            .note-item{
                padding: 5px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: $text-color;
                button{
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    border: 50%;
                    font-size: 18px;
                    text-align: center;
                }
            }
            
        }
    }
}

/* 添加按钮 */
.add-button{
    position: absolute;
    top: 400px;
    right: 120px;
    .add-column{
        background-color: $theme-active;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 30px;
        padding: 0;
    }
}
</style>
<style lang="scss">
/* 控制专栏弹窗按钮 */
.el-dialog{
    background-color: $low-theme-color;
    
    border: 1px solid $border-color;
    .el-dialog__headerbtn:hover i{
        color: $theme-text;
    }
    .el-dialog__body{
        display: flex;
        justify-content: center;
        .el-form-item{
            margin-bottom: 15px;
            label{
                color: $theme-text;
            }
        } 
        
    }
}

/* 下拉框统一设置 */
.el-dropdown-menu{
    background-color: $low-theme-color; 
    .el-dropdown-item{
        color: $text-color; 
        background-color: $low-theme-color;
    }
    .el-dropdown-item:hover{
        background-color: $border-color; 
    }
} 

/* 隐藏右侧滚动条 */
.el-scrollbar__bar{
    display: none;
}

/* 专栏折叠样式 */
.el-collapse-item__header,.el-collapse-item__wrap{
    background-color: $low-theme-color;
    color: $text-color;
    border: none;
}
.el-collapse-item {
    background-color: $low-theme-color;
}
</style>