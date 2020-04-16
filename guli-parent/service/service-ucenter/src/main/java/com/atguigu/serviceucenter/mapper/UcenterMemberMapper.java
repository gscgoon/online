package com.atguigu.serviceucenter.mapper;

import com.atguigu.serviceucenter.entity.UcenterMember;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 * 会员表 Mapper 接口
 * </p>
 *
 * @author super
 * @since 2020-04-08
 */
public interface UcenterMemberMapper extends BaseMapper<UcenterMember> {

    /**
     * 某天的注册人数
     * @param day
     * @return
     */
    Integer countRegist(String day);
}
