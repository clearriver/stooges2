(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(F){var E=["Dangerous comment"];var B=[["Expected '{'","Statement body should be inside '{ }' braces."]];var G=["Missing semicolon","Extra comma","Missing property name","Unmatched "," and instead saw"," is not defined","Unclosed string","Stopping, unable to continue"];function H(M,L){if(!window.JSHINT){return[]}JSHINT(M,L,L.globals);var J=JSHINT.data().errors,K=[];if(J){C(J,K)}return K}F.registerHelper("lint","javascript",H);function D(J){I(J,B,"warning",true);I(J,G,"error");return A(J)?null:J}function I(M,N,K,L){var S,O,P,J,Q;S=M.description;for(var R=0;R<N.length;R++){O=N[R];P=(typeof O==="string"?O:O[0]);J=(typeof O==="string"?null:O[1]);Q=S.indexOf(P)!==-1;if(L||Q){M.severity=K}if(Q&&J){M.description=J}}}function A(L){var K=L.description;for(var J=0;J<E.length;J++){if(K.indexOf(E[J])!==-1){return true}}return false}function C(S,O){for(var P=0;P<S.length;P++){var M=S[P];if(M){var T,L;T=[];if(M.evidence){var J=T[M.line];if(!J){var Q=M.evidence;J=[];Array.prototype.forEach.call(Q,function(U,V){if(U==="\t"){J.push(V+1)}});T[M.line]=J}if(J.length>0){var R=M.character;J.forEach(function(U){if(R>U){R-=1}});M.character=R}}var K=M.character-1,N=K+1;if(M.evidence){L=M.evidence.substring(K).search(/.\b/);if(L>-1){N+=L}}M.description=M.reason;M.start=M.character;M.end=N;M=D(M);if(M){O.push({message:M.description,severity:M.severity,from:F.Pos(M.line-1,K),to:F.Pos(M.line-1,N)})}}}}});