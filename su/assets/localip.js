define([],function(){function n(n){function e(e){var t=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/,c=t.exec(e)[1];void 0===i[c]&&(clearTimeout(o),n(c)),i[c]=!0}var o=setTimeout(function(){n(null)},300),i={},t=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,c=!!window.webkitRTCPeerConnection;if(!t){var r=iframe.contentWindow;t=r.RTCPeerConnection||r.mozRTCPeerConnection||r.webkitRTCPeerConnection,c=!!r.webkitRTCPeerConnection}var a={optional:[{RtpDataChannels:!0}]},u={iceServers:[{urls:"stun:dummysrv.dummyserver.com.nowhere"}]},f=new t(u,a);f.onicecandidate=function(n){n.candidate&&e(n.candidate.candidate)},f.createDataChannel(""),f.createOffer(function(n){f.setLocalDescription(n,function(){},function(){})},function(){})}function e(){return new Promise(function(e,o){n(function(n){n?e&&(e(n),e=null):o("Timeout")})})}return{promiseLocalIp:e}});