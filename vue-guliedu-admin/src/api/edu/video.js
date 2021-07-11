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
   * 添加小节
   * @param {*} video 
   */
  addVideo(video) {
    return request({
      url: `/admin/serviceEdu/video/add`,
      method: 'post',
      data: video
    })
  },

  /**
   * 根据id删除小节
   * @param {*} id 
   */
  deleteVideo(id) {
    return request({
      url: `/admin/serviceEdu/video/delete/${id}`,
      method: 'delete'
    })
  },

  /**
   * 根据id查小节信息
   * @param {*} id 
   */
  getVideo(id) {
    return request({
      url: `/admin/serviceEdu/video/getVideoById/${id}`,
      method: 'get'
    })
  },

  /**
   * 修改小节
   * @param {*} video 
   */
  updateVideo(video) {
    return request({
      url: `/admin/serviceEdu/video/update`,
      method: 'post',
      data: video
    })
  },

  



}