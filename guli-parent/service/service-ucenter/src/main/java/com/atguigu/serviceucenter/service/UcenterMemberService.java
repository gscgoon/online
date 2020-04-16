package com.atguigu.serviceucenter.service;

import com.atguigu.serviceucenter.entity.UcenterMember;
import com.atguigu.serviceucenter.entity.vo.LoginVo;
import com.atguigu.serviceucenter.entity.vo.RegisterVo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 会员表 服务类
 * </p>
 *
 * @author super
 * @since 2020-04-08
 */
public interface UcenterMemberService extends IService<UcenterMember> {

    /**
     * 会员注册
     * @param registerVo
     * @return
     */
    boolean registMember(RegisterVo registerVo);

    /**
     * 会员登录
     * @param loginVo
     * @return
     */
    String login(LoginVo loginVo);

    /**
     * 根据token信息获取登录信息
     * @param memberId
     * @return
     */
    UcenterMember getLoginInfo(String memberId);

    /**
     * 根据微信id查member
     * @param openid
     * @return
     */
    UcenterMember getByOpenid(String openid);

    /**
     * 某天的注册人数
     * @param day
     * @return
     */
    Integer countRegist(String day);
}
