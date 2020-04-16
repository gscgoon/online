import request from '@/utils/request'

export default {
    
    //1、创建订单
    createOrder(courseId) {
        return request({
            url: `/web/serviceorder/t-order/addOrderByCourseId/${courseId}`,
            method: 'get'
        })
    },
    //2、根据id获取订单
    getById(orderNo) {
        return request({
            url: `/web/serviceorder/t-order/getOrder/${orderNo}`,
            method: 'get'
        })
    },
    //3、生成微信支付二维码
    createNative(orderNo) {
        return request({
            url: `/web/serviceorder/t-pay-log/getTwoBarCodes/${orderNo}`,
            method: 'get'
        })
    },
    //4、根据id获取订单支付状态
    queryPayStatus(orderNo) {
        return request({
            url: `/web/serviceorder/t-pay-log/checkOrderStatus/${orderNo}`,
            method: 'get'
        })
    }
}