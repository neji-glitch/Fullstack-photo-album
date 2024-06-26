import React from "react";
import { Pagination } from "antd";

const Paginator = ({ total, onChange, pageSize }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "50px" }}>
      <Pagination
        onChange={onChange}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Paginator;
