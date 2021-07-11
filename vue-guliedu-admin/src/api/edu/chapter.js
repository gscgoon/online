import request from '@/utils/request'

export default {
  /**
   * 根据课程id获取对应的课程章节和小节
   * @param {*} courseId 
   */
  getChapterVideo(courseId) {
    return request({
      url: `/admin/serviceEdu/chapter/getAll/${courseId}`,
      method: 'get'
    })
  },

  /**
   * 添加章节
   * @param {*} chapter 
   */
  addChapter(chapter) {
    return request({
      url: `/admin/serviceEdu/chapter/add`,
      method: 'post',
      data: chapter
    })
  },

  /**
   * 根据id查章节信息
   * @param {*} id 
   */
  getChapter(id) {
    return request({
      url: `/admin/serviceEdu/chapter/getChapter/${id}`,
      method: 'get'
    })
  },

  /**
   * 修改章节
   * @param {*} chapter 
   */
  updateChapter(chapter) {
    return request({
      url: `/admin/serviceEdu/chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },

  /**
   * 根据id删除章节
   * @param {*} id 
   */
  deleteChapter(id) {
    return request({
      url: `/admin/serviceEdu/chapter/deleteChapter/${id}`,
      method: 'delete'
    })
  },



}