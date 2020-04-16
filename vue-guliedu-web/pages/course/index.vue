<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <li v-for="(oneSubject,index) in oneSubjectList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="oneSubject.title" href="#" @click="searchSbujectByOneId(oneSubject.id,index)" >{{oneSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(twoSubject,index) in twoSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="twoSubject.title" href="#" @click="searchSubjectByTwoId(twoSubject.id,index)">{{twoSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="关注度" href="#" @click="searchByCountSort()">关注度&nbsp;
                   <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="#" @click="searchBygmtCreateSort()">最新&nbsp;
                   <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="#" @click="searchBypriceSort()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in data.records" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price)==0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.buyCount}}人学习</i>
                      |
                      <i class="c-999 f-fA">{{course.viewCount}}人浏览</i>
                    </span>
                  </section>
                </div>
              </li>
              
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from '@/api/course'
export default {
  data () {
    return {
      page:1,
      data:{},
      oneSubjectList: [], // 一级分类列表
      twoSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  created () {
    //初始化一级分类
    this.initOneSubjectList()
    //初始化课程数据
    this.initCourseData()
    
  },
  
  methods: {

    //1.根据一级分类查课程
    searchSbujectByOneId(subjectParentId,index){
      //添加选中的背景
      this.oneIndex = index
      //清空上次查询的二级分类，只通过一级分类查课程
      this.twoIndex = -1
      this.searchObj.subjectId = ""
      this.subSubjectList = []
      //清空关注度，价格，最新
      this.buyCountSort = ''
      this.gmtCreateSort = ''
      this.priceSort = ''
      this.searchObj.subjectParentId = subjectParentId
      this.gotoPage(1)
      //6.单机一级分类时，显示二级分类
      // console.log(this.oneSubjectList)
      for(var i = 0;i<this.oneSubjectList.length;i++){
        var oneSubject = this.oneSubjectList[i]
        // console.log(subjectParentId,oneSubject.id)
        if(subjectParentId == oneSubject.id){
          //赋值二级分类
          this.twoSubjectList = oneSubject.children//这里的oneSubject不能写成this.oneSubject
        }
      }
    },
    //2.根据二级分类查课程
    searchSubjectByTwoId(subjectId,index){
      this.twoIndex = index
      this.searchObj.subjectId = subjectId
      this.gotoPage(1)
    },
    //3.根据关注度查课程
    searchByCountSort(){
      //关注度查询时，需要将价格，最新清空
      this.buyCountSort = '1'
      this.gmtCreateSort = ''
      this.priceSort = ''
      this.searchObj.priceSort = this.priceSort
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      //调用分页查询,从第一页查
      this.gotoPage(1)
    },
    //4.根据最新查课程
    searchBygmtCreateSort(){
      //最新查询时，需要将关注度，价格清空
      this.buyCountSort = ''
      this.gmtCreateSort = '1'
      this.priceSort = ''
      this.searchObj.priceSort = this.priceSort
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      console.log(this.searchObj.gmtCreateSort)
      //调用分页查询,从第一页查
      this.gotoPage(1)
    },
    //5.根据价格查课程
    searchBypriceSort(){
      //价格查询时，需要将关注度，最新清空
      this.buyCountSort = ''
      this.gmtCreateSort = ''
      this.priceSort = '1'
      this.searchObj.priceSort = this.priceSort
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      //调用分页查询,从第一页查
      this.gotoPage(1)
    },

    initCourseData(){
      course.getWebCourseList(1,8,this.searchObj).then(response => {
         this.data = response.data.data
      })
    },

    initOneSubjectList(){
      course.getAllSubject().then(response => {
        this.oneSubjectList = response.data.data.list
      })
    },
    //分页显示
    gotoPage(page){
      course.getWebCourseList(page,8,this.searchObj)
        .then(response =>{
        this.data = response.data.data
      })
    }
  }
}
</script>

<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>
