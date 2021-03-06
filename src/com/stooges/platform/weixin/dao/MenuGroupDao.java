/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.weixin.dao;

import com.stooges.core.dao.BaseDao;

/**
 * 
 * 描述 菜单组业务相关dao
 * @author 胡裕
 * @version 1.0
 * @created 2017-12-21 10:04:25
 */
public interface MenuGroupDao extends BaseDao {
    /**
     * 获取组的数量
     * @param publicId
     * @return
     */
    public int getGroupCount(String publicId);
}
