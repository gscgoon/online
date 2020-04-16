import request from '@/utils/request'

export default {

    removeAliVideo(videoId){
        return request({
            url: `/admin/servicevod/video/deleteAliyunVideo/${videoId}`,
            method: 'delete'
        })
    }
}