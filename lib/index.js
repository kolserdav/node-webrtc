'use strict';

const { inherits } = require('util');

const {
  MediaStream,
  MediaStreamTrack,
  RTCAudioSink,
  RTCAudioSource,
  RTCDataChannel,
  RTCDtlsTransport,
  RTCIceTransport,
  RTCRtpReceiver,
  RTCRtpSender,
  RTCRtpTransceiver,
  RTCSctpTransport,
  RTCVideoSink,
  RTCVideoSource,
  getUserMedia,
  i420ToRgba,
  rgbaToI420,
  setDOMException,
} = require('./binding');

const EventTarget = require('./eventtarget');
const MediaDevices = require('./mediadevices');

inherits(MediaStream, EventTarget);
inherits(MediaStreamTrack, EventTarget);
inherits(RTCAudioSink, EventTarget);
inherits(RTCDataChannel, EventTarget);
inherits(RTCDtlsTransport, EventTarget);
inherits(RTCIceTransport, EventTarget);
inherits(RTCSctpTransport, EventTarget);
inherits(RTCVideoSink, EventTarget);

try {
  setDOMException(require('domexception'));
} catch (error) {
  // Do nothing
}

// NOTE(mroberts): Here's a hack to support jsdom's Blob implementation.
RTCDataChannel.prototype.send = function send(data) {
  const implSymbol = Object.getOwnPropertySymbols(data).find(
    (symbol) => symbol.toString() === 'Symbol(impl)'
  );
  if (data[implSymbol] && data[implSymbol]._buffer) {
    data = data[implSymbol]._buffer;
  }
  this._send(data);
};

const mediaDevices = new MediaDevices();

const nonstandard = {
  i420ToRgba,
  RTCAudioSink,
  RTCAudioSource,
  RTCVideoSink,
  RTCVideoSource,
  rgbaToI420,
};

module.exports = {
  /**
   * @type {MediaStream}
   */
  MediaStream,
  /**
   * @type {MediaStreamTrack}
   */
  MediaStreamTrack,
  /**
   * @type {RTCDataChannel}
   */
  RTCDataChannel,
  /**
   * @type {RTCDataChannelEvent}
   */
  RTCDataChannelEvent: require('./datachannelevent'),
  /**
   * @type {RTCDtlsTransport}
   */
  RTCDtlsTransport,
  /**
   * @type {typeof RTCIceCandidate}
   */
  RTCIceCandidate: require('./icecandidate'),
  /**
   * @type {RTCIceTransport}
   */
  RTCIceTransport,
  /**
   * @type {typeof RTCPeerConnection}
   */
  RTCPeerConnection: require('./peerconnection'),
  /**
   * @type {RTCPeerConnectionIceEvent}
   */
  RTCPeerConnectionIceEvent: require('./rtcpeerconnectioniceevent'),
  /**
   * @type {RTCRtpReceiver}
   */
  RTCRtpReceiver,
  /**
   * @type {RTCRtpSender}
   */
  RTCRtpSender,
  /**
   * @type {RTCRtpTransceiver}
   */
  RTCRtpTransceiver,
  /**
   * @type {RTCSctpTransport}
   */
  RTCSctpTransport,
  /**
   * @type {typeof RTCSessionDescription}
   */
  RTCSessionDescription: require('./sessiondescription'),
  /**
   * @type {typeof Navigator.getUserMedia}
   */
  getUserMedia,
  /**
   * @type {typeof Navigator.mediaDevices}
   */
  mediaDevices,
  /**
   * @type {Navigator.nonstandard}
   */
  nonstandard,
};
