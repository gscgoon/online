import request from '@/utils/request'

export default {

    removeAliVideo(videoId){
        return request({
            url: `/admin/serviceEdu/video/deleteAliyunVideo/${videoId}`,
            method: 'delete'
        })
    }
}