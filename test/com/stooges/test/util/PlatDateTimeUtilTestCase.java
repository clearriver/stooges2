/*
 * Copyright (c) 2005, 2014, STOOGES Technology Co.,Ltd. All rights reserved.
 * STOOGES PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package com.stooges.test.util;

import java.util.Date;

import com.stooges.core.util.PlatDateTimeUtil;

/**
 * @author 胡裕
 *
 * 
 */
public class PlatDateTimeUtilTestCase {

    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Date date = new Date();
        int hour = PlatDateTimeUtil.getHour(date);
        System.out.println(PlatDateTimeUtil.getTimeSection(hour));
    }

}
