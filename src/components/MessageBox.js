import React from "react";

const MessageBox = (props) => {
  return <div className={`alert alert-${props.variant || "info"} w-100 text-center`}>{props.children}</div>;
};

export default MessageBox;
