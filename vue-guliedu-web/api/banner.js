import request from '@/utils/request'

export default {

    /**
     * 得到所有的banner
     */
    getBannerList(){
        return request({
            url: `/admin/servicecms/crm-banner/getAllBanner`,
            method: 'get'
        })
    }
}