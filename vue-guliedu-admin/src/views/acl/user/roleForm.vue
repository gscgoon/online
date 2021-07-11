<template>
  <div class="app-container">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <div style="margin: 15px 0"></div>
    <el-checkbox-group
      v-model="checkedRoles"
      @change="handleCheckedRolesChange"
    >
      <el-checkbox v-for="item in items" :label="item.id" :key="item.id">{{
        item.roleName
      }}</el-checkbox>
    </el-checkbox-group>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="update"
      >保存</el-button
    >
  </div>
</template>
<script>
import userApi from "@/api/acl/user";
import roleApi from "@/api/acl/role";
export default {
  data() {
    return {
      checkAll: false,
      checkedRoles: [], //已选中
      items: this.initRoles(), //所有的
      // items: [], //所有的
      isIndeterminate: false,
      userId: "",
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    this.initRoles();
    this.init();
  },
  methods: {
    //获取到所有的角色对象
    initRoles() {
      roleApi.getAllRole().then((response) => {
        this.items = response.data.roleList;
      });
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.userId = this.$route.params.id;
        this.getById(this.userId);
      }
    },
    getById(userId) {
      userApi.getAssign(userId).then((response) => {
        //该用户是否分配了角色
        var jsonObj = response.data.assignRoles;
        if (jsonObj.length === 0) {
          this.isIndeterminate = false;
        } else {
          this.checkedRoles = this.getJsonToList(jsonObj, "id");
          //根据返回的值，调用handleCheckedRolesChange方法将全选复选框状态进行显示
          this.handleCheckedRolesChange(this.checkedRoles)
        }
      });
    },
    //把json数据转成string再转成对象，根据Key获取value数据
    getJsonToList(json, key) {
      //把JSON字符串转成对象
      var list = JSON.parse(JSON.stringify(json));
      //var list = JSON.parse(json)
      var strText = [];
      //遍历这个集合对象，获取key的值
      for (var i = 0; i < list.length; i++) {
        strText.push(list[i][key]);
      }
      return strText;
    },
    handleCheckAllChange(val) {
      // debugger;
      this.checkedRoles = val ? this.getJsonToList(this.items,"id") : [];
      // this.checkedRoles = val ? this.items : [];
      this.isIndeterminate = false;
    },
    handleCheckedRolesChange(value) {
      // debugger
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.items.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.items.length;
    },
    update() {
      this.saveBtnDisabled = true; // 防止表单重复提交
      var ids = this.checkedRoles.join(",");
      //修改权限
      userApi.saveAssign(this.userId, ids).then((response) => {
        if (response.success) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.$router.push({ path: "/acl/user/list" });
        }
      });
    },
  },
};
</script>
