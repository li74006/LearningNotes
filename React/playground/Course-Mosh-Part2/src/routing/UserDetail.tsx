import React from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const params = useParams();
  return <div>User: {params.id}</div>;
};

export default UserDetail;
