import request from '@/utils/request'

export default {
 
  /**
   * 获取分类课程
   */
  getAllSubject(){
    return request({
      url: `/admin/serviceEdu/subject/getAll`,
      method: 'get'
    })
  }
}