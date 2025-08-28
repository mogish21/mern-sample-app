import React, { useState } from "react";
import { Company } from "../types";
import CompanyList from "../components/CompanyList";
import InsuranceList from "../components/InsuranceList";

const Dashboard: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0d6efd",
          color: "white",
          padding: "15px 30px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            style={{ borderRadius: "50%", background: "white" }}
          />
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Insurance Dashboard</h1>
        </div>
      </header>

      <main style={{ padding: "20px" }}>
        {!selectedCompany ? (
          <CompanyList onSelect={setSelectedCompany} />
        ) : (
          // <div>
          //   <h2>Selected Company: {selectedCompany.name}</h2>
          //   {/* Next Steps: Insurance Tabs → Categories → Policies */}
          // </div>
          <InsuranceList/>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
