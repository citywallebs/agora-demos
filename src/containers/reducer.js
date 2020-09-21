export const defaultState = {
  appId: "ed945712d79b4936901d92da47e07021",
  channel: "citywall",
  token: '006ed945712d79b4936901d92da47e07021IACraikAsBw432cf1ydsyy3OL/MCmRRUjmMxgRGLQuwIVoSMqHMAAAAAEAAB6BGrC8RpXwEAAQALxGlf',
  uid: null,
  cameraId: "",
  microphoneId: "",
  resolution:'default',
  mode: "live",
  codec: "h264",
  muted: true,
};

export default (state=defaultState,action) => {
  const { type, payload={}} = action;
  switch(type){
    case 'set':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};