/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.stooges.core.util.AllConstants;
import com.stooges.core.util.PlatAppUtil;
import com.stooges.core.util.PlatBeanUtil;
import com.stooges.core.util.PlatStringUtil;
import com.stooges.core.util.PlatUICompUtil;
import com.stooges.platform.appmodel.service.FileAttachService;
import com.stooges.platform.common.controller.BaseController;
import com.stooges.platform.system.service.PositionService;
import com.stooges.platform.system.service.RoleService;
import com.stooges.platform.system.service.SysLogService;
import com.stooges.platform.system.service.SysUserService;

/**
 * 
 * 描述 系统用户业务相关Controller
 * @author 胡裕
 * @version 1.0
 * @created 2017-04-10 17:03:31
 */
@Controller  
@RequestMapping("/system/SysUserController")  
public class SysUserController extends BaseController {
    /**
     * 
     */
    @Resource
    private SysUserService sysUserService;
    /**
     * 
     */
    @Resource
    private SysLogService sysLogService;
    /**
     * 
     */
    @Resource
    private RoleService roleService;
    /**
     * 
     */
    @Resource
    private FileAttachService fileAttachService;
    /**
     * 
     */
    @Resource
    private PositionService positionService;
    
    /**
     * 跳转到系统用户表单界面
     * @param request
     * @return
     */
    @RequestMapping(params = "goForm")
    public ModelAndView goForm(HttpServletRequest request) {
        String SYSUSER_ID = request.getParameter("SYSUSER_ID");
        //获取设计的界面编码
        String UI_DESIGNCODE = request.getParameter("UI_DESIGNCODE");
        String companyId = request.getParameter("companyId");
        Map<String,Object> sysUser = null;
        if(StringUtils.isNotEmpty(SYSUSER_ID)){
            sysUser = this.sysUserService.getRecord("PLAT_SYSTEM_SYSUSER"
                    ,new String[]{"SYSUSER_ID"},new Object[]{SYSUSER_ID});
            List<Map<String,Object>> roleList = roleService.findByUserId(SYSUSER_ID);
            StringBuffer SYSUSER_ROLEIDS = new StringBuffer("");
            StringBuffer SYSUSER_ROLENAMES = new StringBuffer("");
            for(int i=0;i<roleList.size();i++){
                if(i>0){
                    SYSUSER_ROLEIDS.append(",");
                    SYSUSER_ROLENAMES.append(",");
                }
                SYSUSER_ROLEIDS.append(roleList.get(i).get("ROLE_ID"));
                SYSUSER_ROLENAMES.append(roleList.get(i).get("ROLE_NAME"));
            }
            sysUser.put("SYSUSER_ROLEIDS", SYSUSER_ROLEIDS.toString());
            sysUser.put("SYSUSER_ROLENAMES", SYSUSER_ROLENAMES.toString());
            Map<String,String> pos = positionService.getUserPositionInfo(SYSUSER_ID);
            sysUser.put("SYSUSER_POSIDS", pos.get("ids"));
            sysUser.put("SYSUSER_POSNAMES", pos.get("names"));
        }else{
            sysUser = new HashMap<String,Object>();
            sysUser.put("SYSUSER_COMPANYID", companyId);
        }
        request.setAttribute("sysUser", sysUser);
        return PlatUICompUtil.goDesignUI(UI_DESIGNCODE, request);
    }
    
    /**
     * 跳转到系统角色选择界面
     * @param request
     * @return
     */
    @RequestMapping(params = "goRoleGrant")
    public ModelAndView goRoleGrant(HttpServletRequest request) {
        String USER_ID = request.getParameter("USER_ID");
        List<String> userIds = roleService.findRoleIds(USER_ID);
        StringBuffer selectedRecordIds = new StringBuffer("");
        for(int i=0;i<userIds.size();i++){
            if(i>0){
                selectedRecordIds.append(",");
            }
            selectedRecordIds.append(userIds.get(i));
        }
        request.setAttribute("selectedRecordIds", selectedRecordIds.toString());
        return PlatUICompUtil.goDesignUI("roleselector", request);
    }
    
    /**
     * 跳转到查看用户权限界面
     * @param request
     * @return
     */
    @RequestMapping(params = "goQueryRight")
    public ModelAndView goQueryRight(HttpServletRequest request) {
        String SYSUSER_ID = request.getParameter("SYSUSER_ID");
        List<String> rightRecordIds = this.sysUserService.findGrantRightIds(SYSUSER_ID);
        String selectedRecordIds = PlatStringUtil.getListStringSplit(rightRecordIds);
        request.setAttribute("selectedRecordIds", selectedRecordIds);
        request.setAttribute("queryRight", "true");
        return PlatUICompUtil.goDesignUI("rolegrantform", request);
    }
    
    /**
     * 跳转到修改用户信息界面
     * @param request
     * @return
     */
    @RequestMapping(params = "goUserInfo")
    public ModelAndView goUserInfo(HttpServletRequest request) {
        //获取当前的后台登录用户
        Map<String,Object> backLoginUser = PlatAppUtil.getBackPlatLoginUser();
        String SYSUSER_ID = (String) backLoginUser.get("SYSUSER_ID");
        Map<String,Object> sysUser = this.sysUserService.getRecord("PLAT_SYSTEM_SYSUSER",
                new String[]{"SYSUSER_ID"}, new Object[]{SYSUSER_ID});
        String SYSUSER_MENUTYPE = (String) sysUser.get("SYSUSER_MENUTYPE");
        String SYSUSER_THEMECOLOR = (String) sysUser.get("SYSUSER_THEMECOLOR");
        sysUser.putAll(backLoginUser);
        sysUser.put("SYSUSER_MENUTYPE", SYSUSER_MENUTYPE);
        sysUser.put("SYSUSER_THEMECOLOR", SYSUSER_THEMECOLOR);
        String SYSUSER_DEPARTID = (String) sysUser.get("SYSUSER_DEPARTID");
        String SYSUSER_COMPANYID = (String)sysUser.get("SYSUSER_COMPANYID");
        if(StringUtils.isNotEmpty(SYSUSER_DEPARTID)){
            Map<String,Object> company = this.sysUserService.getRecord("PLAT_SYSTEM_COMPANY",
                    new String[]{"COMPANY_ID"},new Object[]{SYSUSER_COMPANYID});
            String COMPANY_NAME = (String) company.get("COMPANY_NAME");
            sysUser.put("COMPANY_NAME", COMPANY_NAME);
            Map<String,Object> depart = this.sysUserService.getRecord("PLAT_SYSTEM_DEPART",
                    new String[]{"DEPART_ID"},new Object[]{SYSUSER_DEPARTID});
            String DEPART_NAME = (String) depart.get("DEPART_NAME");
            sysUser.put("DEPART_NAME", DEPART_NAME);
        }
        request.setAttribute("sysUser", sysUser);
        return PlatUICompUtil.goDesignUI("userinfo", request);
    }
    
    /**
     * 修改用户信息
     * @param request
     * @param response
     */
    @RequestMapping(params = "updateUserInfo")
    public void updateUserInfo(HttpServletRequest request,
            HttpServletResponse response) {
        Map<String,Object> result = PlatBeanUtil.getMapFromRequest(request);
        //获取当前的后台登录用户
        Map<String,Object> backLoginUser = PlatAppUtil.getBackPlatLoginUser();
        String SYSUSER_ID = (String) backLoginUser.get("SYSUSER_ID");
        Map<String,Object> oldUser = this.sysUserService.getRecord("PLAT_SYSTEM_SYSUSER",
                new String[]{"SYSUSER_ID"}, new Object[]{SYSUSER_ID});
        String SYSUSER_MOBILE = request.getParameter("SYSUSER_MOBILE");
        String SYSUSER_SEX = request.getParameter("SYSUSER_SEX");
        oldUser.put("SYSUSER_MOBILE", SYSUSER_MOBILE);
        oldUser.put("SYSUSER_SEX", SYSUSER_SEX);
        sysUserService.saveOrUpdate("PLAT_SYSTEM_SYSUSER", oldUser,AllConstants.IDGENERATOR_UUID,null);
        String USER_PHOTO_JSON = request.getParameter("USER_PHOTO_JSON");
        fileAttachService.saveFileAttachs(USER_PHOTO_JSON,"PLAT_SYSTEM_SYSUSER",SYSUSER_ID,"photo");
        result.put("success", true);
        this.printObjectJsonString(result, response);
    }
    
    /**
     * 修改主题配置
     * @param request
     * @param response
     */
    @RequestMapping(params = "updateTheme")
    public void updateTheme(HttpServletRequest request,
            HttpServletResponse response) {
        Map<String,Object> sysUser = PlatBeanUtil.getMapFromRequest(request);
        sysUserService.saveOrUpdate("PLAT_SYSTEM_SYSUSER", sysUser,AllConstants.IDGENERATOR_UUID,null);
        sysUser.put("success", true);
        sysUser.put("msg", "保存成功,刷新系统生效!");
        this.printObjectJsonString(sysUser, response);
    }
    
    /**
     * 更新用户密码
     * @param request
     * @param response
     */
    @RequestMapping(params = "updatePass")
    public void updatePass(HttpServletRequest request,
            HttpServletResponse response) {
        Map<String,Object> result = PlatBeanUtil.getMapFromRequest(request);
        //获取当前的后台登录用户
        Map<String,Object> backLoginUser = PlatAppUtil.getBackPlatLoginUser();
        String SYSUSER_ID = (String) backLoginUser.get("SYSUSER_ID");
        Map<String,Object> sysUser = this.sysUserService.getRecord("PLAT_SYSTEM_SYSUSER",
                new String[]{"SYSUSER_ID"}, new Object[]{SYSUSER_ID});
        String SYSUSER_PASSWORD = (String) sysUser.get("SYSUSER_PASSWORD");
        String OLD_PASSWORD = request.getParameter("OLD_PASSWORD");
        String password = PlatStringUtil.getSHA256Encode(OLD_PASSWORD
                , null, 1);
        if(SYSUSER_PASSWORD.equals(password)){
            String NEW_PASSWORD = request.getParameter("NEW_PASSWORD");
            String CONFIRM_PASSWORD = request.getParameter("CONFIRM_PASSWORD");
            if(NEW_PASSWORD.equals(CONFIRM_PASSWORD)){
                String encodePassword = PlatStringUtil.getSHA256Encode(NEW_PASSWORD
                        , null, 1);
                sysUser.put("SYSUSER_PASSWORD", encodePassword);
                sysUserService.saveOrUpdate("PLAT_SYSTEM_SYSUSER", sysUser,AllConstants.IDGENERATOR_UUID,null);
                result.put("success", true);
            }else{
                result.put("success", false);
                result.put("msg", "输入的两次新密码不一致!");
            }
        }else{
            result.put("success", false);
            result.put("msg", "原密码输入错误!");
        }
        this.printObjectJsonString(result, response);
    }
    
    
    /**
     * 获取用户会话信息
     * @param request
     * @param response
     */
    @RequestMapping(params = "getUserSessionInfo")
    public void getUserSessionInfo(HttpServletRequest request,
            HttpServletResponse response) {
        Map<String,Object> backLoginUser = PlatAppUtil.getBackPlatLoginUser();
        String backLoginUserJson = JSON.toJSONString(backLoginUser);
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("success", true);
        result.put("backLoginUserJson", backLoginUserJson);
        this.printObjectJsonString(result, response);
    }
    
    /**
     * 重置用户的密码
     * @param request
     * @param response
     */
    @RequestMapping(params = "resetPass")
    public void resetPass(HttpServletRequest request,
            HttpServletResponse response) {
        String selectColValues = request.getParameter("selectColValues");
        String userIds = null;
        if(selectColValues.contains("402848a55b6547ec015b6547ec760000")){
            userIds = selectColValues.replace("402848a55b6547ec015b6547ec760000", "");
        }else{
            userIds = selectColValues;
        }
        if(StringUtils.isNotEmpty(userIds)&&userIds.length()>1){
            sysUserService.resetPassword(userIds);
        }
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("success", true);
        result.put("msg", "密码成功重置成【"+SysUserService.DEFAULT_PASSWORD+"】");
        this.printObjectJsonString(result, response);
    }
    /**
     * 
     * @param request
     * @param response
     */
    @RequestMapping(params = "updateSn")
    public void updateSn(HttpServletRequest request,
            HttpServletResponse response) {
        String userIds = request.getParameter("userIds");
        sysUserService.updateSn(userIds.split(","));
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("success", true);
        this.printObjectJsonString(result, response);
    }
    
}
