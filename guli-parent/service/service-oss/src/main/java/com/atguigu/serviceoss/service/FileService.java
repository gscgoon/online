package com.atguigu.serviceoss.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Super
 * @date 2020-03-31 17:16
 */
public interface FileService {

    /**
     * 上传文件
     */
    String upload(MultipartFile file);
}
