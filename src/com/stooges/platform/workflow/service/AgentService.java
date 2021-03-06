/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.workflow.service;

import java.util.List;
import java.util.Map;

import com.stooges.core.model.SqlFilter;
import com.stooges.core.service.BaseService;

/**
 * 描述 工作委托业务相关service
 * @author 胡裕
 * @version 1.0
 * @created 2017-05-27 16:49:15
 */
public interface AgentService extends BaseService {
    /**
     * 判断是否配置过代理
     * @param userId
     * @return
     */
    public boolean isExistsConfig(String userId);
    /**
     * 根据filter和配置信息获取数据列表
     * @param filter
     * @param fieldInfo
     * @return
     */
    public List<Map<String,Object>> findList(SqlFilter filter,Map<String,Object> fieldInfo);
    /**
     * 根据用户ID获取代理人ID
     * @param userId
     * @return
     */
    public String getAgentProxyerId(String userId,String defId);
    /**
     * 获取下一步办理人的代理人IDS
     * @param sourceNextAssignerIds
     * @param defId
     * @return
     */
    public String getNextAssignerProxyerIds(String sourceNextAssignerIds,String defId);
}
