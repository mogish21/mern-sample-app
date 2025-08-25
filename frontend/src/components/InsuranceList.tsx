import React, { useEffect, useState } from "react";
import api from "../api";
import { Insurance, InsuranceResponse } from "../types";

const InsuranceList: React.FC = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const response = await api.get<InsuranceResponse>("/users/insurance");
        console.log(response.data);
        setInsurances(response.data.insurance);
      } catch (error) {
        console.error("Error fetching insurance list", error);
      }
    };
    fetchInsurances();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Insurance List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {insurances.map((item) => (
          <li
            key={item.insuranceId}
            style={{
              background: "#f9f9f9",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{item.name}</strong> <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsuranceList;
