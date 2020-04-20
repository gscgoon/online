package com.atguigu.servicecomment.service;

import com.atguigu.servicecomment.entity.EduComment;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Map;

/**
 * <p>
 * 评论 服务类
 * </p>
 *
 * @author super
 * @since 2020-04-20
 */
public interface EduCommentService extends IService<EduComment> {

    /**
     * 根据课程id查该课程的评论
     * @param pageComment
     * @param courseId
     */
    Map getComments(Page<EduComment> pageComment, String courseId);

    /**
     * 添加评论
     * @param eduComment
     */
    boolean addComment(EduComment eduComment);
}
