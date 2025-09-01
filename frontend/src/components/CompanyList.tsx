import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies, setSelectedCompany } from "../redux/actions"; // Import the Redux actions
import { useNavigate } from "react-router-dom";
import api from "../api"; // your axios or fetch wrapper
import { Company } from "../types";

const CompanyList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companies = useSelector((state: any) => state.company.companies); // Access companies from Redux store
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch companies only if not already loaded
  useEffect(() => {
    if (!companies || companies.length === 0) {  // Only fetch if companies are not loaded
      fetchCompanies();
    }
  }, [companies]); // Only run when companies array is empty

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get("/companies"); // API endpoint returning list of companies
      // Dispatch action to store companies in Redux
      dispatch(setCompanies(response.data.companies));
    } catch (error) {
      console.error("Error fetching companies", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter companies based on search input
  const filteredCompanies = companies?.filter((c: Company) =>
    c.CompanyName.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const publicCompanies = filteredCompanies.filter((c: Company) => c.isPublic === true);
  const privateCompanies = filteredCompanies.filter((c: Company) => !c.isPublic);

  const handleCompanyClick = (company: Company) => {
    // Dispatch the selected company to Redux
    dispatch(setSelectedCompany(company));
    // Navigate to the insurance page for the selected company after the state update
    setTimeout(() => navigate("/insurance"), 100); // Give Redux state time to update
  };

  const renderCompanyCard = (c: Company) => (
    <div
      key={c.CompanyGUID}
      onClick={() => handleCompanyClick(c)} // Dispatch company to Redux and navigate
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        width: "140px",
        background: "#f9f9f9",
      }}
    >
      <img
        src={`http://localhost:5000/uploads/companyIcons/${c.CompanyIconName}${c.CompanyGUID === 3 ? ".jpg" : ".png"}`}
        alt={c.CompanyName}
        style={{ width: "50px", borderRadius: "50%" }}
      />
      <h4 style={{ fontSize: "0.9rem", marginTop: "8px" }}>{c.CompanyName}</h4>
    </div>
  );

  if (loading) return <p>Loading companies...</p>;

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "100%",
        }}
      />

      {/* Public Companies */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Public Companies</h3>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {publicCompanies.length > 0 ? publicCompanies.map(renderCompanyCard) : <p>No public companies found.</p>}
        </div>
      </div>

      {/* Private Companies */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Private Companies</h3>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {privateCompanies.length > 0 ? privateCompanies.map(renderCompanyCard) : <p>No private companies found.</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
