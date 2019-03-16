/*
 * Copyright (c) 2005, 2017, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.core.web.tag;

import java.io.IOException;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.stooges.core.util.PlatBeanUtil;
import com.stooges.core.util.PlatLogUtil;
import com.stooges.core.util.PlatUICompUtil;

/**
 * 描述 自定义复选框标签
 * @author 胡裕
 * @created 2017年2月6日 下午2:41:52
 */
public class CheckBoxTag extends BaseCompTag {
    /**
     * 是否横排(true,false)
     */
    private String is_horizontal;
    /**
     * 最多可选条数
     */
    private String max;
    /**
     * 最少需要选择多少条
     */
    private String min;
    
    /**
     * 方法doStartTag
     * 
     * @return 返回值int
     */
    public int doStartTag() throws JspException {
        return EVAL_PAGE;
    }
    
    /**
     * 方法doEndTag
     * 
     * @return 返回值int
     */
    public int doEndTag() throws JspException {
        JspWriter out = this.pageContext.getOut();
        Map<String,Object> paramMap = PlatBeanUtil.getSonAndSuperClassField(this);
        String htmlStr = PlatUICompUtil.getCheckBoxTagHtml(paramMap);
        try {
            out.print(htmlStr);
        } catch (IOException e) {
            PlatLogUtil.printStackTrace(e);
        }
        return EVAL_PAGE;
    }
    
    /**
     * @return the is_horizontal
     */
    public String getIs_horizontal() {
        return is_horizontal;
    }
    /**
     * @param is_horizontal the is_horizontal to set
     */
    public void setIs_horizontal(String is_horizontal) {
        this.is_horizontal = is_horizontal;
    }
    /**
     * @return the max
     */
    public String getMax() {
        return max;
    }
    /**
     * @param max the max to set
     */
    public void setMax(String max) {
        this.max = max;
    }
    /**
     * @return the min
     */
    public String getMin() {
        return min;
    }
    /**
     * @param min the min to set
     */
    public void setMin(String min) {
        this.min = min;
    }
}
