<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="com.stooges.core.util.PlatAppUtil"%>
<%@ page language="java" import="com.stooges.core.util.PlatFileUtil"%>
<%@ page language="java" import="com.stooges.platform.appmodel.service.DesignService"%>
<%@ page language="java" import="org.apache.commons.lang3.StringUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="plattag" uri="/plattag"%>

<%
  
%>

<!-- 开始引入基本信息界面 -->
<jsp:include page='<%="/appmodel/DesignController/includeUI.do"%>' >
    <jsp:param value="listgroupbaseconfig" name="DESIGN_CODE"/>
</jsp:include>
<!-- 结束引入基本信息界面 -->

<script type="text/javascript">

function saveListGroupBaseConfig(){
	var result = false;
	var formData = PlatUtil.getFormEleData("BaseConfigForm");
	var TREE_CLICKFN = PlatUtil.PLAT_CODEMIRROREDITOR.getValue();
	formData.TREE_CLICKFN = TREE_CLICKFN;
	result  = PlatUtil.saveUIBaseConfigAndGoAttach(formData);
	return result;
}

$(function(){
	PlatUtil.initUIComp("#BaseConfigForm");
	
});
</script>
