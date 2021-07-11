<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="学员登录统计" value="login_num" />
          <el-option label="学员注册统计" value="register_num" />
          <el-option label="课程播放统计" value="video_view_num" />
          <el-option label="每日课程统计" value="course_num" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        :disagled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()"
        round
        >查询</el-button
      >
    </el-form>
    <div class="chart-container">
      <div id="chart" class="chart" style="height: 500px; width: 100%" />
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import day from "@/api/statistics/day";
export default {
  data() {
    return {
      searchObj: {
        //给默认值防止报接口错误,Request failed with status code 404
        type: "login_num",
        begin: this.getDateStr(), //new Date()
        end: this.getDateStr(), //new Date()
      },
      btnDisabled: false,
      chart: null,
      xData: [],
      yData: [],
    };
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("chart"));
      // console.log(this.chart)
      // 指定图表的配置项和数据
      var option = {
        //显示标题
        title: {
          text: this.title,
        },
        //x坐标轴触发提示
        tooltip: {
          trigger: "axis",
        },
        //区域缩放
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: "category",
          data: this.xData, //数据绑定
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: "value",
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            // 系列中的数据内容数组
            data: this.yData, //数据绑定
            // 折线图
            type: "line",
          },
        ],
      };
      this.chart.setOption(option);
    },
    showChart() {
      // this.initChart()
      //获取后台返回的map数据
      // console.log(this.searchObj);
      day.showChart(this.searchObj).then((response) => {
        // console.log(response.data.yNumList);
        // console.log(response.data.xDateList);
        //纵轴数据（个数）
        this.yData = response.data.yNumList;
        //横轴数据（天）
        this.xData = response.data.xDateList;
        //统计类别
        switch (this.searchObj.type) {
          case "login_num":
            this.title = "学员登录统计";
            break;
          case "register_num":
            this.title = "学员注册统计";
            break;
          case "video_view_num":
            this.title = "课程播放统计";
            break;
          case "course_num":
            this.title = "每日课程统计";
            break;
          default:
            this.title = "";
            break;
        }
        this.initChart();
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
      // console.log(time);
      return time;
    },
  },
};
</script>