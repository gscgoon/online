import request from '@/utils/request'

export default {
  /**
   * 多条件分页查询讲师
   * @param {*} page
   * @param {*} limit
   * @param {*} searchObj
   */
    getPageList(page, limit, searchObj) {
    return request({
        // 带参数的话应该使用飘`` 这种符号 而不是单引号''
        // url: '/ucenter/member/getAllMember/multiple/${page}/${limit}',
        url: `/admin/serviceEdu/teacher/getList/${page}/${limit}`,
        method: 'post',
        data: searchObj
      })
    },

    /**
     * 保存讲师需要一个对象，往后台传，就需要封装到data中
     * @param {*} teacher
     */
  save(teacher){
      return request({
        url: `/admin/serviceEdu/teacher/add`,
        method: 'post',
        data: teacher
      })
    },

    /**
     * 根据id删除讲师
     * @param {*} id 
     */
    deleteTeacherById(id){
      return request({
        // url: '/admin/serviceedu/teacher/delete/'+id,
        url: `/admin/serviceEdu/teacher/delete/${id}`,
        method: 'delete'
      })
    },

    /**
     * 修改讲师
     * @param {*} teacher 
     */
    updateById(teacher){
      return request({
        url: `/admin/serviceEdu/teacher/update`,
        method: 'post',
        data: teacher
      })
    },

     /**
     * 更新前查询讲师
     * @param {*} id 
     */
    getById(id){
      return request({
        url: `/admin/serviceEdu/teacher/query/${id}`,
        method: 'get'
      })
    },

  /**
     * 课程列表中讲师下拉框的讲师数据
     */
  getAllTeacher(){
    return request({
url: `/admin/serviceEdu/teacher/getAll`,
        method: 'get'
      })
    }
}