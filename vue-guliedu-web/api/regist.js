import request from '@/utils/request'

export default {

    /**
     * 注册会员
     * @param {*} registerVo 
     */
    registMember(registerVo){
        return request({
            url: `/admin/serviceUserCenter/user-center-member/regist`,
            method: 'post',
            data: registerVo
        })
    },

    /**
     * 发送验证码
     * @param {*} mobile 
     */
    sendCodeToMobile(mobile){
        return request({
            url: `/admin/serviceMsm/msm/getPhone/${mobile}`,
            method: 'get'
        })
    }
}