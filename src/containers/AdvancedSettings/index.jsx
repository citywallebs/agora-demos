import React from 'react';
import { Form, Radio, Collapse,Select,InputNumber,Switch } from 'antd';
// import { RESOLUTIONS } from './const';

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};


export default (props)=>{
  const { 
    state,onFieldsChange,
    cameraList,
    microphoneList
  } = props;

  return (
    <Collapse accordion={false} defaultActiveKey="1">
      <Collapse.Panel key="1" header="ADVANCED SETTINGS" showArrow={false}>
        <Form 
          {...layout} 
          name="state"
          initialValues={state}
          onFieldsChange={onFieldsChange}
        >
          <Form.Item 
            name="uid"
            label="UID"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item 
            name="cameraId"
            label="CAMERA"
          >
            <Select>
              {
                cameraList.map((item)=>{
                  return (
                    <Option key={item.deviceId} value={item.deviceId}>{item.label}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item 
            name="microphoneId"
            label="MICROPHONE"
          >
            <Select defaultActiveFirstOption>
              {
                microphoneList.map((item)=>{
                  return (
                    <Option key={item.deviceId} value={item.deviceId}>{item.label}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="mode"
            label="MODE"
          >
            <Radio.Group>
              <Radio value="live">live</Radio>
              <Radio value="rtc">rtc</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="codec"
            label="CODEC"
          >
            <Radio.Group>
              <Radio value="h264">h264</Radio>
              <Radio value="vp8">vp8</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="muted"
            label="MUTED"
          >
            <Switch/>
          </Form.Item>
        </Form>
      </Collapse.Panel>
    </Collapse>  
  )
}