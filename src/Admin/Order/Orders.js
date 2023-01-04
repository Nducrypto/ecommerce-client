import React, { useEffect, useState } from "react";
import { publicApi } from "../../States/Api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // console.log(orders);
  // ====GET ORDERS
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await publicApi.get("/orders");

        setOrders(data);
      } catch (error) {}
    };
    getOrders();
  }, []);

  return (
    <div>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Orders</div>
      <div style={{ display: "flex" }}>
        {orders.map((p) => (
          <div key={p._id} style={{ marginTop: "1rem" }}>
            <div>address :{p.address}</div>
            <div>&#8358; {Intl.NumberFormat().format(p.amount)}</div>

            <div>status :{p.status}</div>
            <div>{p.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
