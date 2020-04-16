package com.atguigu.serviceorder.client;

import com.atguigu.commonutils.orderVo.UcenterMemberOrderVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author Super
 * @date 2020-04-12 8:50
 */
@FeignClient("service-ucenter")
@Component
public interface UcenterMemberClient {

    /**
     * 远程调用ucenter,查订单用户信息
     * @param id
     * @return
     */
    @GetMapping("/web/serviceucenter/member/getMemberOrder/{id}")
    public UcenterMemberOrderVo getMemberInfoOrder( @PathVariable("id") String id);
}
