import React from 'react';
import { Card,Button,Form,Input } from 'antd';
// import styles from './basic-settings.module.scss';
// import reducer,{defaultState } from '../reducer';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default (props)=>{
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
  };

  const { state,onFieldsChange } = props;

  return (
    <Card
      actions={[
        <Button 
          type="link" 
          disabled={props.isLoading || props.isJoined}
          onClick={props.onJoin}
        >JOIN</Button>,
        <Button 
          type="link" 
          onClick={props.onLeave}
          disabled={props.isLoading || !props.isJoined} 
        >LEAVE</Button>,
        <Button 
          type="link"
          onClick={props.onPublish}
          disabled={!props.isJoined || props.isLoading || props.isPublished}
        >PUBLISH</Button>,
        <Button 
          type="link" 
          onClick={props.onUnPublish}
          disabled={!props.isJoined || props.isLoading || !props.isPublished}
        >UNPUBLISH</Button>,
      ]}
    >
      <Form 
        {...layout}
        name="state"
        initialValues={state}
        validateMessages={validateMessages}
        onFieldsChange={onFieldsChange}
      >
        <Form.Item 
          label="App ID" 
          name="appId"
          rules={[{
            required:true,
          }]}
        >
          <Input placeholder="App ID"/>
        </Form.Item>
        <Form.Item 
          label="Channel"
          name="channel"
          rules={[{
            required:true,
          }]}
        >
          <Input placeholder="channel"/>
        </Form.Item>
        <Form.Item 
          label="Token"
          name="token"
          rules={[{
            required:true,
          }]}
        >
          <Input placeholder="token"/>
        </Form.Item>
      </Form>

    </Card>
  )
}