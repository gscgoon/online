<template>
  
  <div class="app-container">
    <el-form :inline="true" class="demo-form-line">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="请选择头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()" round>查询</el-button>
      <el-button type="default" @click="resetData()" round>清空</el-button>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1)*limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="讲师姓名"
        align="center"/>
      <el-table-column
        prop="intro"
        label="讲师资历"
        align="center"/>
      <el-table-column
        prop="career"
        label="讲师简介"
        align="center"/>
      <el-table-column
        prop="level"
        label="讲师头衔"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.level == 1 ?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排名"
        align="center"/>
      <el-table-column
        prop="gmtCreate"
        label="注册时间"
        width="160"
        align="center"/>
      <el-table-column
        label="操作"
        width="280"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" round>修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteById(scope.row.id,scope.row.name)"  round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 32px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"/>
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null,
      total: 0,
      page: 1,
      limit: 10,
      searchObj: {} // 查询条件
    }
  },
  created() { // 当前页面加载获取的数据
    this.fetchData()
  },
  methods: {
    /**
     * 讲师列表
     */
      fetchData(page = this.page){
          this.page = page
          this.listLoading = true
          console.log(this.searchObj.level )
          teacher.getPageList(this.page,this.limit,this.searchObj).then( response =>{
              if(response.success == true){
                  this.total = response.data.total
                  this.list = response.data.records
              }
              this.listLoading = false
          })
      },

      /**
       * 清空搜索内容
       */
      resetData(){
          this.searchObj = {}
          this.fetchData()
      },

      /**
       * 删除讲师
       */
      deleteById(id,name){
        this.$confirm('您确定删除讲师【'+name+'】吗？','提示',{
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          //向后台发送ajax请求
          teacher.deleteTeacherById(id)
        }).then(response => {
          //给出结果提示
          this.$message({
            type: 'success',
            message: "删除成功！"
          })
          // 重新加载数据
          this.fetchData()
        }).catch((response) =>{
          if (response === 'cancel') {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              })
          } else {
              this.$message({
                  type: 'error',
                  message: '删除失败'
              })
          }
        })
      }
  }
}
</script>
