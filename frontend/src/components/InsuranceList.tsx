import React, { useEffect, useState } from "react";
import api from "../api";
import { Insurance, InsuranceResponse, Policy, Company } from "../types";

interface Props {
  selectedCompany: Company;
}

const InsuranceList: React.FC<Props> = ({ selectedCompany }) => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [activeInsurance, setActiveInsurance] = useState<Insurance | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<{ insuranceId: number | ""; name: string }>({
    insuranceId: "",
    name: "",
  });

  useEffect(() => {
    if (selectedCompany) {
      fetchInsurances(selectedCompany.CompanyGUID);
    }
  }, [selectedCompany]);

  const fetchInsurances = async (companyGUID: number) => {
    try {
      const response = await api.get<InsuranceResponse>(
        `/companies/${companyGUID}/insurances`
      );
      setInsurances(response.data.insurance);

      if (response.data.insurance.length > 0) {
        setActiveInsurance(response.data.insurance[0]);
        fetchPolicies(response.data.insurance[0].insuranceId);
      }
    } catch (error) {
      console.error("Error fetching insurance list", error);
    }
  };

  const fetchPolicies = async (insuranceId: number) => {
    try {
      const response = await api.get(`/insurances/${insuranceId}/policies`);
      setPolicies(response.data.policies); // backend should return { policies: [] }
    } catch (error) {
      console.error("Error fetching policies", error);
    }
  };

  const handleTabClick = (insurance: Insurance) => {
    setActiveInsurance(insurance);
    fetchPolicies(insurance.insuranceId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "insuranceId" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/insurance", formData);
      setShowForm(false);
      setFormData({ insuranceId: 0, name: "" });
      fetchInsurances(selectedCompany.CompanyGUID);
    } catch (error) {
      console.error("Error creating insurance", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Insurance List for {selectedCompany.CompanyName}</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginBottom: "15px",
            padding: "10px 15px",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add Insurance
        </button>
      </div>

      {/* Insurance Tabs */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          borderBottom: "2px solid #eee",
          paddingBottom: "10px",
        }}
      >
        {insurances.map((item) => (
          <div
            key={item.insuranceId}
            onClick={() => handleTabClick(item)}
            style={{
              background:
                activeInsurance?.insuranceId === item.insuranceId ? "#007bff" : "#f1f1f1",
              color:
                activeInsurance?.insuranceId === item.insuranceId ? "#fff" : "#000",
              padding: "10px 20px",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <strong>{item.name}</strong>
          </div>
        ))}
      </div>

      {/* Policies under selected tab */}
      {activeInsurance && (
        <div style={{ marginTop: "20px" }}>
          <h3>{activeInsurance.name} Policies</h3>
          {policies.length > 0 ? (
            <ul>
              {policies.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          ) : (
            <p>No policies available.</p>
          )}
        </div>
      )}

      {/* Popup Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              width: "300px",
            }}
          >
            <h3>Add Insurance</h3>
            <input
              type="text"
              name="insuranceId"
              placeholder="Insurance ID"
              value={formData.insuranceId}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              name="name"
              placeholder="Insurance Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="submit"
                style={{
                  background: "#28a745",
                  color: "#fff",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default InsuranceList;
