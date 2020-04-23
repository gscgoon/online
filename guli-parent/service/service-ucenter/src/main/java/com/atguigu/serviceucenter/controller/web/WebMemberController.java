package com.atguigu.serviceucenter.controller.web;

import com.atguigu.commonutils.JwtUtils;
import com.atguigu.commonutils.R;
import com.atguigu.commonutils.vo.UcenterMemberOrderVo;
import com.atguigu.servicebase.handler.GuliException;
import com.atguigu.serviceucenter.entity.UcenterMember;
import com.atguigu.serviceucenter.service.UcenterMemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Super
 * @date 2020-04-09 1:09
 */
@Api(description = "获取登录信息")
@RestController
@RequestMapping("/web/serviceucenter/member")
//@CrossOrigin 因为使用了spring cloud 的gateway网关配置，所以不需要再次配置跨域注解
public class WebMemberController {

    @Autowired
    private UcenterMemberService ucenterMemberService;

    @ApiOperation(value = "根据token获取登录信息")
    @GetMapping("/auth/getLoginInfo")
    public R getLoginInfo(HttpServletRequest request){
        try {
            String memberId = JwtUtils.getMemberIdByJwtToken(request);
            UcenterMember ucenterMember = ucenterMemberService.getLoginInfo(memberId);
            return R.ok().data("item", ucenterMember);
        }catch (Exception e){
            e.printStackTrace();
            throw new GuliException(20001,"获取登录信息失败！");
        }
    }

    @ApiOperation("根据id查订单用户详情")
    @GetMapping("/getMemberOrder/{id}")
    public UcenterMemberOrderVo getMemberInfoOrder(@ApiParam(name = "id",value = "用户id",required = true)
                                                   @PathVariable String id
                                                   ){
        UcenterMemberOrderVo ucenterMemberOrderVo = new UcenterMemberOrderVo();
        UcenterMember ucenterMember = ucenterMemberService.getById(id);
        BeanUtils.copyProperties(ucenterMember,ucenterMemberOrderVo);
        return ucenterMemberOrderVo;

    }
}
