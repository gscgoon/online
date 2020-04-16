package com.atguigu.serviceorder.service.impl;

import com.atguigu.commonutils.orderVo.CourseDetailWebVoOrder;
import com.atguigu.commonutils.orderVo.UcenterMemberOrderVo;
import com.atguigu.serviceorder.service.TOrderService;
import com.atguigu.serviceorder.client.EduCourseClient;
import com.atguigu.serviceorder.client.UcenterMemberClient;
import com.atguigu.serviceorder.entity.TOrder;
import com.atguigu.serviceorder.mapper.TOrderMapper;
import com.atguigu.serviceorder.utils.OrderNoUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 订单 服务实现类
 * </p>
 *
 * @author super
 * @since 2020-04-11
 */
@Service
public class TOrderServiceImpl extends ServiceImpl<TOrderMapper, TOrder> implements TOrderService {

    @Autowired
    private UcenterMemberClient ucenterMemberClient;

    @Autowired
    private EduCourseClient eduCourseClient;



    /**
     * 根据课程id，生成订单号，并返回订单号
     * @param courseId
     * @param memberId
     * @return
     */
    @Override
    public String addOrderByCourseId(String courseId, String memberId) {

        //1.远程调用edu,查询课程的信息
        CourseDetailWebVoOrder courseDetailWebVoOrder = eduCourseClient.getCourseInfoOrder(courseId);
        //2.远程调用ucenterMember，查用户信息
        UcenterMemberOrderVo ucenterMemberOrder = ucenterMemberClient.getMemberInfoOrder(memberId);

        //3.生成订单
        TOrder order = new TOrder();
        order.setOrderNo(OrderNoUtil.getOrderNo());
        order.setCourseId(courseId);
        order.setCourseTitle(courseDetailWebVoOrder.getTitle());
        order.setCourseCover(courseDetailWebVoOrder.getCover());
        order.setTeacherName(courseDetailWebVoOrder.getTeacherName());
        order.setTotalFee(courseDetailWebVoOrder.getPrice());
        order.setMemberId(memberId);
        order.setMobile(ucenterMemberOrder.getMobile());
        order.setNickname(ucenterMemberOrder.getNickname());
        order.setStatus(0);
        order.setPayType(1);
        baseMapper.insert(order);

        return order.getOrderNo();
    }
}
