package com.atguigu.serviceedu.mapper;

import com.atguigu.serviceedu.entity.EduCourse;
import com.atguigu.serviceedu.entity.vo.CoursePublishVo;
import com.atguigu.serviceedu.entity.webVo.CourseDetailWebVo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 * 课程 Mapper 接口
 * </p>
 *
 * @author super
 * @since 2020-04-02
 */
public interface EduCourseMapper extends BaseMapper<EduCourse> {

    /**
     * 获取发布课程的基础信息
     * @param id
     * @return
     */
    CoursePublishVo getCoursePublishById(String id);

    /**
     * 根据课程id，查询web课程信息
     * @param courseId
     * @return
     */
    CourseDetailWebVo getCourseDetailByCourseId(String courseId);
}
