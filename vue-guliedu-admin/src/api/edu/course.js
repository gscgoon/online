import request from '@/utils/request'

export default {

    /**
     * 课程列表
     * @param {*} page 
     * @param {*} limit 
     * @param {*} searchObj 
     */
    getPageListCourse(page, limit, searchObj) {
      return request({
        url: `/admin/serviceEdu/course/query/${page}/${limit}`,
        method: 'post',
        data: searchObj
      })
    },

    /**
     * 课程信息添加
     * @param {*} courseForm 
     */
    addCourse(courseForm){
        return request ({
            url: `/admin/serviceEdu/course/add`,
            method: 'post',
            data: courseForm
        })
    },

    /**
     * 获取下拉讲师所需的讲师数据
     */
    getAllTeacher(){
        return request({
            url: `/admin/serviceEdu/teacher/getAll`,
            method: 'get'
        })
    },

    /**
     * 根据课程id进行回显数据
     * @param {*} id 
     */
    getCourseById(id){
        return request ({
            url: `/admin/serviceEdu/course/getCourseById/${id}`,
            method: 'get'
        })
    },

    /**
     * 修改课程信息
     * @param {*} courseForm 
     */
    updateCourse(courseForm){
        return request ({
            url: `/admin/serviceEdu/course/updateCourse`,
            method: 'post',
            data: courseForm
        })
    },

    /**
     * 步骤条第三步课程发布中显示课程
     * @param {*} id 
     */
    getCoursePublishInfoById(id) {
        return request({
          url: `/admin/serviceEdu/course/getCoursePublish/${id}`,
          method: 'get'
        })
      },

      /**
       * 发布课程
       * @param {*} id 
       */
      publishCourse(id) {
        return request({
          url: `/admin/serviceEdu/course/publish/${id}`,
          method: 'get'
        })
      },

      /**
       * 删除课程
       * @param {*} id 
       */
      removeCourse(id) {
        return request({
          url: `/admin/serviceEdu/course/delete/${id}`,
          method: 'delete'
        })
      },
      


}