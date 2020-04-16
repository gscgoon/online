package com.atguigu.servicestatistics.client;

import com.atguigu.commonutils.R;
import io.swagger.annotations.ApiParam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author Super
 * @date 2020-04-13 8:38
 */
@Component
@FeignClient("service-ucenter")
public interface UcentClient {

    /**
     * 统计注册人数
     * @param day
     * @return
     */
    @GetMapping("/admin/serviceucenter/ucenter-member/countRegist/{day}")
    public R countRegist(@PathVariable("day") String day);
}
