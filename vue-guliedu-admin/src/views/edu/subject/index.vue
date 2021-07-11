<template>
    <div class="app-container">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            style="margin-button:30px;">
        </el-input>
        <el-tree
            ref="tree"
            :data="subjectData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
            >
        </el-tree>
    </div>
</template>


<script>
import subject from '@/api/edu/subject'
  export default {
    data() {
      return {
        filterText: '',
        subjectData: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created () {
        this.getSubjectTree()
    },
    methods: {
      getSubjectTree(){
          subject.getAllSubject().then(response =>{
            //判断返回的状态是否为true
            if(response.success == true){
              this.subjectData = response.data.list
            }
            
          })
      },
      filterNode(value, data) {
        if (!value) return true;
        // return data.title.toLowerCase().indexOf(value) !== -1;
        // 优化大小写过滤
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
      }
    }
    
  }
</script>