import request from '@/utils/request'

export default {

    /**
     * 会员登陆
     * @param {*} loginVo 
     */
    toLogin(loginVo){
        return request({
            url: `/admin/serviceUserCenter/user-center-member/login`,
            method: 'post',
            data: loginVo
        })
    },

    /**
     * 通过token获取登录信息
     */
    getLoginInfoByToken(){
        return request({
            url: `/web/serviceUserCenter/member/auth/getLoginInfo`,
            method: 'get'
        })
    }
}