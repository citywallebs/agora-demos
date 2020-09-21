import enhanceAgoraRTC from "agoran-awe";

// eslint-disable-next-line
const { AgoraRTC } = window;

// promisify class Client & Stream
const enhancedAgoraRTC = enhanceAgoraRTC(AgoraRTC)

export default enhancedAgoraRTC