import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { userRequest } from "../../../States/Api";

const Revenue = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await userRequest.get("/orders/income");
        setPercentage((data[1].total * 100) / data[0].total - 100);
        setIncome(data);
        // Getting Percentage between previous and current month
      } catch (error) {}
    };
    getStats();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div>Revenue</div>
        <div>{income[1]?.total}</div>
      </div>
      <div>
        %{percentage}
        {percentage < 0 ? <ArrowDownward /> : <ArrowUpward />}
      </div>
    </div>
  );
};

export default Revenue;
