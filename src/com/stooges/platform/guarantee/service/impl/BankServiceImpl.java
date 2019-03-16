/*
 * Copyright (c) 2005, 2018, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.guarantee.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.stooges.core.dao.BaseDao;
import com.stooges.core.service.impl.BaseServiceImpl;
import com.stooges.platform.guarantee.dao.BankDao;
import com.stooges.platform.guarantee.service.BankService;

/**
 * 描述 合作银行业务相关service实现类
 * @author HuYu
 * @version 1.0
 * @created 2019-03-05 22:44:10
 */
@Service("bankService")
public class BankServiceImpl extends BaseServiceImpl implements BankService {

    /**
     * 所引入的dao
     */
    @Resource
    private BankDao dao;

    @Override
    protected BaseDao getDao() {
        return dao;
    }
  
}
