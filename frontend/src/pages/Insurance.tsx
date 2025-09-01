import React, { useEffect, useState } from "react";
import api from "../api";
import { Insurance, InsuranceResponse, Policy } from "../types";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { setSelectedHealthPolicy } from "../redux/actions"; // Import the Redux actions
import { useNavigate } from "react-router-dom";

interface RootState {
  company: any;
}

interface PolicyResponse {
  policies: Policy[];
  total: number;
  page: number;
  totalPages: number;
}

const InsuranceList: React.FC = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [activeInsurance, setActiveInsurance] = useState<Insurance | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Search term
  const policiesPerPage = 10;

  const selectedCompany = useSelector(
    (state: RootState) => state.company.selectedCompany
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCompany) {
      loadInsurances(selectedCompany.CompanyGUID);
    }
  }, [selectedCompany]);

  const loadInsurances = async (companyGUID: number) => {
    try {
      const response = await api.get<InsuranceResponse>(`/users/insurance`);
      setInsurances(response.data.insurance);

      if (response.data.insurance.length > 0) {
        const firstInsurance = response.data.insurance[0];
        setActiveInsurance(firstInsurance);
        loadPolicies(companyGUID, firstInsurance.insuranceId, 1, "");
      }
    } catch (error) {
      console.error("Error fetching insurance list:", error);
    }
  };

  const loadPolicies = async (
    companyGUID: number,
    insuranceId: number,
    page: number,
    search: string
  ) => {
    try {
      const response = await api.get<PolicyResponse>(
        `/policies/${companyGUID}?insuranceId=${insuranceId}&page=${page}&limit=${policiesPerPage}&search=${search}`
      );

      setPolicies(response.data.policies || []);
      setCurrentPage(response.data.page || 1);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const handleTabClick = (insurance: Insurance) => {
    setActiveInsurance(insurance);
    if (selectedCompany) {
      loadPolicies(selectedCompany.CompanyGUID, insurance.insuranceId, 1, searchTerm);
    }
  };

   const handlePolicyClick = (policy: Policy) => {
      // Dispatch the selected health policy to Redux
      dispatch(setSelectedHealthPolicy(policy));
      // Navigate to the insurance page for the selected company after the state update
      setTimeout(() => navigate("/calculator"), 100); // Give Redux state time to update
    };

  const handlePageChange = (page: number) => {
    if (activeInsurance && selectedCompany) {
      loadPolicies(selectedCompany.CompanyGUID, activeInsurance.insuranceId, page, searchTerm);
    }
  };

  const handleSearch = () => {
    if (activeInsurance && selectedCompany) {
      loadPolicies(selectedCompany.CompanyGUID, activeInsurance.insuranceId, 1, searchTerm);
    }
  };

  if (!selectedCompany) {
    return <p style={{ padding: "15px", textAlign: "center" }}>Please select a company to view insurance.</p>;
  }

  return (
    <div>
      <Header name= {selectedCompany.DisplayName}/>
      <div style={{ padding: "15px" }}>
        {/* <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#f26522" }}>
          {selectedCompany.DisplayName || "Company not selected"}
        </h2> */}

        {/* Insurance Tabs */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          {insurances.length ? (
            insurances.map((item) => (
              <div
                key={item.insuranceId}
                onClick={() => handleTabClick(item)}
                style={{
                  cursor: "pointer",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  backgroundColor: activeInsurance?.insuranceId === item.insuranceId ? "#f26522" : "#f1f1f1",
                  color: activeInsurance?.insuranceId === item.insuranceId ? "#fff" : "#000",
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <p>No insurances available.</p>
          )}
        </div>

        {/* Search Input */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              width: "250px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              marginRight: "10px",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#f26522",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* Policies */}
        {activeInsurance && (
          <div>
            {policies.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {policies.map((p) => (
                  <div
                    key={p.PolicyTypeGUID}
                    onClick={() => handlePolicyClick(p)} // Dispatch company to Redux and navigate
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px",
                      borderRadius: "8px",
                      background: "#fff7ef",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/policyIcons/${p.PolicyImageIconName}.png`}
                      alt={p.PolicyName}
                      style={{ width: "40px", height: "40px", marginRight: "12px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", color: "#333" }}>{p.PolicyName}</div>
                      {p.ShortNoteMessage && (
                        <div style={{ color: "#f26522", fontSize: "12px" }}>{p.ShortNoteMessage}</div>
                      )}
                      {p.isActive === 0 && (
                        <div style={{ color: "red", fontSize: "12px" }}>Currently Inactive</div>
                      )}
                    </div>
                    <div style={{ fontSize: "22px", color: "#555", cursor: "pointer" }}>★</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No policies available.</p>
            )}

            {/* Pagination Controls */}
{totalPages > 1 && (
  <div
    style={{
      position: "fixed",         // Fix it
      bottom: "20px",            // Distance from bottom
      left: "50%",               // Center horizontally
      transform: "translateX(-50%)",
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      background: "#fff",        // White background (optional)
      padding: "10px 16px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)", // Add subtle shadow
      zIndex: 1000,              // Make sure it stays on top
    }}
  >
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        background: currentPage === 1 ? "#eee" : "#fff",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
      }}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          background: currentPage === i + 1 ? "#f26522" : "#fff",
          color: currentPage === i + 1 ? "#fff" : "#000",
          fontWeight: currentPage === i + 1 ? "bold" : "normal",
          cursor: "pointer",
        }}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        background: currentPage === totalPages ? "#eee" : "#fff",
        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
      }}
    >
      Next
    </button>
  </div>
)}

          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceList;
