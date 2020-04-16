package com.atguigu.serviceorder.client;

import com.atguigu.commonutils.orderVo.CourseDetailWebVoOrder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author Super
 * @date 2020-04-12 9:00
 */
@Component
@FeignClient("service-edu")
public interface EduCourseClient {

    /**
     * 根据id查订单课程详情
     * @param id
     * @return
     */
    @GetMapping("/web/serviceedu/course/getCourseInfoOrder/{id}")
    public CourseDetailWebVoOrder getCourseInfoOrder( @PathVariable("id") String id);
}
