package com.atguigu.servicecomment.controller;


import com.atguigu.commonutils.R;
import com.atguigu.commonutils.orderVo.CourseDetailWebVoOrder;
import com.atguigu.servicecomment.entity.EduComment;
import com.atguigu.servicecomment.service.EduCommentService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 评论 前端控制器
 * </p>
 *
 * @author super
 * @since 2020-04-20
 */
@Api(description = "课程评论功能")
@RestController
@RequestMapping("/web/servicecomment/edu-comment")
//@CrossOrigin
public class EduCommentController
{

    @Autowired
    private EduCommentService eduCommentService;

    @ApiOperation("所有评论")
    @GetMapping("/getAllComments/{page}/{limit}/{courseId}")
    public R getAllComments(@PathVariable Long page,@PathVariable Long limit,@PathVariable String courseId)
    {
        System.out.println("courseId========"+courseId);
        Page<EduComment> pageComment = new Page<>(page,limit);
        Map map = eduCommentService.getComments(pageComment,courseId);
        return R.ok().data(map);
    }

    @ApiOperation("添加评论")
    @PostMapping("/addComment")
    public R addComment(@ApiParam(name = "comment",value = "评论对象",required = true) @RequestBody EduComment eduComment)
    {
        System.out.println("eduComment==="+eduComment);
        boolean flag = eduCommentService.addComment(eduComment);
        if(flag)
        {
            return R.ok();
        }else
        {
            return R.error();
        }

    }
}

