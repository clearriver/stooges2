/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.workflow.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.stooges.core.dao.BaseDao;
import com.stooges.core.service.impl.BaseServiceImpl;
import com.stooges.platform.workflow.dao.RemindReceiveDao;
import com.stooges.platform.workflow.service.RemindReceiveService;

/**
 * 描述 催办接收人信息业务相关service实现类
 * @author 胡裕
 * @version 1.0
 * @created 2017-11-16 08:50:10
 */
@Service("remindReceiveService")
public class RemindReceiveServiceImpl extends BaseServiceImpl implements RemindReceiveService {

    /**
     * 所引入的dao
     */
    @Resource
    private RemindReceiveDao dao;

    @Override
    protected BaseDao getDao() {
        return dao;
    }
  
}
