/*
 * Copyright (c) 2005, 2018, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.platform.metadata.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.stooges.core.dao.BaseDao;
import com.stooges.core.service.impl.BaseServiceImpl;
import com.stooges.core.util.AllConstants;
import com.stooges.core.util.PlatBeanUtil;
import com.stooges.core.util.PlatDateTimeUtil;
import com.stooges.platform.metadata.dao.DatalogDao;
import com.stooges.platform.metadata.service.DataSerService;
import com.stooges.platform.metadata.service.DatalogService;

/**
 * 描述 服务请求日志业务相关service实现类
 * @author HuYu
 * @version 1.0
 * @created 2018-05-10 17:03:49
 */
@Service("datalogService")
public class DatalogServiceImpl extends BaseServiceImpl implements DatalogService {

    /**
     * 所引入的dao
     */
    @Resource
    private DatalogDao dao;

    @Override
    protected BaseDao getDao() {
        return dao;
    }
    
    /**
     * 获取当日调用次数
     * @param DATALOG_SECODE
     * @param DATALOG_GR
     * @return
     */
    public int getCount(String DATALOG_SECODE,String DATALOG_GR){
        StringBuffer sql = new StringBuffer("SELECT COUNT(*) FROM ");
        sql.append("PLAT_METADATA_DATALOG T WHERE T.DATALOG_SECODE=? ");
        sql.append(" AND T.DATALOG_GR=? AND T.DATALOG_TIME>=? ");
        sql.append(" AND T.DATALOG_TIME<=? ");
        String beginTime = PlatDateTimeUtil.
                formatDate(new Date(), "yyyy-MM-dd")+" 00:00:00";
        String endTime = PlatDateTimeUtil.
                formatDate(new Date(), "yyyy-MM-dd")+" 23:59:59";
        return dao.getIntBySql(sql.toString(), new Object[]{DATALOG_SECODE,
            DATALOG_GR,beginTime,endTime});
    }
    
    /**
     * 保存请求日志
     * @param request
     * @param requestIp
     * @param servicecode
     * @param grantcode
     * @param result
     * @param datalog
     * @param DATALOG_ERLOG
     */
    public void saveDataLog(HttpServletRequest request, String requestIp,
            String servicecode, String grantcode, Map<String, Object> result,
            Map<String, Object> datalog, String DATALOG_ERLOG){
        if((boolean)result.get("success")==true){
            result.put("invokeResultCode", DataSerService.CODE_SUCCESS);
        }else{
            String invokeResultCode = (String) result.get("invokeResultCode");
            if(StringUtils.isEmpty(invokeResultCode)){
                result.put("invokeResultCode", DataSerService.CODE_OTHER);
            }
        }
        String invokeResultCode = (String) result.get("invokeResultCode");
        if(invokeResultCode.equals( DataSerService.CODE_SUCCESS)||
                invokeResultCode.equals( DataSerService.CODE_OTHER)){
            Map<String,Object> serviceInfo = this.getRecord("PLAT_METADATA_DATASER",
                    new String[]{"DATASER_CODE"},new Object[]{servicecode});
            String DATASER_RELOG = serviceInfo.get("DATASER_RELOG").toString();
            if(DATASER_RELOG.equals("1")){
                Map<String,Object> dockInfo = null;
                if(StringUtils.isNotEmpty(grantcode)){
                    //获取请求方信息
                    dockInfo = this.getRecord("PLAT_METADATA_DOCK", 
                            new String[]{"DOCK_GRCODE"}, new Object[]{grantcode});
                }
                datalog.put("DATALOG_IP", requestIp);
                datalog.put("DATALOG_TIME",PlatDateTimeUtil.formatDate(new Date(), 
                        "yyyy-MM-dd HH:mm:ss"));
                datalog.put("DATALOG_SECODE",serviceInfo.get("DATASER_CODE"));
                datalog.put("DATALOG_NAME",serviceInfo.get("DATASER_NAME"));
                datalog.put("DATALOG_COMNAME",dockInfo.get("DOCK_COMPANY"));
                datalog.put("DATALOG_GR",dockInfo.get("DOCK_GRCODE"));
                datalog.put("DATALOG_ERLOG",DATALOG_ERLOG);
                Map<String,Object> params = PlatBeanUtil.getMapFromRequest(request);
                datalog.put("DATALOG_PARAM",JSON.toJSONString(params));
                if((Boolean)result.get("success")==true){
                    datalog.put("DATALOG_RESULT", 1);
                }else{
                    datalog.put("DATALOG_RESULT", -1);
                }
                this.saveOrUpdate("PLAT_METADATA_DATALOG",datalog,
                        AllConstants.IDGENERATOR_UUID,null);
            }
        }
    }
  
}
