(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(B){var A="><+-.,[]".split("");B.defineMode("brainfuck",function(){return{startState:function(){return{commentLine:false,left:0,right:0,commentLoop:false}},token:function(E,D){if(E.eatSpace()){return null}if(E.sol()){D.commentLine=false}var C=E.next().toString();if(A.indexOf(C)!==-1){if(D.commentLine===true){if(E.eol()){D.commentLine=false}return"comment"}if(C==="]"||C==="["){if(C==="["){D.left++}else{D.right++}return"bracket"}else{if(C==="+"||C==="-"){return"keyword"}else{if(C==="<"||C===">"){return"atom"}else{if(C==="."||C===","){return"def"}}}}}else{D.commentLine=true;if(E.eol()){D.commentLine=false}return"comment"}if(E.eol()){D.commentLine=false}}}});B.defineMIME("text/x-brainfuck","brainfuck")});