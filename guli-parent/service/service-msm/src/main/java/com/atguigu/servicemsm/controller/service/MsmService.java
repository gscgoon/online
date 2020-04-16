package com.atguigu.servicemsm.controller.service;

import java.util.HashMap;

/**
 * @author Super
 * @date 2020-04-08 22:53
 */
public interface MsmService {
    /**
     * 发送验证码
     * @param phoneNumber
     * @param param
     * @return
     */
    boolean sendNumber(String phoneNumber, HashMap<String, Object> param);
}
