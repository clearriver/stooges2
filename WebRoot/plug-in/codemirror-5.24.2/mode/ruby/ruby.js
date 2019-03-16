(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("ruby",function(D){function J(P){var S={};for(var Q=0,R=P.length;Q<R;++Q){S[P[Q]]=true}return S}var G=J(["alias","and","BEGIN","begin","break","case","class","def","defined?","do","else","elsif","END","end","ensure","false","for","if","in","module","next","not","or","redo","rescue","retry","return","self","super","then","true","undef","unless","until","when","while","yield","nil","raise","throw","catch","fail","loop","callcc","caller","lambda","proc","public","protected","private","require","load","require_relative","extend","autoload","__END__","__FILE__","__LINE__","__dir__"]);var E=J(["def","class","case","for","while","until","module","then","catch","loop","proc","begin"]);var O=J(["end","until"]);var L={"[":"]","{":"}","(":")"};var C;function K(P,R,Q){Q.tokenize.push(P);return P(R,Q)}function H(V,T){if(V.sol()&&V.match("=begin")&&V.eol()){T.tokenize.push(M);return"comment"}if(V.eatSpace()){return null}var S=V.next(),W;if(S=="`"||S=="'"||S=='"'){return K(N(S,"string",S=='"'||S=="`"),V,T)}else{if(S=="/"){var Q=V.current().length;if(V.skipTo("/")){var Z=V.current().length;V.backUp(V.current().length-Q);var X=0;while(V.current().length<Z){var Y=V.next();if(Y=="("){X+=1}else{if(Y==")"){X-=1}}if(X<0){break}}V.backUp(V.current().length-Q);if(X==0){return K(N(S,"string-2",true),V,T)}}return"operator"}else{if(S=="%"){var U="string",a=true;if(V.eat("s")){U="atom"}else{if(V.eat(/[WQ]/)){U="string"}else{if(V.eat(/[r]/)){U="string-2"}else{if(V.eat(/[wxq]/)){U="string";a=false}}}}var R=V.eat(/[^\w\s=]/);if(!R){return"operator"}if(L.propertyIsEnumerable(R)){R=L[R]}return K(N(R,U,a,true),V,T)}else{if(S=="#"){V.skipToEnd();return"comment"}else{if(S=="<"&&(W=V.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))){return K(B(W[1]),V,T)}else{if(S=="0"){if(V.eat("x")){V.eatWhile(/[\da-fA-F]/)}else{if(V.eat("b")){V.eatWhile(/[01]/)}else{V.eatWhile(/[0-7]/)}}return"number"}else{if(/\d/.test(S)){V.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/);return"number"}else{if(S=="?"){while(V.match(/^\\[CM]-/)){}if(V.eat("\\")){V.eatWhile(/\w/)}else{V.next()}return"string"}else{if(S==":"){if(V.eat("'")){return K(N("'","atom",false),V,T)}if(V.eat('"')){return K(N('"',"atom",true),V,T)}if(V.eat(/[\<\>]/)){V.eat(/[\<\>]/);return"atom"}if(V.eat(/[\+\-\*\/\&\|\:\!]/)){return"atom"}if(V.eat(/[a-zA-Z$@_\xa1-\uffff]/)){V.eatWhile(/[\w$\xa1-\uffff]/);V.eat(/[\?\!\=]/);return"atom"}return"operator"}else{if(S=="@"&&V.match(/^@?[a-zA-Z_\xa1-\uffff]/)){V.eat("@");V.eatWhile(/[\w\xa1-\uffff]/);return"variable-2"}else{if(S=="$"){if(V.eat(/[a-zA-Z_]/)){V.eatWhile(/[\w]/)}else{if(V.eat(/\d/)){V.eat(/\d/)}else{V.next()}}return"variable-3"}else{if(/[a-zA-Z_\xa1-\uffff]/.test(S)){V.eatWhile(/[\w\xa1-\uffff]/);V.eat(/[\?\!]/);if(V.eat(":")){return"atom"}return"ident"}else{if(S=="|"&&(T.varList||T.lastTok=="{"||T.lastTok=="do")){C="|";return null}else{if(/[\(\)\[\]{}\\;]/.test(S)){C=S;return null}else{if(S=="-"&&V.eat(">")){return"arrow"}else{if(/[=+\-\/*:\.^%<>~|]/.test(S)){var P=V.eatWhile(/[=+\-\/*:\.^%<>~|]/);if(S=="."&&!P){C="."}return"operator"}else{return null}}}}}}}}}}}}}}}}}function I(P){if(!P){P=1}return function(R,Q){if(R.peek()=="}"){if(P==1){Q.tokenize.pop();return Q.tokenize[Q.tokenize.length-1](R,Q)}else{Q.tokenize[Q.tokenize.length-1]=I(P-1)}}else{if(R.peek()=="{"){Q.tokenize[Q.tokenize.length-1]=I(P+1)}}return H(R,Q)}}function F(){var P=false;return function(R,Q){if(P){Q.tokenize.pop();return Q.tokenize[Q.tokenize.length-1](R,Q)}P=true;return H(R,Q)}}function N(P,Q,S,R){return function(W,V){var T=false,U;if(V.context.type==="read-quoted-paused"){V.context=V.context.prev;W.eat("}")}while((U=W.next())!=null){if(U==P&&(R||!T)){V.tokenize.pop();break}if(S&&U=="#"&&!T){if(W.eat("{")){if(P=="}"){V.context={prev:V.context,type:"read-quoted-paused"}}V.tokenize.push(I());break}else{if(/[@\$]/.test(W.peek())){V.tokenize.push(F());break}}}T=!T&&U=="\\"}return Q}}function B(P){return function(R,Q){if(R.match(P)){Q.tokenize.pop()}else{R.skipToEnd()}return"string"}}function M(Q,P){if(Q.sol()&&Q.match("=end")&&Q.eol()){P.tokenize.pop()}Q.skipToEnd();return"comment"}return{startState:function(){return{tokenize:[H],indented:0,context:{type:"top",indented:-D.indentUnit},continuedLine:false,lastTok:null,varList:false}},token:function(U,S){C=null;if(U.sol()){S.indented=U.indentation()}var Q=S.tokenize[S.tokenize.length-1](U,S),T;var P=C;if(Q=="ident"){var R=U.current();Q=S.lastTok=="."?"property":G.propertyIsEnumerable(U.current())?"keyword":/^[A-Z]/.test(R)?"tag":(S.lastTok=="def"||S.lastTok=="class"||S.varList)?"def":"variable";if(Q=="keyword"){P=R;if(E.propertyIsEnumerable(R)){T="indent"}else{if(O.propertyIsEnumerable(R)){T="dedent"}else{if((R=="if"||R=="unless")&&U.column()==U.indentation()){T="indent"}else{if(R=="do"&&S.context.indented<S.indented){T="indent"}}}}}}if(C||(Q&&Q!="comment")){S.lastTok=P}if(C=="|"){S.varList=!S.varList}if(T=="indent"||/[\(\[\{]/.test(C)){S.context={prev:S.context,type:C||Q,indented:S.indented}}else{if((T=="dedent"||/[\)\]\}]/.test(C))&&S.context.prev){S.context=S.context.prev}}if(U.eol()){S.continuedLine=(C=="\\"||Q=="operator")}return Q},indent:function(T,Q){if(T.tokenize[T.tokenize.length-1]!=H){return 0}var S=Q&&Q.charAt(0);var R=T.context;var P=R.type==L[S]||R.type=="keyword"&&/^(?:end|until|else|elsif|when|rescue)\b/.test(Q);return R.indented+(P?0:D.indentUnit)+(T.continuedLine?D.indentUnit:0)},electricInput:/^\s*(?:end|rescue|elsif|else|\})$/,lineComment:"#"}});A.defineMIME("text/x-ruby","ruby")});