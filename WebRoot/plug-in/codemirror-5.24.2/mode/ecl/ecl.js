(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("ecl",function(S){function B(Y){var X={},V=Y.split(" ");for(var W=0;W<V.length;++W){X[V[W]]=true}return X}function O(W,V){if(!V.startOfLine){return false}W.skipToEnd();return"meta"}var M=S.indentUnit;var Q=B("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode");var R=B("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait");var G=B("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath");var H=B("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode");var F=B("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when");var P=B("catch class do else finally for if switch try while");var J=B("true false null");var L={"#":O};var U=/[+\-*&%=<>!?|\/]/;var D;function E(b,a){var Z=b.next();if(L[Z]){var X=L[Z](b,a);if(X!==false){return X}}if(Z=='"'||Z=="'"){a.tokenize=K(Z);return a.tokenize(b,a)}if(/[\[\]{}\(\),;\:\.]/.test(Z)){D=Z;return null}if(/\d/.test(Z)){b.eatWhile(/[\w\.]/);return"number"}if(Z=="/"){if(b.eat("*")){a.tokenize=T;return T(b,a)}if(b.eat("/")){b.skipToEnd();return"comment"}}if(U.test(Z)){b.eatWhile(U);return"operator"}b.eatWhile(/[\w\$_]/);var V=b.current().toLowerCase();if(Q.propertyIsEnumerable(V)){if(P.propertyIsEnumerable(V)){D="newstatement"}return"keyword"}else{if(R.propertyIsEnumerable(V)){if(P.propertyIsEnumerable(V)){D="newstatement"}return"variable"}else{if(G.propertyIsEnumerable(V)){if(P.propertyIsEnumerable(V)){D="newstatement"}return"variable-2"}else{if(H.propertyIsEnumerable(V)){if(P.propertyIsEnumerable(V)){D="newstatement"}return"variable-3"}else{if(F.propertyIsEnumerable(V)){if(P.propertyIsEnumerable(V)){D="newstatement"}return"builtin"}else{var W=V.length-1;while(W>=0&&(!isNaN(V[W])||V[W]=="_")){--W}if(W>0){var Y=V.substr(0,W+1);if(H.propertyIsEnumerable(Y)){if(P.propertyIsEnumerable(Y)){D="newstatement"}return"variable-3"}}}}}}}if(J.propertyIsEnumerable(V)){return"atom"}return null}function K(V){return function(a,Y){var X=false,Z,W=false;while((Z=a.next())!=null){if(Z==V&&!X){W=true;break}X=!X&&Z=="\\"}if(W||!X){Y.tokenize=E}return"string"}}function T(Y,W){var X=false,V;while(V=Y.next()){if(V=="/"&&X){W.tokenize=E;break}X=(V=="*")}return"comment"}function C(Z,Y,V,X,W){this.indented=Z;this.column=Y;this.type=V;this.align=X;this.prev=W}function I(X,W,V){return X.context=new C(X.indented,W,V,null,X.context)}function N(W){var V=W.context.type;if(V==")"||V=="]"||V=="}"){W.indented=W.context.indented}return W.context=W.context.prev}return{startState:function(V){return{tokenize:null,context:new C((V||0)-M,0,"top",false),indented:0,startOfLine:true}},token:function(Y,W){var X=W.context;if(Y.sol()){if(X.align==null){X.align=false}W.indented=Y.indentation();W.startOfLine=true}if(Y.eatSpace()){return null}D=null;var V=(W.tokenize||E)(Y,W);if(V=="comment"||V=="meta"){return V}if(X.align==null){X.align=true}if((D==";"||D==":")&&X.type=="statement"){N(W)}else{if(D=="{"){I(W,Y.column(),"}")}else{if(D=="["){I(W,Y.column(),"]")}else{if(D=="("){I(W,Y.column(),")")}else{if(D=="}"){while(X.type=="statement"){X=N(W)}if(X.type=="}"){X=N(W)}while(X.type=="statement"){X=N(W)}}else{if(D==X.type){N(W)}else{if(X.type=="}"||X.type=="top"||(X.type=="statement"&&D=="newstatement")){I(W,Y.column(),"statement")}}}}}}}W.startOfLine=false;return V},indent:function(Z,W){if(Z.tokenize!=E&&Z.tokenize!=null){return 0}var Y=Z.context,X=W&&W.charAt(0);if(Y.type=="statement"&&X=="}"){Y=Y.prev}var V=X==Y.type;if(Y.type=="statement"){return Y.indented+(X=="{"?0:M)}else{if(Y.align){return Y.column+(V?0:1)}else{return Y.indented+(V?0:M)}}},electricChars:"{}"}});A.defineMIME("text/x-ecl","ecl")});