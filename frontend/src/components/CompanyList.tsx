import React, { useEffect, useState } from "react";
import api from "../api"; // your axios or fetch wrapper
import { Company } from "../types";

interface Props {
  onSelect: (company: Company) => void;
}

const CompanyList: React.FC<Props> = ({ onSelect }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get("/companies/"); // API endpoint returning list of companies
      // Map API response to Company type
      const mappedCompanies: Company[] = response.data.companies;
      setCompanies(mappedCompanies);
    } catch (error) {
      console.error("Error fetching companies", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter companies based on search input
  const filteredCompanies = companies.filter((c) =>
    c.CompanyName.toLowerCase().includes(search.toLowerCase())
  );

  const publicCompanies = filteredCompanies.filter((c) => c.isPublic === true);
  const privateCompanies = filteredCompanies.filter((c) => !c.isPublic);

  const renderCompanyCard = (c: Company) => (
    <div
      key={c.CompanyGUID}
      onClick={() => onSelect(c)}
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
      <img src={`http://localhost:5000/uploads/companyIcons/${c.CompanyIconName}${c.CompanyGUID === 3 ? ".jpg" : ".png"}`} alt={c.CompanyName} style={{ width: "50px", borderRadius: "50%" }} />
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
          {publicCompanies.length > 0 ? publicCompanies.map(renderCompanyCard) : <p>No companies found.</p>}
        </div>
      </div>

      {/* Private Companies */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Private Companies</h3>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {privateCompanies.length > 0 ? privateCompanies.map(renderCompanyCard) : <p>No companies found.</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
