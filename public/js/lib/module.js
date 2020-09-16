(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.text = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let extra = require('./extra')

exports.obtainingArt = function(){
    console.log('Upload any art you wish')
    extra.extra1()
}
},{"./extra":2}],2:[function(require,module,exports){
exports.extra1 = function(){
    console.log("This is a space for expression")
}
},{}],3:[function(require,module,exports){
let art = require('./art')

exports.provideText = function(){
    console.log('Art pieces will have description')
    art.obtainingArt()
}
},{"./art":1}]},{},[3])(3)
});
