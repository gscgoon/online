package com.atguigu.serviceucenter.service.impl;

import com.atguigu.commonutils.JwtUtils;
import com.atguigu.commonutils.MD5;
import com.atguigu.servicebase.handler.GuliException;
import com.atguigu.serviceucenter.entity.UcenterMember;
import com.atguigu.serviceucenter.entity.vo.LoginVo;
import com.atguigu.serviceucenter.entity.vo.RegisterVo;
import com.atguigu.serviceucenter.mapper.UcenterMemberMapper;
import com.atguigu.serviceucenter.service.UcenterMemberService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * <p>
 * 会员表 服务实现类
 * </p>
 *
 * @author super
 * @since 2020-04-08
 */
@Service
public class UcenterMemberServiceImpl extends ServiceImpl<UcenterMemberMapper, UcenterMember> implements UcenterMemberService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 会员注册
     * @param registerVo
     * @return
     */
    @Override
    public boolean registMember(RegisterVo registerVo) {

        String nickName = registerVo.getNickname();
        String mobile = registerVo.getMobile();
        String password = registerVo.getPassword();
        String code = registerVo.getCode();

        //校验参数是否为空
        if(StringUtils.isEmpty(mobile) ||
                StringUtils.isEmpty(mobile) ||
                StringUtils.isEmpty(password) ||
                StringUtils.isEmpty(code)) {
            throw new GuliException(20001,"会员注册失败，注册信息为空");
        }

        //校验校验验证码
        //从redis获取发送的验证码
        String mobleCode = redisTemplate.opsForValue().get(mobile);
        if(!code.equals(mobleCode)) {
            throw new GuliException(20001,"验证码有误");
        }

        //1.校验手机号是否存在
        QueryWrapper<UcenterMember> ucenterMemberWrapper = new QueryWrapper<>();
        ucenterMemberWrapper.eq("mobile",mobile);
        Integer count = baseMapper.selectCount(ucenterMemberWrapper);
        if(count > 0){
            throw new GuliException(20001,"此手机号已被注册");
        }

        UcenterMember ucenterMember = new UcenterMember();
        ucenterMember.setMobile(mobile);
        ucenterMember.setNickname(nickName);
        //密码MD5加密
        ucenterMember.setPassword(MD5.encrypt(password));
        ucenterMember.setAvatar("http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132");
        Integer memberCount = baseMapper.insert(ucenterMember);
        return memberCount > 0;
    }

    /**
     * 会员登录
     * @param loginVo
     * @return
     */
    @Override
    public String login(LoginVo loginVo) {
        //获取登录信息
        String mobile = loginVo.getMobile();
        String password = loginVo.getPassword();

        //校验会员登录信息
        if(StringUtils.isEmpty(mobile)|| StringUtils.isEmpty(password)){
            throw new GuliException(20001,"登录信息有误");
        }

        //查会员
        QueryWrapper<UcenterMember> ucenterMemberQueryWrapper = new QueryWrapper<>();
        ucenterMemberQueryWrapper.eq("mobile",mobile);
        UcenterMember ucenterMember = baseMapper.selectOne(ucenterMemberQueryWrapper);
        if(ucenterMember == null ){
            throw new GuliException(20001,"error");
        }

        //校验会员的密码
        if(!MD5.encrypt(password).equals(ucenterMember.getPassword())){
            throw new GuliException(20001,"error");
        }

        //校验会员是否禁用
        if(ucenterMember.getIsDisabled()){
            throw new GuliException(20001,"error");
        }

        //生成token
        String token = JwtUtils.getJwtToken(ucenterMember.getId(),ucenterMember.getNickname());
        return token;
    }

    /**
     * 根据token信息获取登录信息
     * @param memberId
     * @return
     */
    @Override
    public UcenterMember getLoginInfo(String memberId) {
        UcenterMember ucenterMember = baseMapper.selectById(memberId);
        LoginVo loginVo = new LoginVo();
        BeanUtils.copyProperties(ucenterMember,loginVo);
        return ucenterMember;
    }

    /**
     * 根据微信id查member
     * @param openid
     * @return
     */
    @Override
    public UcenterMember getByOpenid(String openid) {

        QueryWrapper<UcenterMember> memberQueryWrapper = new QueryWrapper<>();
        memberQueryWrapper.eq("openid",openid);
        UcenterMember ucenterMember = baseMapper.selectOne(memberQueryWrapper);
        return ucenterMember;
    }

    /**
     * 某天的注册人数
     * @param day
     * @return
     */
    @Override
    public Integer countRegist(String day) {
        return baseMapper.countRegist(day);
    }
}
