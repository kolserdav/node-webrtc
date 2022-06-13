'use strict';

function RTCIceCandidate(candidateInitDict) {
  [
    'candidate',
    'sdpMid',
    'sdpMLineIndex',
    'foundation',
    'component',
    'priority',
    'address',
    'protocol',
    'port',
    'type',
    'tcpType',
    'relatedAddress',
    'relatedPort',
    'usernameFragment',
  ].forEach((property) => {
    this[property] = candidateInitDict[property];
  });
}

module.exports = RTCIceCandidate;
