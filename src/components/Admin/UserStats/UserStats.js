import React, { useEffect, useMemo, useState } from "react";
import { publicApi } from "../../../States/Api";

const Orders = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const { data } = await publicApi.get("/users/stats");
        data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {}
    };
    getUserStats();
  }, [MONTHS]);

  return (
    <>
      {userStats.map((p) => (
        <div key={p.id}>
          <h1>{p.name}</h1>
          <h1>{p.amount}</h1>
        </div>
      ))}
    </>
  );
};

export default Orders;
