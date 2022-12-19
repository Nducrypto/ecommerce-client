import React, { useEffect, useState } from "react";
import { publicRequest } from "../../../States/Api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // ====GET ORDERS
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await publicRequest.get("/orders");

        setOrders(data);
      } catch (error) {}
    };
    getOrders();
  }, []);

  return (
    <>
      {orders.map((p) => (
        <div key={p._id} style={{ marginTop: "1rem" }}>
          <div>address :{p.address}</div>
          <div>amount :{p.amount}</div>

          <div>userId :{p.userId}</div>
          <div>status :{p.status}</div>
          <div>Date :{p.createdAt}</div>
        </div>
      ))}
    </>
  );
};

export default Orders;
