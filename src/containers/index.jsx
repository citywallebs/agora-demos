import React, { useState,useReducer } from 'react'
import { Space,notification } from 'antd';
import StreamPlayer from '../components/StreamPlayer';
// import  StreamPlayer from 'agora-stream-player'
import BasicSettings from './BasicSettings';
import AdvancedSettings from './AdvancedSettings';
import styles from './root.module.scss';
import { useMediaStream,useCamera,useMicrophone } from '../hooks';
import reducer,{ defaultState } from './reducer';

const { AgoraRTC } = window;

AgoraRTC.Logger.setLogLevel(2)

export default ()=>{
  const [isJoined, setisJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ state, dispatch ] = useReducer(reducer,defaultState);
  const [ client, setClient ] = useState();
  const [ localStream,remoteStreamList=[] ] = useMediaStream(client);

  const [ cameraList=[] ] = useCamera();
  const [ microphoneList=[] ] = useMicrophone();

  /**
   * Form
   */
  const onFieldsChange = ([field]) => {
    if(!field){
      return;
    }

    const { name=[],value='' } = field;
    const [key]=name;
    dispatch({
      type:'set',
      payload:{
        [key]:value
      }
    })
  };

  /**
   * Actions
   */
  // Starts the video call
  const join = async () => {
    // Creates a new agora client with given parameters.
    // mode can be 'rtc' for real time communications or 'live' for live broadcasting.
    const agoraClient = AgoraRTC.createClient({ mode: state.mode, codec: state.codec })
    // Loads client into the state
    setClient(agoraClient)

    setIsLoading(true);
    try {
      const uid = isNaN(Number(state.uid)) ? null : Number(state.uid);
      
      // initializes the client with appId
      await agoraClient.init(state.appId);

      const nextUID = await (()=>{
        return new Promise((resolve)=>{
          agoraClient.join(state.token, state.channel, uid,(newUid)=>{
            resolve(newUid);
          });
        })
      })();
      
      

      // create a ne stream
      const stream = AgoraRTC.createStream({
        streamID:nextUID || uid || 12345,
        video: true,
        audio: false,
        screen: false,
        microphoneId: state.microphoneId,
        cameraId: state.cameraId
      });

      // stream.setVideoProfile('480p_4')

      // Initalize the stream
      stream.init(async ()=>{

        // Publish the stream to the channel.
        await agoraClient.publish(stream);
  

        // Set the state appropriately
        setIsPublished(true);
        setisJoined(true);
        notification.success({
          message:'Success',
          description: `Joined channel ${state.channel}`
        })
      });
      
    } catch (err) {
      notification.error({
        message:'Error',
        description: `Failed to join, ${err}`
      })
    } finally {
      setIsLoading(false);
    }
  };

  // Publish function to publish the stream to Agora. No need to invoke this after join.
  // This is to be invoke only after an unpublish
  const publish = async () => {
    setIsLoading(true);
    try {
      console.log('publish',localStream)
      if (localStream) {
        // Publish the stream to the channel.
        await client.publish(localStream);
        setIsPublished(true);
      }
      // enqueueSnackbar("Stream published", { variant: "info" });
    } catch (err) {
      // enqueueSnackbar(`Failed to publish, ${err}`, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Leaves the channel on invoking the function call.
  const leave = async () => {
    setIsLoading(true);
    try {
      if (localStream) {
        // Closes the local stream. This de-allocates the resources and turns off the camera light
        localStream.close();
        // unpublish the stream from the client
        client.unpublish(localStream);
      }
      // leave the channel
      await client.leave();
      setIsPublished(false);
      setisJoined(false);
      // enqueueSnackbar("Left channel", { variant: "info" });
    } catch (err) {
      // enqueueSnackbar(`Failed to leave, ${err}`, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Used to unpublish the stream.
  const unpublish = () => {
    if (localStream) {
      // unpublish the stream from the client
      client.unpublish(localStream);
      setIsPublished(false);
      // enqueueSnackbar("Stream unpublished", { variant: "info" });
    }
  };

  return (
    <>
      <Space 
        direction="vertical" 
        size="middle"
        className={styles.space}
      >
        <BasicSettings 
          onJoin={join}
          onLeave={leave}
          onPublish={publish}
          onUnPublish={unpublish}
          state={state}
          onFieldsChange={onFieldsChange}

          isLoading={isLoading}
          isJoined={isJoined}
          isPublished={isPublished}
        />
        <AdvancedSettings
          state={state}
          onFieldsChange={onFieldsChange}
          dispatch={dispatch}
          cameraList={cameraList}
          microphoneList={microphoneList}
        />
      </Space>

      <div className={styles.mediaList}>
        {
          localStream && (
            <StreamPlayer stream={localStream} fit="contain" label="local" muted={state.muted}/>
          )
        }
        {
          remoteStreamList.map((stream)=>{
            return (
              <StreamPlayer 
                key={stream.getId()}
                stream={stream} 
                fit="contain" 
                label="remote" 
                muted={state.muted}
              />
            )
          })
        }
      </div>
    </>
  )
}