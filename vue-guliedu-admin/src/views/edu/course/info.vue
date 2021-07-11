<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-form
      ref="courseForm"
      :model="courseForm"
      :rules="validateRules"
      label-width="120px"
    >
      <el-form-item label="课程标题" prop="title">
        <el-input v-model="courseForm.title" />
      </el-form-item>
      <!-- 所属分类 二级联动的形式：选择一级分类，二级分类显示对应的二级分类 -->
      <el-form-item label="课程分类" prop="subjectParentId">
        <!-- 一级分类 给一级分类课程做单机事件，单机具体的一级课程时，二级分类下拉中为对应的二级分类-->
        <el-select
          v-model="courseForm.subjectParentId"
          placeholder="一级分类"
          @change="getTwoSubjectList"
        >
          <el-option
            v-for="course in oneSubjectList"
            :key="course.id"
            :label="course.title"
            :value="course.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseForm.subjectId" placeholder="二级分类">
          <el-option
            v-for="course in twoSubjectList"
            :key="course.id"
            :label="course.title"
            :value="course.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程讲师" prop="teacherId">
        <el-select v-model="courseForm.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时" prop="lessonNum">
        <el-input-number
          :min="0"
          v-model="courseForm.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseForm.description" />
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/admin/serviceoss/oss/upload'"
          class="avatar-uploader"
        >
          <img :src="courseForm.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseForm.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          round
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
//引入课程api,调用后台获取一级和二级分类课程
import subject from "@/api/edu/subject";
//引入富文本组件
import Tinymce from "@/components/Tinymce";
export default {
  //声明组件
  components: {
    Tinymce,
  },
  data() {
    return {
      courseForm: {
        title: "",
        subjectId: "", //二级分类id
        subjectParentId: "", //一级分类id
        teacherId: "",
        lessonNum: 0,
        description: "",
        //默认封面
        cover: "/static/IMG_0671.JPG",
        price: 0,
      },
      id: "", //修改跳转到下一步所需要的课程的id值
      BASE_API: process.env.BASE_API, // 接口API后台上传接口
      saveBtnDisabled: false, // 保存按钮是否禁用
      teacherList: [], //下拉讲师的数组
      oneSubjectList: [], //一级分类数组
      twoSubjectList: [], //二级分类数组
      validateRules: {
        title: [
          { required: true, trigger: "change", message: "课程标题必须输入" },
        ],
        subjectParentId: [
          {
            required: true,
            trigger: "change",
            message: "课程一级分类需要下拉选择",
          },
        ],
        subjectId: [
          {
            required: true,
            trigger: "change",
            message: "课程二级分类需要下拉选择",
          },
        ],
        teacherId: [
          {
            required: true,
            trigger: "change",
            message: "课程讲师需要下拉选择",
          },
        ],
        lessonNum: [
          { required: true, trigger: "change", message: "总课时需要大于0" },
        ],
      },
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  //页面加载之前的方法
  created() {
    //初始化
    this.init();
  },
  methods: {
    init() {
      //是否有参数，有就是修改
      if (this.$route.params && this.$route.params.id) {
        //赋值课程id
        this.id = this.$route.params.id;
        //查课程信息
        this.getCourse();
      } else {
        //初始化讲师下拉数据
        this.initTeacherList();
        //初始化一级分类课程
        this.initOneSubjectList();
        this.courseForm.title = "";
        this.courseForm.subjectId = "";
        this.courseForm.subjectParentId = "";
        this.courseForm.teacherId = "";
        this.courseForm.description = "";
        this.courseForm.lessonNum = "";
        this.courseForm.price = "";
        // this.courseForm.cover = '/static/IMG_0671.JPG'
        this.courseForm.cover = "/static/timg.jpg";
        //解决在修改后，再次添加时，上次课程id没有清空，导致执行的是修改的方法而不是添加的方法，故将课程id清空
        this.courseForm.id = "";
      }
    },
    //*****************************************初始化操作********************************************* */
    //初始化所有讲师
    initTeacherList() {
      course.getAllTeacher().then((response) => {
        this.teacherList = response.data.list;
      });
    },
    //初始化一级分类课程
    initOneSubjectList() {
      subject.getAllSubject().then((response) => {
        //将查到的一级分类课程复制给 oneSubjectList 数组，循环遍历进行显示
        this.oneSubjectList = response.data.list;
      });
    },

    //点击一级分类中的具体分类，显示对应的二级分类
    getTwoSubjectList(value) {
      //判断选择的一级课程id跟集合中的是否相同，相同显示对应的二级分类
      for (var i = 0; i < this.oneSubjectList.length; i++) {
        if (value === this.oneSubjectList[i].id) {
          //返回一级分类中的children属性
          this.twoSubjectList = this.oneSubjectList[i].children;
          //这里会有一个问题：在选择了二级分类后，再去选一级分类时，二级分类中的数据没有清空，需要清空数据
          this.courseForm.subjectId = "";
        }
      }
    },

    //修改/保存的方法
    saveOrUpdate() {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          this.saveBtnDisabled = true; // 防止表单重复提交
          //判断courseForm是否有值
          if (!this.courseForm.id) {
            // alert("这是添加的方法")
            this.save();
          } else {
            // alert("这是修改的方法")
            this.update();
          }
        }
      });
    },

    //************************************添加操作******************************************************/
    save() {
      course.addCourse(this.courseForm).then((response) => {
        //返回信息
        this.$message({
          type: "success",
          message: "课程信息添加成功！",
        });
        this.$router.push({
          path: "/edu/course/chapter/" + response.data.courseId,
        });
      });
    },

    //************************************修改操作******************************************************/
    //修改前根据传过来的课程id值，查询课程信息
    getCourse() {
      course.getCourseById(this.id).then((response) => {
        this.courseForm = response.data.courseInfoForm;
        //调用课程的api,查询出一级和二级分类
        subject.getAllSubject().then((response) => {
          this.oneSubjectList = response.data.list;
          //遍历一级分类
          for (var i = 0; i < this.oneSubjectList.length; i++) {
            var oneSubject = this.oneSubjectList[i];
            //判断一级分类id是否等于二级分类的parentId,相同就填充二级分类的集合
            if (this.courseForm.subjectParentId == oneSubject.id) {
              this.twoSubjectList = oneSubject.children;
            }
          }
        });
        //初始化讲师列表
        this.initTeacherList();
      });
    },

    update() {
      course.updateCourse(this.courseForm).then((response) => {
        //返回信息
        this.$message({
          type: "success",
          message: "课程信息修改成功！",
        });
        this.$router.push({ path: "/edu/course/chapter/" + this.id });
        // this.courseForm.id = ''
      });
    },
    //**********************************************封面上传******************************************************/
    //上传课程封面
    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseForm.cover = res.data.fileUrl;
    },
    //上传课程封面的图片要求
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<!-- **********************************样式*************************************************************-->
<!-- 调整上传图片按钮的高度 -->
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>