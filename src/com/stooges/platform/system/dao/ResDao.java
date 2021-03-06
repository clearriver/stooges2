/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.system.dao;

import java.util.List;
import java.util.Set;

import com.stooges.core.dao.BaseDao;

/**
 * 
 * 描述 系统资源业务相关dao
 * @author 胡裕
 * @version 1.0
 * @created 2017-04-05 17:12:34
 */
public interface ResDao extends BaseDao {
    /**
     * 根据用户ID获取用户被授权的资源KEY集合
     * @param userId
     * @return
     */
    public Set<String> getUserGrantResCodes(String userId);
    /**
     * 根据资源编码获取被分配的用户ID列表
     * @param resId
     * @return
     */
    public List<String> findGrantedUserIds(String resCode);
    
}
