<script setup>
    import { ref, onMounted, reactive, watch } from 'vue'
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router'
    import { handelImageFile,addNote,aiText } from '@/apis/note'
    import { ElMessage } from 'element-plus'
    import { Back } from '@element-plus/icons-vue'

    import MenuBar from "@/views/create/Menubar/menubar.vue"
    import { useEditor, EditorContent } from "@tiptap/vue-3"
    import StarterKit from "@tiptap/starter-kit"
    import Placeholder from "@tiptap/extension-placeholder"
    import Document from "@tiptap/extension-document"
    import Highlight from '@tiptap/extension-highlight'
    import Image from '@tiptap/extension-image'
    import HeadingExtension from '@tiptap/extension-heading'
    

    // import CodeBlock from '@tiptap/extension-code-block'
    // import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
    // import lowlight from 'lowlight'
    // import javascript from 'lowlight/lib/languages/javascript'

    import Table from '@tiptap/extension-table'
    import TableRow from '@tiptap/extension-table-row'
    import TableCell from '@tiptap/extension-table-cell'
    import TableHeader from '@tiptap/extension-table-header'

    const user = useUserStore()
    const router = useRouter()
    const token = ref(localStorage.getItem('token'))

    const CustomTableCell = TableCell.extend({
        addAttributes() {
            return {
                // 展开现有属性,?.是可选链操作符,可以自行百度(懂的大佬当我没说)
                ...this.parent?.(),

                // 添加新的属性
                backgroundColor: {
                    default: null,
                    parseHTML: (element) => element.getAttribute('data-background-color'),
                    renderHTML: (attributes) => ({
                        'data-background-color': attributes.backgroundColor,
                        style: `background-color: ${attributes.backgroundColor}`
                    })
                }
            }
        }
    })
    // lowlight.registerLanguage('javascript', javascript)

// const CodeBlockExtension = CodeBlock.extend({
//   addOptions() {
//     return {
//       highlight: highlight,
//     };
//   },
// });
    const editor = useEditor({
        content: '',
        extensions:[
            Document,
            StarterKit,
            Image,
            // CodeBlock,
            // CodeBlockLowlight.configure({
            //     lowlight,
            // }),
            Highlight.configure({multicolor:true}),
            HeadingExtension.configure({levels:[1,2,3]}),
            Table.configure({
                resizable:true
            }),
            TableRow,
            TableCell,
            TableHeader,
            CustomTableCell,
            Placeholder.configure({
                placeholder:"开始你的笔记创作之旅"
            })
        ]
    }) 

    // 粘贴复制图片
    const handelPaste = async (event) =>{
        // 获取粘贴的数据
        const pasteData = event.clipboardData || window.clipboardData;
        const items = pasteData.items;
        if (items && items.length > 0) {
            for (let item of items) {
                // 检查 item 是不是文件类型
                if (item.kind === 'file') {
                    // 将 item 转换为 File 对象
                    const file = item.getAsFile();
                    if (file && file.type.match('image.*')) {
                        user.isLoading = true;
                        const res = await handelImageFile(file, token.value);
                        // const imgHTML = `<img src="${res.url}" width="500px" />`;
                        const imgHTML = {
                            type: 'image',
                            attrs: {
                                src: res.url,
                                style: 'width: 500px; height: auto;', // 使用内联样式
                            },
                        };
                        if(editor.value){
                            editor.value.commands.insertContent(imgHTML);
                        }
                        user.isLoading = false;
                    }else{
                        console.log("未被初始化");
                    }   
                }
            }
        }
    }

    // // 选中内容进行ai辅助
    // const selectedText = ref('');
    // 监听编辑器内容的变化
    // const getSelectedText = ()=>{}
    // const selection = editor.value.commands.selectedText;
    // watch(selection ,(newselection => {
    //     if (selection) {
    //         const selection = newEditor.value.state.selection;
    //         if (selection) {
    //             const range = selection.$from;
    //             const to = selection.$to;
    //             const text = newEditor.getRangeText(range, to);
    //             selectedText.value = text;
    //         } else {
    //             selectedText.value = '';
    //         }
    //     }
    // }, { deep: true }))

    // 动态更改文本域的高度
    const toolText = ref('')
    watch(toolText ,(newToolText => {
        if (newToolText) {
            const textarea = document.getElementById('toolResize');
            textarea.style.height = 'auto'; // 重置高度
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }))
    const resultText = ref('')
    watch(resultText ,(newResultText => {
        if (newResultText) {
            const textarea = document.getElementById('resultResize');
            textarea.style.height = 'auto'; // 重置高度
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }))

    // 对选中内容ai细化
    const aiToolText = async(tool) =>{
        const res = await aiText(tool,toolText.value,token.value);
        resultText.value = res.text;
        console.log(resultText.value)
    }


    // 控制笔记保存信息的提交
    const noteDialogShow = ref(false)
    const noteForm = reactive({
        title:"",
        abstract:"",
        content:"",
        tags:[]
    })
     const rules = {
        "tags":[
            { required: true, message: '标题不能为空' }
        ],
        "column":[
            { required: true, message: '摘要不能为空' }
    ]}

    // 目录生成
    

    const tagIput = ref('')
    const inputVisible = ref(false)
    const showInput = () =>{
        inputVisible.value = true
    }
    // 标签添加
    const handleInputConfirm = () =>{
        noteForm.tags.push(tagIput.value)
        tagIput.value = ''
        inputVisible.value = false
    }
    // 标签删除
    const handleClose = (tag) =>{
        const index = noteForm.tags.indexOf(tag)
        noteForm.tags.splice(index,1)
    }


    // 提交表单
    const noteFormRef = ref(null)
    const noteFormCheck = ()=>{
        noteFormRef.value.validate(async (valid) => {
            if (valid) {  
                // 获取编辑器里面的内容
                noteForm.content = editor.value.getHTML();       
                const res = await addNote(noteForm,token.value); 
                if(res.status == 201){
                    ElMessage.success("发布成功！")
                    editor.value.commands.clearContent();                     
                    noteFormRef.value.resetFields();
                }else{
                    ElMessage.error("服务器错误！")
                }
            }
      });
    }
    
</script>

<template>
    <div class="create-ai-box" >
        <div class="create-container">
                <MenuBar :editor="editor"/>
                <div class="editor-contanier">
                    <el-scrollbar class="editor-box" style="height: 100%;">
                        <div class="scroll-content">
                            <textarea class="title-input" placeholder="请输入标题"></textarea>
                            <editor-content id="editor" :editor="editor"  @paste="handelPaste" style="color:#DCDCDC;"/>
                        </div>
                    </el-scrollbar> 
                    <!-- 图片加载动画 -->
                    <div class="loading-box" v-if="user.isLoading">
                        <img src="@/assets/loading.jpg" alt="" class="loading">
                        <p>图片上传中...</p>
                    </div>
                </div>
                <div class="save-container">
                    <div class="save-box">
                        <div class="top-box">
                            <el-button class="cancel" @click="noteFormCheck">取消</el-button>
                            <el-button class="add" @click="noteFormCheck">发布</el-button>
                        </div>
                        <div class="bottom-box">
                            <div class="note-container">
                                <!-- <el-form :model="noteForm" ref="noteFormRef" class="note-box" >
                                    <el-form-item prop="title" label="标题：" :rules="rules.title">
                                        <input v-model="noteForm.title" style="width: 240px"/>
                                    </el-form-item>
                                    <el-form-item prop="tags" label="标签：">
                                        <div class="addtags-box">
                                        <input
                                            v-if="inputVisible"
                                            v-model="tagIput"
                                            @keyup.enter="handleInputConfirm"/>
                                        <el-button v-else class="button-new-tag" @click="showInput">
                                        + 添加标签
                                        </el-button>
                                        <div class="tags-box">
                                            <el-tag
                                                v-model="noteForm.tags"
                                                v-for="tag in noteForm.tags"
                                                :key="tag"
                                                closable
                                                @close="handleClose(tag)">
                                                {{ tag }}
                                            </el-tag>
                                        </div>
                                    </div>
                                    </el-form-item>
                                    <el-form-item prop="column" label="添加到专栏：" :rules="rules.abstract">
                                        
                                    </el-form-item>
                                </el-form> -->
                            </div>
                        </div>
                    </div> 
                </div>
        </div> 
        <!-- 智能创作区域 -->
        <div class="ai-box">
            <div class="title text-item">智能创作</div>
            <div class="select-box">
                <el-scrollbar height="100px">
                    <textarea class="select-text" v-model="toolText"
                        name="" id="toolResize" cols="16"></textarea>
                </el-scrollbar>
                <div class="features">
                    <div class="text-item" @click="aiToolText('续写补全')" style="cursor: pointer;">续写补全</div>
                    <div class="text-item" @click="aiToolText('总结摘要')" style="cursor: pointer;">总结摘要</div>
                    <div class="text-item" @click="aiToolText('英汉翻译')" style="cursor: pointer;">英汉翻译</div>
                    <div class="text-item" @click="aiToolText('段落续写')" style="cursor: pointer;">段落续写</div>
                </div>
            </div>
            <div class="result-box">
                <el-scrollbar height="250px">
                    <textarea class="select-text" v-model="resultText"
                        name="" id="resultResize" cols="16" ></textarea>
                </el-scrollbar>
                <div class="features">
                    <p class="text-item">插入</p>
                    <p class="text-item">复制</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.create-ai-box{
    display:flex;
    justify-content: end;
    background-color: $theme-color;
}
.create-container{
    display: flex;
    flex-direction: column;
    .editor-contanier{
        height: 500px;
        display: flex;
        justify-content: center;
        padding: 30px;
        .title-input{
            background-color: $low-theme-color;
            border: none;
            height: 30px;
            outline:none;
            resize: none;
            width: 100%;
            font-size: 25px;
            font-weight: bold;
            border-bottom: 1px solid rgb(217, 217, 217,0.6); 
        }
        textarea::placeholder{
            color: $title-color; /* 灰色占位符文本 */
            opacity: 0.5; /* 确保文本可见 */
        }
        .loading-box{
            position: fixed;
            top: 50%;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 30px;
            }
            p{
                margin-top: 5px;
                color: $text-color;
            }
        } 
    }

    .editor-box{                                  
        width: 800px;
        padding: 20px 50px;
        background-color: $low-theme-color;
        border-radius: 15px;
        .scroll-content {
            width: 100%;
            overflow-x: hidden;
        }
    }


    .save-container{
        display: flex;
        justify-content: center;
        margin: 20px 0;
        .save-box{
            width: 850px;
            // padding: 15px;
            background-color: $theme-color;
            // border: 2px solid $low-theme-color;
            // background-color: pink;
            color: $theme-text;
            .top-box{
                padding: 10px;
                display: flex;
                justify-content: end;
                align-items: center;
                .el-button{
                    width: 65px;
                    height: 25px;
                    font-size: 14px;
                    color:#fff;
                }
                .cancel{
                    background-color: rgb(240, 209, 210,0.34);
                }
                .add{
                    background-color: rgb(255, 179, 204,0.69)
                }
            }
        }
    }
    .el-button{
        background-color: $theme-active;
        color: $theme-color;
        border: none;
    }
    .bottom-box{
        padding: 0 50px;
        .addtags-box{
            .el-tag{
                background-color: $low-theme-color;
                color: $theme-text;
                border: none;
            }
        }
    }
    .note-container{
        display: flex;
        input{
            height: 28px;
            border-radius: 5px;
            background-color: #282828;
        }
    }
    .note-box{
        .el-form-item{
            margin: 15px 0;
        }
        .addtags-box{
            display: flex;
            flex-direction: column;
            .tags-box{
                margin-top: 10px;
            }
        }
        textarea{
            resize: none;
            width: 500px;
            height: 250px;
            outline: none;
            background-color: #282828;
            border: none;
            color:#DCDCDC;
            font-size: 16px;
            padding: 10px;
        }
    }
}

.ai-box{
    margin: 20px 40px;
    padding: 20px;
    width: 200px;
    background-color: $low-theme-color;
    border-radius: 10px;
    text-align: center;
    .title{
        margin-bottom: 15px;
    }
    .text-item{
        color:$title-color;
        font-size: 14px;
    }
    .select-box,.result-box{
        background-color: $low-theme-color;
        border: 1px solid $border-color;
        border-radius: 15px;
        padding:10px 20px;
        .select-text{
            padding:10px;
            border:none;
            outline: none;
            background-color: $low-theme-color;
            resize: none;
            color: $theme-text;
        }
        .features{
            display: flex;
            flex-wrap: wrap;        /* 允许换行 */
            justify-content: space-between;
            border-top: 1px solid #6F7AD4;
            .text-item{
                margin-top: 3px;
                width: 49%;
            }
        }
    }
    .result-box{
        margin-top: 20px;
        .features{
            border-top: 1px solid $theme-active;
            .text-item{
                color:$theme-active;
            }
        }
    }
}

@media(max-width:1200px) {
    .create-ai-box{
        justify-content: center;
    }
    .ai-box{
        display:none;
    }
}

</style>
<style lang="scss">
.tiptap,.ProseMirror-focused {
    outline: none;
}
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
.tiptap p{
    margin-top: 10px;
    padding-left: 10px;
    // background-color: pink;
}
.tiptap p:hover{
    // margin-top: 10px;
    padding-left: 6px;
    border-left: 4px solid $theme-active;
}
blockquote{
    margin: 16px 0;
    padding: 20px 0;
    background-color: $block-color;
    border-left: 4px solid $block-border-color !important;
    p{
        margin: 0 !important;
    }
}

// 设置图片上传不在一行显示
.ProseMirror img {
    display: block;
}

/* 设置表格宽高 */
.ProseMirror table {
  width: 60%; /* 表格宽度 */
  border-collapse: collapse; /* 边框合并 */
}

.ProseMirror table td,
.ProseMirror table th {
  border: 1px solid #ddd; /* 单元格边框 */
  padding: 2px; /* 单元格内边距 */
  p{
    margin:0;
  }
}

/* 设置表头颜色 */
.ProseMirror table th {
  background-color: #f0f0f0; /* 表头背景颜色 */
}

.el-form-item__label {
  color: $theme-text;
}
blockquote{
  border-left: 3px solid $theme-color; /* 引用块左边的线 */
  color: $text-color; /* 文字颜色 */
  background-color: $theme-color; /* 背景色 */
}

</style>