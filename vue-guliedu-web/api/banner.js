import request from '@/utils/request'

export default {

    /**
     * 得到所有的banner
     */
    getBannerList(){
        return request({
            url: `/admin/serviceCms/crmBanner/getAllBanner`,
            method: 'get'
        })
    }
}