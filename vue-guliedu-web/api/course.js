import request from '@/utils/request'

const api_name = '/web/serviceedu/course'
export default {
   /**
    * 获取课程列表
    * @param {*} page
    * @param {*} limit
    * @param {*} searchObj
    */
    getWebCourseList(page,limit,searchObj){
        return request({
            url:`${api_name}/getWebCourseList/${page}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },

    /**
     * 获取课程详情
     * @param {*} courseId
     */
    getWebCourseDetail(courseId){
        return request({
            url: `${api_name}/getCourseDetail/${courseId}`,
            method: 'get'
        })
    },

    /**
     * 视频播放
     * @param {*} id
     */
    getVideoPlayAuth(id) {
        return request({
            url: `/admin/servicevod/video/getPlayAuth/${id}`,
            method: 'get'
        })
    },

    /**
     * 获取所有的一级分类
     */
    getAllSubject(){
        return request({
            url: `/admin/serviceedu/subject/getAll`,
            method: 'get'
        })
    },

    /**
     * 根据课程id，查评论
     * @param {*} page 
     * @param {*} limit 
     * @param {*} searchObj 
     */
    getComments(page,limit,courseId){
        return request({
            url: `/web/servicecomment/edu-comment/getAllComments/${page}/${limit}/${courseId}`,
            method: 'get'
        })
    },

    saveComment(comment){
        return request({
            url: `/web/servicecomment/edu-comment/addComment`,
            method: 'post',
            data: comment
        })
        
    }
}
