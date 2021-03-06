/*
 * Copyright (c) 2005, 2018, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.system.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.stooges.core.dao.BaseDao;
import com.stooges.core.service.impl.BaseServiceImpl;
import com.stooges.core.util.AllConstants;
import com.stooges.core.util.PlatAppUtil;
import com.stooges.core.util.PlatDateTimeUtil;
import com.stooges.platform.system.dao.SysMessageDao;
import com.stooges.platform.system.service.SysMessageService;

/**
 * 描述 系统消息业务相关service实现类
 * @author 李俊
 * @version 1.0
 * @created 2018-05-17 21:24:14
 */
@Service("sysMessageService")
public class SysMessageServiceImpl extends BaseServiceImpl implements SysMessageService {

    /**
     * 所引入的dao
     */
    @Resource
    private SysMessageDao dao;

    @Override
    protected BaseDao getDao() {
        return dao;
    }

	/**
	 * 
	 */
	@Override
	public void saveSysMessage(Map message) {
		message.put("SYSMESSAGE_CREATETIME", PlatDateTimeUtil.formatDate(new Date(),
                "yyyy-MM-dd HH:mm:ss"));
		String USER_IDS = (String)message.get("USER_IDS");
		message = this.saveOrUpdate("PLAT_SYSTEM_SYSMESSAGE",
				message,AllConstants.IDGENERATOR_UUID,null);
		String SYSMESSAGE_ID = (String) message.get("SYSMESSAGE_ID");
		if(StringUtils.isNotEmpty(USER_IDS)){
			StringBuffer sql = new StringBuffer("INSERT INTO PLAT_SYSTEM_SYSUSERMESSAGE");
	        sql.append("(SYSUSER_ID,SYSMESSAGE_ID,MESSAGE_ISSEE) VALUES(?,?,?) ");
			String[] userIds = USER_IDS.split(",");
			for (int i = 0; i < userIds.length; i++) {
				 dao.executeSql(sql.toString(),new Object[]{userIds[i],SYSMESSAGE_ID,"0"});
			}
		}
		
	}

	/**
	 * 
	 */
	@Override
	public boolean isSaveCurDate() {
		StringBuffer sql = new StringBuffer("");
		sql.append("SELECT * FROM PLAT_SYSTEM_SYSMESSAGE T WHERE T.SYSMESSAGE_CREATETIME  LIKE ? ");
		List<Map<String,Object>> list = dao.findBySql(sql.toString(), new Object[]{"%"+PlatDateTimeUtil.formatDate(new Date(),
                "yyyy-MM-dd")+"%"}, null);
		if(list!=null&&list.size()>0){
			return true;
		}
		return false;
	}

	/**
	 * 
	 */
	@Override
	public List findNoReadList() {
		StringBuffer sql = new StringBuffer("");
		sql.append(" SELECT T.* FROM PLAT_SYSTEM_SYSMESSAGE  T ");
		sql.append(" LEFT JOIN PLAT_SYSTEM_SYSUSERMESSAGE SM ");
		sql.append(" ON T.SYSMESSAGE_ID = SM.SYSMESSAGE_ID ");
		sql.append("   WHERE SM.MESSAGE_ISSEE = 0 AND SM.SYSUSER_ID=? ");
		sql.append("ORDER BY T.SYSMESSAGE_CREATETIME DESC");
		return dao.findBySql(sql.toString(), new Object[]{
			PlatAppUtil.getBackPlatLoginUser().get("SYSUSER_ID").toString()
		}, null);
	}

	/**
	 * 
	 */
	@Override
	public void updateSeeTime(String sYSMESSAGE_ID) {
		StringBuffer sql = new StringBuffer("");
		sql.append("update PLAT_SYSTEM_SYSUSERMESSAGE set MESSAGE_ISSEE=?,MESSAGE_SEETIME=? ");
		sql.append(" WHERE SYSUSER_ID=? AND SYSMESSAGE_ID=? ");
		dao.executeSql(sql.toString(), new Object[]{
			1,
			PlatDateTimeUtil.formatDate(new Date(),
	                "yyyy-MM-dd HH:mm:ss"),
	        PlatAppUtil.getBackPlatLoginUser().get("SYSUSER_ID").toString(),
	        sYSMESSAGE_ID
		});
	}
  
}
