/*
 * Copyright (c) 2017, 2020, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.webstatistics.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.stooges.core.util.AllConstants;
import com.stooges.core.util.PlatBeanUtil;
import com.stooges.core.util.PlatUICompUtil;
import com.stooges.platform.common.controller.BaseController;
import com.stooges.platform.system.service.SysLogService;
import com.stooges.platform.webstatistics.service.InviewService;

/**
 * 
 * 描述 入口数据业务相关Controller
 * @author 李俊
 * @version 1.0
 * @created 2017-07-27 17:50:00
 */
@Controller  
@RequestMapping("/webstatistics/InviewController")  
public class InviewController extends BaseController {
    /**
     * 
     */
    @Resource
    private InviewService inviewService;
    /**
     * 
     */
    @Resource
    private SysLogService sysLogService;
    
    /**
     * 删除入口数据数据
     * @param request
     * @param response
     */
    @RequestMapping(params = "multiDel")
    public void multiDel(HttpServletRequest request,
            HttpServletResponse response) {
        String selectColValues = request.getParameter("selectColValues");
        inviewService.deleteRecords("PLAT_WEBSTATISTICS_INVIEW","INVIEW_ID",selectColValues.split(","));
        sysLogService.saveBackLog("访问入口",SysLogService.OPER_TYPE_DEL,
                "删除了ID为["+selectColValues+"]的入口数据", request);
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("success", true);
        this.printObjectJsonString(result, response);
    }
    
    /**
     * 新增或者修改入口数据数据
     * @param request
     * @param response
     */
    @RequestMapping(params = "saveOrUpdate")
    public void saveOrUpdate(HttpServletRequest request,
            HttpServletResponse response) {
        Map<String,Object> inview = PlatBeanUtil.getMapFromRequest(request);
        String INVIEW_ID = (String) inview.get("INVIEW_ID");
        inview = inviewService.saveOrUpdate("PLAT_WEBSTATISTICS_INVIEW",
                inview,AllConstants.IDGENERATOR_UUID,null);
        //如果是保存树形结构表数据,请调用下面的接口,而注释掉上面的接口代码
        //inview = inviewService.saveOrUpdateTreeData("PLAT_WEBSTATISTICS_INVIEW",
        //        inview,AllConstants.IDGENERATOR_UUID,null);
        if(StringUtils.isNotEmpty(INVIEW_ID)){
            sysLogService.saveBackLog("访问入口",SysLogService.OPER_TYPE_EDIT,
                    "修改了ID为["+INVIEW_ID+"]入口数据", request);
        }else{
            INVIEW_ID = (String) inview.get("INVIEW_ID");
            sysLogService.saveBackLog("访问入口",SysLogService.OPER_TYPE_ADD,
                    "新增了ID为["+INVIEW_ID+"]入口数据", request);
        }
        inview.put("success", true);
        this.printObjectJsonString(inview, response);
    }
    
    /**
     * 跳转到入口数据表单界面
     * @param request
     * @return
     */
    @RequestMapping(params = "goForm")
    public ModelAndView goForm(HttpServletRequest request) {
        String INVIEW_ID = request.getParameter("INVIEW_ID");
        //获取设计的界面编码
        String UI_DESIGNCODE = request.getParameter("UI_DESIGNCODE");
        Map<String,Object> inview = null;
        if(StringUtils.isNotEmpty(INVIEW_ID)){
            inview = this.inviewService.getRecord("PLAT_WEBSTATISTICS_INVIEW"
                    ,new String[]{"INVIEW_ID"},new Object[]{INVIEW_ID});
        }else{
            inview = new HashMap<String,Object>();
        }
        request.setAttribute("inview", inview);
        return PlatUICompUtil.goDesignUI(UI_DESIGNCODE, request);
        //如果是跳转到树形表单录入界面,请开放以下代码,,而注释掉上面的代码
        /*String INVIEW_ID = request.getParameter("INVIEW_ID");
        String INVIEW_PARENTID = request.getParameter("INVIEW_PARENTID");
        //获取设计的界面编码
        String UI_DESIGNCODE = request.getParameter("UI_DESIGNCODE");
        Map<String,Object> inview = null;
        if(StringUtils.isNotEmpty(INVIEW_ID)){
            inview = this.inviewService.getRecord("PLAT_WEBSTATISTICS_INVIEW"
                    ,new String[]{"INVIEW_ID"},new Object[]{INVIEW_ID});
            INVIEW_PARENTID = (String) inview.get("Inview_PARENTID");
        }
        Map<String,Object> parentInview = null;
        if(INVIEW_PARENTID.equals("0")){
            parentInview = new HashMap<String,Object>();
            parentInview.put("INVIEW_ID",INVIEW_PARENTID);
            parentInview.put("INVIEW_NAME","入口数据树");
        }else{
            parentInview = this.inviewService.getRecord("PLAT_WEBSTATISTICS_INVIEW",
                    new String[]{"INVIEW_ID"}, new Object[]{INVIEW_PARENTID});
        }
        if(inview==null){
            inview = new HashMap<String,Object>();
        }
        inview.put("INVIEW_PARENTID",parentInview.get("INVIEW_ID"));
        inview.put("INVIEW_PARENTNAME",parentInview.get("INVIEW_NAME"));
        request.setAttribute("inview", inview);
        return PlatUICompUtil.goDesignUI(UI_DESIGNCODE, request);*/
    }
}
