<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">
      <el-button type="text" @click="onChapterDialog">添加章节</el-button>

      <!-- 添加和修改章节表单 -->
      <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
          <el-form :model="chapter" label-width="120px">
              <el-form-item label="章节标题">
                  <el-input v-model="chapter.title"/>
              </el-form-item>
              <el-form-item label="章节排序">
                  <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
          </div>
      </el-dialog>

      <!-- 添加和修改课时表单 -->
      <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
        <el-form :model="video" label-width="120px">
          <el-form-item label="课时标题">
            <el-input v-model="video.title"/>
          </el-form-item>
          <el-form-item label="课时排序">
            <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
          </el-form-item>
          <el-form-item label="是否免费">
            <el-radio-group v-model="video.free">
              <el-radio :label="true">免费</el-radio>
              <el-radio :label="false">收费</el-radio>
              <!-- <el-radio :label="0">免费</el-radio>
              <el-radio :label="1">收费</el-radio> -->
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="上传视频">
              <el-upload
                    :on-success="handleVodUploadSuccess"
                    :on-remove="handleVodRemove"
                    :before-remove="beforeVodRemove"
                    :on-exceed="handleUploadExceed"
                    :file-list="fileList"
                    :action="BASE_API+'/admin/servicevod/video/uploadVideo'"
                    :limit="1"
                    class="upload-demo">
              <el-button size="small" type="primary">上传视频</el-button>
              <el-tooltip placement="right-end">
                  <div slot="content">最大支持1G，<br>
                      支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                      GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                      MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                      SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                  <i class="el-icon-question"/>
              </el-tooltip>
              </el-upload>
          </el-form-item>
   
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <!-- <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button> -->
          <el-button  type="primary" @click="saveOrUpdateVideo">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 章节 -->
      <ul class="chanpterList">
          <li
              v-for="chapter in chapterVideoList"
              :key="chapter.id">
              <p>
                  {{ chapter.title }}

                  <span class="acts">
                      <el-button type="text" @click="onVideoDialog(chapter.id)">添加课时</el-button>
                      <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
                      <el-button type="text" @click="del(chapter.id)">删除</el-button>
                  </span>
              </p>

              <!-- 视频 -->
              <ul class="chanpterList videoList">
                  <li
                      v-for="video in chapter.children"
                      :key="video.id">
                      <p>{{ video.title }}
                          <span class="acts">
                              <el-button type="text" @click="editVideoBefore(video.id)">编辑</el-button>
                              <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                          </span>
                      </p>
                  </li>
              </ul>
          </li>
      </ul>
      <div>
          <el-button @click="previous">上一步</el-button>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
import vod from '@/api/edu/vod'
export default {
  data() {
    return {
      chapter: {// 章节对象
        title: '',
        sort: 0
      },
      video: {// 课时对象
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: '',//阿里视频id
        videoOriginalName: ''//视频名称
      },
      fileList: [],//上传文件列表
      BASE_API: process.env.BASE_API ,// 接口API地址
      courseId: '',//所需的课程id
      chapterVideoList: [],//章节小节集合
      dialogChapterFormVisible: false, //是否显示章节表单
      dialogVideoFormVisible: false,//是否显示小节表单
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },
  created() {
    this.init()
  },
  methods: {

    //视频上传
    //上传成功后的回调函数
    handleVodUploadSuccess(response,file,fileList){
      //视频id
      this.video.videoSourceId = response.data.videoId
      //视频名称
      this.video.videoOriginalName = file.name
    },

    //删除视频
    handleVodRemove(file, fileList){
      vod.removeAliVideo(this.video.videoSourceId).then(response =>{
        //重新添加小节时,上次视频上传信息需要清空
        this.video.videoSourceId = ''
        //视频名称
        this.video.videoOriginalName = ''
        this.fileList = []
        this.$message({
          type: 'success',
          message: response.message
        })
      })
    },

    //删除视频之前
    beforeVodRemove(file, fileList){
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    handleUploadExceed(){
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },


    //初始化方法
    init(){
      if(this.$route.params && this.$route.params.id){
        //赋值课程courseId
        this.courseId = this.$route.params.id
        this.getChapterVideo()
      }
    },
    //查询 章节和小节
    getChapterVideo(){
      chapter.getChapterVideo(this.courseId).then(response =>{
        //赋值章节和小节的数组集合
        this.chapterVideoList = response.data.chapterList
      })
    },
    //上一步
    previous() {
      this.$router.push({ path: '/edu/course/info/'+this.courseId })
    },
    //下一步
    next() {
      // console.log('next')
      this.$router.push({ path: '/edu/course/publish/'+this.courseId })
    },
//******************************   小节信息操作  ************************************************************/
    //弹框，解决每次点击添加小节时，数据不清空的问题
    onVideoDialog(id){
      this.dialogVideoFormVisible = true
      this.video.title = ''
      this.video.sort = 0
      this.video.free = 0
      this.video.videoSourceId = ''
      this.video.id = ''
      //用于在修改完成后，再次添加时，将修改的章节id清空，避免造成点击添加而执行修改操作
      this.video.chapterId = id

      //清空视频相关内容
      this.video.videoSourceId = ''
      this.video.videoOriginalName = ''
      this.fileList = []
      

    },
    saveOrUpdateVideo(){
      //小节id是否存在，存在就是修改，不存在就是添加
      if(!this.video.id){
        this.saveVideo()
      }else {
        this.editVideo()
      }
    },
    //添加小节
    saveVideo(){
      //设置课程id
      this.video.courseId = this.courseId
      video.addVideo(this.video)
        .then(response => {
           //关闭弹框
            this.dialogVideoFormVisible = false
            //给出提示
            this.$message({
              type: 'success',
              message: '小节添加成功！'
            })
            //刷新页面
            this.getChapterVideo()
          })
    },
    //修改小节前，回显数据
    editVideoBefore(id){
      this.dialogVideoFormVisible = true
      video.getVideo(id)
        .then(response => {
          this.video = response.data.eduVido
          console.log(this.video)
          this.fileList = [{'name': this.video.videoOriginalName}]
        })
    },

    //修改小节
    editVideo(){
      video.updateVideo(this.video)
        .then(response => {
          //关闭弹框
          this.dialogVideoFormVisible = false
          //给出提示
          this.$message({
            type: 'success',
            message: '小节修改成功！'
          })
          //刷新页面
          this.getChapterVideo()
        })
    },

    //删除小节
    removeVideo(id){
      this.$confirm('您确定删除这个小节吗？','提示',{
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() =>{
        //向后台发送ajax请求
        video.deleteVideo(id)
      }).then(response => {
        //给出结果提示
        this.$message({
          type: 'success',
          message: "小节删除成功！"
        })
        //刷新页面
        this.getChapterVideo()
      })
    },

//******************************   章节信息操作  **************************************************************/
    //弹框，解决每次点击添加章节时，数据不清空的问题
    onChapterDialog(){
      this.dialogChapterFormVisible = true
      this.chapter.title = ''
      this.chapter.sort = 0
      //用于在修改完成后，再次添加时，将修改的章节id清空，避免造成点击添加而执行修改操作
      this.chapter.id = ''
    },

    //添加章节和修改章节
    saveOrUpdate(){
      if(!this.chapter.id){
        this.add()
      }else {
        this.update()
      }
    },
    //添加章节
    add(){
      //定义章节所属的课程id
      this.chapter.courseId = this.courseId
      // console.log(this.chapter)
      //添加章节
      chapter.addChapter(this.chapter)
          .then(response => {
            //关闭弹框
            this.dialogChapterFormVisible = false
            //给出提示
            this.$message({
              type: 'success',
              message: '章节添加成功！'
            })
            //刷新页面
            this.getChapterVideo()
          })
    },
     //更新章节前，回显章节信息
    editChapter(id){
      //弹框
      this.dialogChapterFormVisible = true
      chapter.getChapter(id)
        .then(response =>{
          this.chapter = response.data.chapter
      })
    },
    //更新章节
    update(){
      // console.log(this.chapter)
      //定义章节所属的课程id
      this.chapter.courseId = this.courseId
      //添加章节
      chapter.updateChapter(this.chapter)
          .then(response => {
            //关闭弹框
            this.dialogChapterFormVisible = false
            //给出提示
            this.$message({
              type: 'success',
              message: '章节修改成功！'
            })
            //刷新页面
            this.getChapterVideo()
          })
    },

    //删除章节
    del(id){
      this.$confirm('您确定删除这个章节吗？','提示',{
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() =>{
        //向后台发送ajax请求
        chapter.deleteChapter(id)
      }).then(response => {
        //给出结果提示
        this.$message({
          type: 'success',
          message: "删除成功！"
        })
        //刷新页面
        this.getChapterVideo()
      })
    }
  }
}
</script>
<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>