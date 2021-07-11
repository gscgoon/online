<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="选择要统计的日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        @click="createStatistics()"
        round
        >生成</el-button
      >
    </el-form>
  </div>
</template>

<script>
import day from "@/api/statistics/day";
export default {
  data() {
    return {
      day: this.getDateStr(),
      btnDisabled: false,
    };
  },
  methods: {
    createStatistics() {
      this.saveBtnDisabled = true; // 防止表单重复提交
      day.createStatistics(this.day).then((response) => {
        this.btnDisabled = false;
        this.$message({
          type: "success",
          message: "统计生成成功！",
        });
        this.$router.push({ path: "/statistics/chart" });
      });
    },
    getDateStr() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
    //   console.log(time);
      return time;
    },
  },
};
</script>