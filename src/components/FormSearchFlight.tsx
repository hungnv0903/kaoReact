import { UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Popover, Space } from "antd";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import Styles from "./index.module.css";
import ListMap from "./ListMap";

interface IAirport {
  AirportCode: string;
  AirportName: string;
  CityCode: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
}

interface quantityTickets {
  Atd: number;
  Chd: number;
  Inf: number;
}
interface SearchInfo {
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  quantityTickets: quantityTickets;
}

const { RangePicker } = DatePicker;

const startpointTitle = (
  <span className="text-lg">Choose a starting point</span>
);
const endpointTitle = <span className="text-lg">Choose a end point</span>;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const { Item: FormItem } = Form;
const FormSearchFlight = () => {
  const [form] = Form.useForm() ; 
  const [arrow, setArrow] = useState("Show");
  const [openPopoverStartpoint , setOpenPopoverStartpoint] = useState<boolean>(false) ; 
  const [openPopoverEndpoint , setOpenPopoverEndpoint] = useState<boolean>(false) ; 
  const [inputStartpoint , setInputStartpoint] = useState<string>() ; 
  const [inputEndpoint , setInputEndpoint] = useState<string>() ; 
  const [selectStartpoint , setSelectStartpoint] = useState<IAirport | null>() ; 
  const [selectEndpoint , setSelectEndpoint] = useState<IAirport | null>() ; 

  const initialValue: SearchInfo = {
    startPoint: "",
    endPoint: "",
    startDate: "",
    endDate: "",
    quantityTickets: {
      Atd: 1,
      Chd: 0,
      Inf: 0,
    },
  };

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }
  }, [arrow]);

  
  const handleSelectStartpoint = (value:IAirport)=>{
    setInputStartpoint(value.AirportCode) ; 
    setSelectStartpoint(value) ; 
    setOpenPopoverStartpoint(false) ; 
    form.setFieldsValue({startPoint:value.AirportCode})
  }

  const handleSelectEndpoint = (value:IAirport)=>{
    setInputEndpoint(value.AirportCode) ; 
    setSelectEndpoint(value) ; 
    setOpenPopoverEndpoint(false) ; 
    form.setFieldsValue({endPoint:value.AirportCode})
  }

  const handleChangeStartpoint = (event:React.ChangeEvent<HTMLInputElement>)=>{
      setInputStartpoint(event.target.value) ; 
      setSelectStartpoint(null) ; 
      setOpenPopoverStartpoint(true) ; 
  }
  const handleChangeEndpoint = (event:React.ChangeEvent<HTMLInputElement>)=>{
      setInputEndpoint(event.target.value) ; 
      setSelectEndpoint(null) ; 
      setOpenPopoverEndpoint(true) ; 
  }

  const handleSubmit = ()=>{
    const startpoint  = selectStartpoint?.AirportCode ?? inputStartpoint ; 
    const endpoint    = selectEndpoint?.AirportCode ?? inputEndpoint ; 
    console.log({startpoint:startpoint , endpoint:endpoint}) ;
  }

  return (
    <Fragment>
      <div className="w-full h-1/3 flex items-center  justify-center bg-gray-950 bg-opacity-60 px-14">
        <Form
          form={form}
          name="FormSearchFlight"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSubmit}
          className="flex"
          
        >
          <div className="grid grid-cols-4 gap-10 pr-12 ">
            <Form.Item
              label={<span className="text-white text-lg">Origin</span>}
              name="startPoint"
              rules={[{ required: true, message: "Please input your Origin " }]}
            >
              <Popover
                placement="bottomLeft"
                trigger={["click"]}
                title={startpointTitle}
                content={<ListMap onSelectPlace={handleSelectStartpoint} />}
                arrow={mergedArrow}
                open={openPopoverStartpoint}
                onOpenChange={(open)=>setOpenPopoverStartpoint(open)}
              >
                <Input
                  size="large"
                  placeholder="Origin"
                  suffix={<i className="fa-solid fa-location-dot"></i>}
                  className="bg-white rounded-full shadow-inner"
                  onChange={handleChangeStartpoint}
                  onClick={()=>setOpenPopoverStartpoint(true)}
                  value={inputStartpoint}
                  
                />
              </Popover>
            </Form.Item>
            <Form.Item
              label={<span className="text-white text-lg">Destination</span>}
              name="endPoint"
              rules={[
                { required: true, message: "Please input your Destination" },
              ]}
            >
              <Popover
                placement="bottom"
                trigger={["click"]}
                title={endpointTitle}
                content={<ListMap onSelectPlace={handleSelectEndpoint} />}
                arrow={mergedArrow}
                open={openPopoverEndpoint}
                onOpenChange={(open)=>setOpenPopoverEndpoint(open)}
              >
                <Input
                  size="large"
                  placeholder="Destination"
                  suffix={<i className="fa-solid fa-location-dot"></i>}
                  className="bg-white rounded-full shadow-inner"
                  onChange={handleChangeEndpoint}
                  onClick={()=>setOpenPopoverEndpoint(true)}
                  value={inputEndpoint}
                />
              </Popover>
            </Form.Item>
            <Form.Item
              label={
                <span className="text-white text-lg">
                  Schedule - Return date
                </span>
              }
              name="date"
              className="custom-date-picker w-full"
            >
              <Space direction="vertical" size={"large"}>
                <RangePicker
                  size="large"
                  className="bg-white rounded-full shadow-inner"
                  suffixIcon={
                    <i className="fa-sharp fa-regular fa-calendar-days text-black"></i>
                  }
                />
              </Space>
            </Form.Item>
            <Form.Item
              label={<span className="text-white text-lg">Passenger</span>}
              name="passenger"
            >
              <Popover
                placement="bottom"
                trigger={["click"]}
                content={content}
                arrow={mergedArrow}
              >
                <Input
                  size="large"
                  placeholder="Passenger"
                  suffix={<i className="fa-solid fa-users"></i>}
                  className="bg-white rounded-full shadow-inner"
                />
              </Popover>
            </Form.Item>
          </div>
          <Form.Item className="mb-0 flex items-center mt-4">
            <button type="submit" className={Styles.btnSearchFlight}>
              <svg viewBox="0 0 241.016 241.016">
                <path
                  d="M210.818,96.393l-49.202,1.644L108.753,0H83.279c-2.791,0-5.052,2.259-5.052,5.055l27.504,94.843l-50.097,2.037
                                        c-4.312,0.004-8.372,0.732-11.97,1.997l-18.925-32.14L8.857,71.788c-2.105,0.004-3.811,1.708-3.811,3.814l13.848,42.361v5.09
                                        L5.047,165.414c-0.002,2.105,1.704,3.814,3.809,3.814l15.885,0.004l19.257-32.713c3.514,1.197,7.455,1.885,11.637,1.885
                                        l50.288,2.046l-27.698,95.516c0,2.795,2.259,5.05,5.052,5.05h25.474l53.227-98.696l48.84,1.631
                                        c13.894,0,25.152-10.652,25.152-23.779C235.971,107.041,224.713,96.393,210.818,96.393z"
                ></path>
              </svg>
            </button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default FormSearchFlight;
