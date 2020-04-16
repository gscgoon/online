import request from '@/utils/request'

export default {
    /**
     * 从后台得到老师和课程的集合数据
     */
    getTeacherCourseData(){
        return request ({
            url: `/web/serviceedu/index/getTeacherAndCourse`,
            method: 'get'
        })
    }
}