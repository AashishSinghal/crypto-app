import * as React from "react";
import { Alert, Spin } from "antd";
import { ILoaderProps } from "../Types";

const Loader = ({ tip = "Loading...", message }: ILoaderProps) => {
  return (
    <Spin tip={tip}>
      <Alert message={message} />
    </Spin>
  );
};

export default Loader;
