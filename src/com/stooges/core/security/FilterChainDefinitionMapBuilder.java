/*
 * Copyright (c) 2005, 2017, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.core.security;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.stooges.platform.appmodel.service.GlobalUrlService;

/**
 * 描述
 * @author 胡裕
 * @created 2017年4月4日 下午8:05:00
 */
public class FilterChainDefinitionMapBuilder {
    /**
     * 设置动态的URL资源
     * @return
     */
    public LinkedHashMap<String, String> buildFilterChainDefinitionMap(){
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        // 实例化Spring容器
        ApplicationContext ctx = new ClassPathXmlApplicationContext("conf/app-resources.xml");
        // 从Spring容器取得bean
        GlobalUrlService globalUrlService = (GlobalUrlService) ctx.getBean("globalUrlService");
        List<String> anonUrls = globalUrlService.findByFilterType("1");
        for(String anonUrl:anonUrls){
            map.put("/"+anonUrl, "anon");
        }
        //加载全局匿名URL数据
        map.put("/**", "authc,resourceCheckFilter");
        return map;
    }
}
