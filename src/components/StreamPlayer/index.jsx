/* eslint-disable react/no-typos */
import React,{ useEffect } from 'react';
import  StreamPlayer from 'agora-stream-player'

export default (props)=>{
  const { muted,...restProps } = props;

  useEffect(()=>{
    const { stream } = props;
    if(!stream){
      return;
    }
    const id = stream.getId();
    const vel = document.querySelector(`#video${id}`);
    const ael = document.querySelector(`#audio${id}`);

    if(vel){
      vel.muted = muted;
    }

    if(ael){
      ael.muted = muted
    }

  })

  return (
    <StreamPlayer {...restProps} />
  )
}