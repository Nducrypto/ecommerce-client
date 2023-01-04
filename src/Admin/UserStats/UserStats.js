import React, { useEffect, useMemo, useState } from "react";
import { publicApi } from "../../States/Api";

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
            { month: MONTHS[item._id - 1], activeUsers: item.total },
          ])
        );
      } catch (error) {}
    };
    getUserStats();
  }, [MONTHS]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ textAlign: "center", fontSize: "2rem" }}>USERSTATS</div>
      {userStats.map((p) => (
        <div key={p.id} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.3rem" }}>{p.month}</div>
          <div style={{ fontSize: "1.3rem" }}>
            ActiveUsers : {p.activeUsers}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
