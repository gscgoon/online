package com.atguigu.servicecomment.client;

import com.atguigu.commonutils.vo.UcenterMemberCommentVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author Super
 * @date 2020-04-21 14:31
 */
@Component
@FeignClient("service-ucenter")
public interface MemberClient
{
    /**
     * 根据id获取用户信息
     * @param id
     * @return
     */
    @GetMapping("/admin/serviceucenter/ucenter-member/getMemberById/{id}")
    public UcenterMemberCommentVo getLoginInfo(@PathVariable("id") String id);
}
