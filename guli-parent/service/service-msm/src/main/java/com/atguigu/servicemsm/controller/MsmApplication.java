package com.atguigu.servicemsm.controller;

import com.atguigu.servicemsm.controller.service.MsmService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author Super
 * @date 2020-04-08 22:59
 */
@SpringBootApplication
@ComponentScan({"com.atguigu"})
public class MsmApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsmApplication.class,args);
    }
}
