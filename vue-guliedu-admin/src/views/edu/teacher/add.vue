<template>
  <div class="app-container">
    <el-form
      ref="teacher"
      :model="teacher"
      :rules="validateRules"
      label-width="120px"
    >
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <!--实现上下加减-->
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>
      <!-- 讲师头衔需要下拉选择 -->
      <el-form-item label="讲师头衔" prop="level">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!--文件上传 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          round
          >更换头像</el-button
        >
        <!-- 上传组件 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/admin/serviceoss/oss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <!-- 文本格式 -->
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          round
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from "@/api/edu/teacher";
//引入组件
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";
export default {
  //声明上传组件
  components: {
    PanThumb,
    ImageCropper,
  },
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: "",
        career: "",
        intro: "",
        avatar: "",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API,
      imagecropperShow: false,
      imagecropperKey: 0,
      validateRules: {
        name: [
          { required: true, trigger: "change", message: "讲师名称必须输入" },
        ],
        level: [
          { required: true, trigger: "change", message: "讲师头衔需要下拉选择" },
        ],
      },
    };
  },

  // vue-router导航切换 时，如果两个路由都渲染同个组件，组件会重（chong）用,
  // 组件的生命周期钩子（created）不会再被调用, 使得组件的一些数据无法根据 path的改变得到更新
  // 因此：
  // 1、我们可以在watch中监听路由的变化，当路由变化时，重新调用created中的内容
  // 2、在init方法中我们判断路由的变化，如果是修改路由，则从api获取表单数据，
  //       如果是新增路由，则重新初始化表单数据
  watch: {
    $route(to, from) {
      console.log("路由切换");
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.fetchDataById(id);
      } else {
        this.teacher = {};
      }
    },
    //修改时回显数据
    fetchDataById(id) {
      teacher.getById(id).then((response) => {
        this.teacher = response.data.eduTeacher;
      });
    },
    saveOrUpdate() {
      this.$refs.teacher.validate((valid) => {
        if (valid) {
          this.saveBtnDisabled = true; // 防止表单重复提交
          //根据id判断是新增or修改
          if (this.teacher.id) {
            this.updateData();
          } else {
            //新增
            this.saveData();
          }
        }
      });
    },
    // 新增
    saveData() {
      teacher
        .save(this.teacher)
        .then((response) => {
          return this.$message({
            type: "success",
            message: "新增成功!",
          });
        })
        .then((resposne) => {
          this.$router.push({ path: "/edu/teacher/list" });
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: "新增失败！",
          });
        });
    },
    //修改
    updateData() {
      teacher
        .updateById(this.teacher)
        .then((response) => {
          return this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .then((resposne) => {
          this.$router.push({ path: "/edu/teacher/list" });
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: "修改失败！",
          });
        });
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data);
      this.imagecropperShow = false;
      this.teacher.avatar = data.fileUrl;
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    // 关闭上传组件
    close() {
      this.imagecropperShow = false;
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
  },
};
</script>