(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"),require("../../addon/mode/multiplex"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../../addon/mode/multiplex"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("twig:inner",function(){var F=["and","as","autoescape","endautoescape","block","do","endblock","else","elseif","extends","for","endfor","embed","endembed","filter","endfilter","flush","from","if","endif","in","is","include","import","not","or","set","spaceless","endspaceless","with","endwith","trans","endtrans","blocktrans","endblocktrans","macro","endmacro","use","verbatim","endverbatim"],G=/^[+\-*&%=<>!?|~^]/,C=/^[:\[\(\{]/,E=["true","false","null","empty","defined","divisibleby","divisible by","even","odd","iterable","sameas","same as"],D=/^(\d[+\-\*\/])?\d+(\.\d+)?/;F=new RegExp("(("+F.join(")|(")+"))\\b");E=new RegExp("(("+E.join(")|(")+"))\\b");function B(J,I){var H=J.peek();if(I.incomment){if(!J.skipTo("#}")){J.skipToEnd()}else{J.eatWhile(/\#|}/);I.incomment=false}return"comment"}else{if(I.intag){if(I.operator){I.operator=false;if(J.match(E)){return"atom"}if(J.match(D)){return"number"}}if(I.sign){I.sign=false;if(J.match(E)){return"atom"}if(J.match(D)){return"number"}}if(I.instring){if(H==I.instring){I.instring=false}J.next();return"string"}else{if(H=="'"||H=='"'){I.instring=H;J.next();return"string"}else{if(J.match(I.intag+"}")||J.eat("-")&&J.match(I.intag+"}")){I.intag=false;return"tag"}else{if(J.match(G)){I.operator=true;return"operator"}else{if(J.match(C)){I.sign=true}else{if(J.eat(" ")||J.sol()){if(J.match(F)){return"keyword"}if(J.match(E)){return"atom"}if(J.match(D)){return"number"}if(J.sol()){J.next()}}else{J.next()}}}}}}return"variable"}else{if(J.eat("{")){if(H=J.eat("#")){I.incomment=true;if(!J.skipTo("#}")){J.skipToEnd()}else{J.eatWhile(/\#|}/);I.incomment=false}return"comment"}else{if(H=J.eat(/\{|%/)){I.intag=H;if(H=="{"){I.intag="}"}J.eat("-");return"tag"}}}}}J.next()}return{startState:function(){return{}},token:function(I,H){return B(I,H)}}});A.defineMode("twig",function(C,B){var D=A.getMode(C,"twig:inner");if(!B||!B.base){return D}return A.multiplexingMode(A.getMode(C,B.base),{open:/\{[{#%]/,close:/[}#%]\}/,mode:D,parseDelimiters:true})});A.defineMIME("text/x-twig","twig")});