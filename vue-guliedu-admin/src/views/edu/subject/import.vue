<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <!-- <el-tag type="info">第一版</el-tag>用于标记和选择 -->
        <el-tag>
          <i class="el-icon-download"/><!-- 图标 -->
          <a :href="OSS_PATH + '/excel/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB.xls'">点击下载模版</a>
          <!-- <a href="/static/课程分类">点击下载模版</a> -->
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/admin/serviceedu/subject/addSubjectSort'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API, // 接口API地址
            OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false
        }
    },
    methods: {
        submitUpload(){
            this.fileUploadBtnText = '正在导入'
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        },
        fileUploadSuccess(response){
            if (response.success === true) {
                this.fileUploadBtnText = '导入成功'
                this.loading = false
                this.$message({
                    type: 'success',
                    message: '分类课程添加成功！'
                })
            }
        },
        fileUploadError(response){
             this.fileUploadBtnText = '导入失败'
            this.importBtnDisabled = true
            this.loading = false
            this.$message({
                type: 'error',
                message:'分类课程添加失败！'
            })
        }
    }
}
</script>