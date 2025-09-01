import React from "react";
import CompanyList from "../components/CompanyList";
import Header from "../components/Header";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header name={"Dashboard"}/>
      <main style={{ padding: "20px" }}>
          <CompanyList />
      </main>
    </div>
  );
};

export default Dashboard;
