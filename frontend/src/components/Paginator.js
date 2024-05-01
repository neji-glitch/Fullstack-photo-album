import React from "react";
import { Pagination } from "antd";

const Paginator = ({ total, onChange, pageSize }) => {
  return (
    <Pagination
      onChange={onChange}
      total={total}
      pageSize={pageSize}
      showSizeChanger={false}
    />
  );
};

export default Paginator;
