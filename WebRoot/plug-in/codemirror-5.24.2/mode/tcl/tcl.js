(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("tcl",function(){function D(N){var M={},K=N.split(" ");for(var L=0;L<K.length;++L){M[K[L]]=true}return M}var E=D("Tcl safe after append array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd close concat continue dde eof encoding error eval exec exit expr fblocked fconfigure fcopy file fileevent filename filename flush for foreach format gets glob global history http if incr info interp join lappend lindex linsert list llength load lrange lreplace lsearch lset lsort memory msgcat namespace open package parray pid pkg::create pkg_mkIndex proc puts pwd re_syntax read regex regexp registry regsub rename resource return scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_wordBreakAfter tcl_startOfPreviousWord tcl_wordBreakBefore tcltest tclvars tell time trace unknown unset update uplevel upvar variable vwait");var H=D("if elseif else and not or eq ne in ni for foreach while switch");var J=/[+\-*&%=<>!?^\/\|]/;function B(M,L,K){L.tokenize=K;return K(M,L)}function F(O,M){var K=M.beforeParams;M.beforeParams=false;var L=O.next();if((L=='"'||L=="'")&&M.inParams){return B(O,M,I(L))}else{if(/[\[\]{}\(\),;\.]/.test(L)){if(L=="("&&K){M.inParams=true}else{if(L==")"){M.inParams=false}}return null}else{if(/\d/.test(L)){O.eatWhile(/[\w\.]/);return"number"}else{if(L=="#"){if(O.eat("*")){return B(O,M,C)}if(L=="#"&&O.match(/ *\[ *\[/)){return B(O,M,G)}O.skipToEnd();return"comment"}else{if(L=='"'){O.skipTo(/"/);return"comment"}else{if(L=="$"){O.eatWhile(/[$_a-z0-9A-Z\.{:]/);O.eatWhile(/}/);M.beforeParams=true;return"builtin"}else{if(J.test(L)){O.eatWhile(J);return"comment"}else{O.eatWhile(/[\w\$_{}\xa1-\uffff]/);var N=O.current().toLowerCase();if(E&&E.propertyIsEnumerable(N)){return"keyword"}if(H&&H.propertyIsEnumerable(N)){M.beforeParams=true;return"keyword"}return null}}}}}}}}function I(K){return function(P,N){var M=false,O,L=false;while((O=P.next())!=null){if(O==K&&!M){L=true;break}M=!M&&O=="\\"}if(L){N.tokenize=F}return"string"}}function C(N,L){var M=false,K;while(K=N.next()){if(K=="#"&&M){L.tokenize=F;break}M=(K=="*")}return"comment"}function G(N,L){var M=0,K;while(K=N.next()){if(K=="#"&&M==2){L.tokenize=F;break}if(K=="]"){M++}else{if(K!=" "){M=0}}}return"meta"}return{startState:function(){return{tokenize:F,beforeParams:false,inParams:false}},token:function(L,K){if(L.eatSpace()){return null}return K.tokenize(L,K)}}});A.defineMIME("text/x-tcl","tcl")});