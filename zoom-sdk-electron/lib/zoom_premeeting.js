const { ZoomSDKError } = require('./settings.js');

var ZoomPreMeeting = (function () {
  var instance;
  /**
   * mode: Zoom SDK ZoomPreMeeting Service Init
   * @param {Object} addon zoom sdk module
   * @return {ZoomPreMeeting}
   */
  function init(opts) { 
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetPremeetingObj() || null;

    function onScheduleOrEditMeeting(result, meetingUniqueID) {
    }

    function onListMeeting(result, meetingList) {
    }

    function onDeleteMeeting(result) {
    }

    if (_addon) {
      _addon.SetOnScheduleOrEditMeetingCB(onScheduleOrEditMeeting);
      _addon.SetOnListMeetingCB(onListMeeting);
      _addon.SetOnDeleteMeetingCB(onDeleteMeeting);
    }

    return {
      /**
      * mode: Schedule Meeting With WndParams
      * @param {String} hSelfWnd SelfWnd (win platform require hexadecimal, mac platform means height)
      * @param {String} hParent parent window handle (win platform require hexadecimal, mac platform means width)
      * @param {String} left chat window left pos
      * @param {String} top chat window top pos
      * @return {ZoomSDKError}
      */
      ScheduleMeetingWithWndParams: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let hSelfWnd = clientOpts.hSelfWnd || '0';
          let hParent = clientOpts.hParent || '0';
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          return _addon.ScheduleMeetingWithWndParams(hSelfWnd, hParent, left, top);
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * mode: Schedule Meeting
      * @return {ZoomSDKError}
      */
      ScheduleMeeting: function (opts) {
        if (_addon) {
          return _addon.ScheduleMeeting();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * mode: Edit Meeting
      * @param {Number} meetingUniqueID
      * @return {ZoomSDKError}
      */
      EditMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meetingUniqueID = clientOpts.meetingUniqueID;
          return _addon.EditMeeting(Number(meetingUniqueID));
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * mode: Edit Meeting
      * @return {ZoomSDKError}
      */
      ListMeeting: function (opts) {
        if (_addon) {
          return _addon.ListMeeting();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * mode: Edit Meeting
      * @param {Number} meetingUniqueID
      * @return {ZoomSDKError}
      */
      DeleteMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meetingUniqueID = clientOpts.meetingUniqueID;
          return _addon.DeleteMeeting(Number(meetingUniqueID));
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * mode: Edit Meeting With Wnd Params
      * @param {String} hSelfWnd (win platform require hexadecimal, mac platform means height)
      * @param {String} hParent (win platform require hexadecimal, mac platform means width)
      * @param {String} left Float Video left pos
      * @param {String} top Float Video pos
      * @param {Number} meetingUniqueID
      * @return {ZoomSDKError}
      */
      EditMeetingWithWndParams: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let hSelfWnd = clientOpts.hSelfWnd || '0';
          let hParent = clientOpts.hParent || '0';
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          let meetingUniqueID = clientOpts.meetingUniqueID;
          return _addon.EditMeetingWithWndParams(hSelfWnd, hParent, left, top, Number(meetingUniqueID));
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      }
    };
  };
  return {
    /**
     * mode: Get Zoom SDK ZoomPreMeeting Service Module
     * @return {ZoomPreMeeting}
    */
    getInstance: function (opts) {
      if (!instance) {
        instance = init(opts);
      }
      return instance;
    }
  };
})();

module.exports = {
  ZoomPreMeeting: ZoomPreMeeting
}