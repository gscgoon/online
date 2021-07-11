import request from '@/utils/request'

export default {
    
    //1、创建订单
    createOrder(courseId) {
        return request({
            url: `/web/serviceOrder/tOrder/addOrderByCourseId/${courseId}`,
            method: 'get'
        })
    },
    //2、根据id获取订单
    getById(orderNo) {
        return request({
            url: `/web/serviceOrder/tOrder/getOrder/${orderNo}`,
            method: 'get'
        })
    },
    //3、生成微信支付二维码
    createNative(orderNo) {
        return request({
            url: `/web/serviceOrder/tPayLog/getTwoBarCodes/${orderNo}`,
            method: 'get'
        })
    },
    //4、根据id获取订单支付状态
    queryPayStatus(orderNo) {
        return request({
            url: `/web/serviceOrder/tPayLog/checkOrderStatus/${orderNo}`,
            method: 'get'
        })
    }
}