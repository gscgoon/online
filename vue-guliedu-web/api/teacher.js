import request from '@/utils/request'

const api_name = '/web/serviceedu/teacher'
export default {
    /**
     * 讲师列表
     * @param {*} page 
     * @param {*} limit 
     */
    getWebTeacherList(page,limit){
        return request({
            //Referrer Policy: no-referrer-when-downgrade，请大家检查自己的请求URL是否正确,我这里多了一个"/"
            // url: `/${api_name}/getTeacherList/${page}/${limit}`,
            url: `${api_name}/getTeacherList/${page}/${limit}`,
            method: 'get'
        })
    },
    /**
     * 讲师详情
     * @param {*} teacherId 
     */
    getWebTeacherDetailList(teacherId){
        return request({
            url:`${api_name}/detail/${teacherId}`,
            method: 'get'
        })
    }
}