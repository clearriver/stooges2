(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(F){function H(b,a,W,Z,Y,X){this.indented=b;this.column=a;this.type=W;this.info=Z;this.align=Y;this.prev=X}function I(a,Y,W,Z){var X=a.indented;if(a.context&&a.context.type=="statement"&&W!="statement"){X=a.context.indented}return a.context=new H(X,Y,W,Z,null,a.context)}function Q(X){var W=X.context.type;if(W==")"||W=="]"||W=="}"){X.indented=X.context.indented}return X.context=X.context.prev}function C(Y,X,W){if(X.prevToken=="variable"||X.prevToken=="variable-3"){return true}if(/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(Y.string.slice(0,W))){return true}if(X.typeAtEndOfLine&&Y.column()==Y.indentation()){return true}}function O(W){for(;;){if(!W||W.type=="top"){return true}if(W.type=="}"&&W.prev.info!="namespace"){return false}W=W.prev}}F.defineMode("clike",function(s,Z){var o=s.indentUnit,X=Z.statementIndentUnit||o,u=Z.dontAlignCalls,W=Z.keywords||{},d=Z.types||{},f=Z.builtin||{},r=Z.blockKeywords||{},p=Z.defKeywords||{},j=Z.atoms||{},l=Z.hooks||{},a=Z.multiLineStrings,Y=Z.indentStatements!==false,n=Z.indentSwitch!==false,g=Z.namespaceSeparator,i=Z.isPunctuationChar||/[\[\]{}\(\),;\:\.]/,b=Z.numberStart||/[\d\.]/,h=Z.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,m=Z.isOperatorChar||/[+\-*&%=<>!?|\/]/;var k,c;function e(Aa,z){var y=Aa.next();if(l[y]){var x=l[y](Aa,z);if(x!==false){return x}}if(y=='"'||y=="'"){z.tokenize=v(y);return z.tokenize(Aa,z)}if(i.test(y)){k=y;return null}if(b.test(y)){Aa.backUp(1);if(Aa.match(h)){return"number"}Aa.next()}if(y=="/"){if(Aa.eat("*")){z.tokenize=t;return t(Aa,z)}if(Aa.eat("/")){Aa.skipToEnd();return"comment"}}if(m.test(y)){while(!Aa.match(/^\/[\/*]/,false)&&Aa.eat(m)){}return"operator"}Aa.eatWhile(/[\w\$_\xa1-\uffff]/);if(g){while(Aa.match(g)){Aa.eatWhile(/[\w\$_\xa1-\uffff]/)}}var w=Aa.current();if(R(W,w)){if(R(r,w)){k="newstatement"}if(R(p,w)){c=true}return"keyword"}if(R(d,w)){return"variable-3"}if(R(f,w)){if(R(r,w)){k="newstatement"}return"builtin"}if(R(j,w)){return"atom"}return"variable"}function v(w){return function(Ab,z){var y=false,Aa,x=false;while((Aa=Ab.next())!=null){if(Aa==w&&!y){x=true;break}y=!y&&Aa=="\\"}if(x||!(y||a)){z.tokenize=null}return"string"}}function t(z,x){var y=false,w;while(w=z.next()){if(w=="/"&&y){x.tokenize=null;break}y=(w=="*")}return"comment"}function q(x,w){if(Z.typeFirstDefinitions&&x.eol()&&O(w.context)){w.typeAtEndOfLine=C(x,w,x.pos)}}return{startState:function(w){return{tokenize:null,context:new H((w||0)-o,0,"top",null,false),indented:0,startOfLine:true,prevToken:null}},token:function(Aa,y){var z=y.context;if(Aa.sol()){if(z.align==null){z.align=false}y.indented=Aa.indentation();y.startOfLine=true}if(Aa.eatSpace()){q(Aa,y);return null}k=c=null;var x=(y.tokenize||e)(Aa,y);if(x=="comment"||x=="meta"){return x}if(z.align==null){z.align=true}if(k==";"||k==":"||(k==","&&Aa.match(/^\s*(?:\/\/.*)?$/,false))){while(y.context.type=="statement"){Q(y)}}else{if(k=="{"){I(y,Aa.column(),"}")}else{if(k=="["){I(y,Aa.column(),"]")}else{if(k=="("){I(y,Aa.column(),")")}else{if(k=="}"){while(z.type=="statement"){z=Q(y)}if(z.type=="}"){z=Q(y)}while(z.type=="statement"){z=Q(y)}}else{if(k==z.type){Q(y)}else{if(Y&&(((z.type=="}"||z.type=="top")&&k!=";")||(z.type=="statement"&&k=="newstatement"))){I(y,Aa.column(),"statement",Aa.current())}}}}}}}if(x=="variable"&&((y.prevToken=="def"||(Z.typeFirstDefinitions&&C(Aa,y,Aa.start)&&O(y.context)&&Aa.match(/^\s*\(/,false))))){x="def"}if(l.token){var w=l.token(Aa,y,x);if(w!==undefined){x=w}}if(x=="def"&&Z.styleDefs===false){x="variable"}y.startOfLine=false;y.prevToken=c?"def":x||k;q(Aa,y);return x},indent:function(Ac,x){if(Ac.tokenize!=e&&Ac.tokenize!=null||Ac.typeAtEndOfLine){return F.Pass}var Ab=Ac.context,y=x&&x.charAt(0);if(Ab.type=="statement"&&y=="}"){Ab=Ab.prev}if(Z.dontIndentStatements){while(Ab.type=="statement"&&Z.dontIndentStatements.test(Ab.info)){Ab=Ab.prev}}if(l.indent){var Aa=l.indent(Ac,Ab,x);if(typeof Aa=="number"){return Aa}}var w=y==Ab.type;var z=Ab.prev&&Ab.prev.info=="switch";if(Z.allmanIndentation&&/[{(]/.test(y)){while(Ab.type!="top"&&Ab.type!="}"){Ab=Ab.prev}return Ab.indented}if(Ab.type=="statement"){return Ab.indented+(y=="{"?0:X)}if(Ab.align&&(!u||Ab.type!=")")){return Ab.column+(w?0:1)}if(Ab.type==")"&&!w){return Ab.indented+X}return Ab.indented+(w?0:o)+(!w&&z&&!/^(?:case|default)\b/.test(x)?o:0)},electricInput:n?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/,blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});function A(Z){var Y={},W=Z.split(" ");for(var X=0;X<W.length;++X){Y[W[X]]=true}return Y}function R(W,X){if(typeof W==="function"){return W(X)}else{return W.propertyIsEnumerable(X)}}var G="auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile";var B="int long char short double float unsigned signed void size_t ptrdiff_t";function V(Z,Y){if(!Y.startOfLine){return false}for(var X,W=null;X=Z.peek();){if(X=="\\"&&Z.match(/^.$/)){W=V;break}else{if(X=="/"&&Z.match(/^\/[\/\*]/,false)){break}}Z.next()}Y.tokenize=W;return"meta"}function J(W,X){if(X.prevToken=="variable-3"){return"variable-3"}return false}function M(W){W.eatWhile(/[\w\.']/);return"number"}function U(Y,X){Y.backUp(1);if(Y.match(/(R|u8R|uR|UR|LR)/)){var W=Y.match(/"([^\s\\()]{0,16})\(/);if(!W){return false}X.cpp11RawStringDelim=W[1];X.tokenize=P;return P(Y,X)}if(Y.match(/(u8|u|U|L)/)){if(Y.match(/["']/,false)){return"string"}return false}Y.next();return false}function D(X){var W=/(\w+)::(\w+)$/.exec(X);return W&&W[1]==W[2]}function E(Y,X){var W;while((W=Y.next())!=null){if(W=='"'&&!Y.eat('"')){X.tokenize=null;break}}return"string"}function P(Z,X){var Y=X.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&");var W=Z.match(new RegExp(".*?\\)"+Y+'"'));if(W){X.tokenize=null}else{Z.skipToEnd()}return"string"}function L(Y,Z){if(typeof Y=="string"){Y=[Y]}var W=[];function a(b){if(b){for(var c in b){if(b.hasOwnProperty(c)){W.push(c)}}}}a(Z.keywords);a(Z.types);a(Z.builtin);a(Z.atoms);if(W.length){Z.helperType=Y[0];F.registerHelper("hintWords",Y[0],W)}for(var X=0;X<Y.length;++X){F.defineMIME(Y[X],Z)}}L(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:A(G),types:A(B+" bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),blockKeywords:A("case do else for if switch while struct"),defKeywords:A("struct"),typeFirstDefinitions:true,atoms:A("null true false"),hooks:{"#":V,"*":J},modeProps:{fold:["brace","include"]}});L(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:A(G+" asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),types:A(B+" bool wchar_t"),blockKeywords:A("catch class do else finally for if struct switch try while"),defKeywords:A("class namespace struct enum union"),typeFirstDefinitions:true,atoms:A("true false null"),dontIndentStatements:/^template$/,hooks:{"#":V,"*":J,"u":U,"U":U,"L":U,"R":U,"0":M,"1":M,"2":M,"3":M,"4":M,"5":M,"6":M,"7":M,"8":M,"9":M,token:function(Y,X,W){if(W=="variable"&&Y.peek()=="("&&(X.prevToken==";"||X.prevToken==null||X.prevToken=="}")&&D(Y.current())){return"def"}}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}});L("text/x-java",{name:"clike",keywords:A("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),types:A("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),blockKeywords:A("catch class do else finally for if switch try while"),defKeywords:A("class interface package enum @interface"),typeFirstDefinitions:true,atoms:A("true false null"),number:/^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,hooks:{"@":function(W){if(W.match("interface",false)){return false}W.eatWhile(/[\w\$_]/);return"meta"}},modeProps:{fold:["brace","import"]}});L("text/x-csharp",{name:"clike",keywords:A("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),types:A("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:A("catch class do else finally for foreach if struct switch try while"),defKeywords:A("class interface namespace struct var"),typeFirstDefinitions:true,atoms:A("true false null"),hooks:{"@":function(X,W){if(X.eat('"')){W.tokenize=E;return E(X,W)}X.eatWhile(/[\w\$_]/);return"meta"}}});function N(Y,X){var W=false;while(!Y.eol()){if(!W&&Y.match('"""')){X.tokenize=null;break}W=Y.next()=="\\"&&!W}return"string"}L("text/x-scala",{name:"clike",keywords:A("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),types:A("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),multiLineStrings:true,blockKeywords:A("catch class do else finally for forSome if match switch try while"),defKeywords:A("class def object package trait type val var"),atoms:A("true false null"),indentStatements:false,indentSwitch:false,isOperatorChar:/[+\-*&%=<>!?|\/#:@]/,hooks:{"@":function(W){W.eatWhile(/[\w\$_]/);return"meta"},'"':function(X,W){if(!X.match('""')){return false}W.tokenize=N;return W.tokenize(X,W)},"'":function(W){W.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},"=":function(Y,W){var X=W.context;if(X.type=="}"&&X.align&&Y.eat(">")){W.context=new H(X.indented,X.column,X.type,X.info,null,X.prev);return"operator"}else{return false}}},modeProps:{closeBrackets:{triples:'"'}}});function T(W){return function(b,Z){var Y=false,a,X=false;while(!b.eol()){if(!W&&!Y&&b.match('"')){X=true;break}if(W&&b.match('"""')){X=true;break}a=b.next();if(!Y&&a=="$"&&b.match("{")){b.skipTo("}")}Y=!Y&&a=="\\"&&!W}if(X||!W){Z.tokenize=null}return"string"}}L("text/x-kotlin",{name:"clike",keywords:A("package as typealias class interface this super val var fun for is in This throw return break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix"),types:A("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),intendSwitch:false,indentStatements:false,multiLineStrings:true,blockKeywords:A("catch class do else finally for if where try while enum"),defKeywords:A("class val var object package interface fun"),atoms:A("true false null this"),hooks:{'"':function(X,W){W.tokenize=T(X.match('""'));return W.tokenize(X,W)}},modeProps:{closeBrackets:{triples:'"'}}});L(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:A("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),types:A("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),blockKeywords:A("for while do if else struct"),builtin:A("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),atoms:A("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),indentSwitch:false,hooks:{"#":V},modeProps:{fold:["brace","include"]}});L("text/x-nesc",{name:"clike",keywords:A(G+"as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),types:A(B),blockKeywords:A("case do else for if switch while struct"),atoms:A("null true false"),hooks:{"#":V},modeProps:{fold:["brace","include"]}});L("text/x-objectivec",{name:"clike",keywords:A(G+"inline restrict _Bool _Complex _Imaginary BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),types:A(B),atoms:A("YES NO NULL NILL ON OFF true false"),hooks:{"@":function(W){W.eatWhile(/[\w\$]/);return"keyword"},"#":V,indent:function(X,Y,W){if(Y.type=="statement"&&/^@\w/.test(W)){return Y.indented}}},modeProps:{fold:"brace"}});L("text/x-squirrel",{name:"clike",keywords:A("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),types:A(B),blockKeywords:A("case catch class else for foreach if switch try while"),defKeywords:A("function local class"),typeFirstDefinitions:true,atoms:A("true false null"),hooks:{"#":V},modeProps:{fold:["brace","include"]}});var K=null;function S(W){return function(b,Z){var Y=false,a,X=false;while(!b.eol()){if(!Y&&b.match('"')&&(W=="single"||b.match('""'))){X=true;break}if(!Y&&b.match("``")){K=S(W);X=true;break}a=b.next();Y=W=="single"&&!Y&&a=="\\"}if(X){Z.tokenize=null}return"string"}}L("text/x-ceylon",{name:"clike",keywords:A("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),types:function(X){var W=X.charAt(0);return(W===W.toUpperCase()&&W!==W.toLowerCase())},blockKeywords:A("case catch class dynamic else finally for function if interface module new object switch try while"),defKeywords:A("class dynamic function interface module object package value"),builtin:A("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),isPunctuationChar:/[\[\]{}\(\),;\:\.`]/,isOperatorChar:/[+\-*&%=<>!?|^~:\/]/,numberStart:/[\d#$]/,number:/^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,multiLineStrings:true,typeFirstDefinitions:true,atoms:A("true false null larger smaller equal empty finished"),indentSwitch:false,styleDefs:false,hooks:{"@":function(W){W.eatWhile(/[\w\$_]/);return"meta"},'"':function(X,W){W.tokenize=S(X.match('""')?"triple":"single");return W.tokenize(X,W)},"`":function(X,W){if(!K||!X.match("`")){return false}W.tokenize=K;K=null;return W.tokenize(X,W)},"'":function(W){W.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},token:function(X,Y,W){if((W=="variable"||W=="variable-3")&&Y.prevToken=="."){return"variable-2"}}},modeProps:{fold:["brace","import"],closeBrackets:{triples:'"'}}})});