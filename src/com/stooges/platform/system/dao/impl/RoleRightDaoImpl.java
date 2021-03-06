/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.system.dao.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Repository;

import com.stooges.core.dao.BaseDao;
import com.stooges.core.dao.impl.BaseDaoImpl;
import com.stooges.core.util.PlatDbUtil;
import com.stooges.platform.system.dao.RoleRightDao;

/**
 * 描述角色权限中间表业务相关dao实现类
 * @author 胡裕
 * @version 1.0
 * @created 2017-04-23 16:57:24
 */
@Repository
public class RoleRightDaoImpl extends BaseDaoImpl implements RoleRightDao {
    /**
     * 根据角色ID获取
     * @param roleId
     * @return
     */
    public List<String> getRightRecordIds(String roleId,String tableName){
        StringBuffer sql = new StringBuffer("SELECT T.RE_RECORDID FROM ");
        sql.append("PLAT_SYSTEM_ROLERIGHT T WHERE T.ROLE_ID=?");
        sql.append(" AND T.ROLE_TABLE=? ");
        List<String> list = this.getJdbcTemplate().queryForList(sql.toString(),
                new Object[]{roleId,tableName},String.class);
        return list;
    }
    
    
    /**
     * 根据用户ID和表名称获取用户被授权的资源IDS集合
     * @param userId
     * @param tableName
     * @return
     */
    public Set<String> getUserGrantRightIds(String userId,String tableName){
        String sql = PlatDbUtil.getDiskSqlContent("system/roleright/001",null);
        List<String> resCodeList = this.getJdbcTemplate()
                .queryForList(sql.toString(),new Object[]{tableName,userId,userId,"PLAT_SYSTEM_SYSUSER",
                    userId,"PLAT_SYSTEM_USERGROUP"},String.class);
        if(resCodeList!=null&&resCodeList.size()>0){
            return new HashSet<String>(resCodeList);
        }else{
            return null;
        }
    }
}
