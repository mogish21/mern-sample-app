import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
// import { Delete } from "@mui/icons-material";

interface Member {
  id: number;
  proposerName: string;
  policyPeriod: string;
  policyPlan: string;
  sumInsured: string;
  tpaDiscount: boolean;
  copayment: string;
}

const Calculator: React.FC = () => {
  const [zone, setZone] = useState(0);
  const [members, setMembers] = useState<Member[]>([
    {
      id: Date.now(),
      proposerName: "",
      policyPeriod: "",
      policyPlan: "",
      sumInsured: "",
      tpaDiscount: false,
      copayment: "",
    },
  ]);

  const handleZoneChange = (_: React.SyntheticEvent, newValue: number) => {
    setZone(newValue);
  };

  const handleAddMember = () => {
    setMembers([
      ...members,
      {
        id: Date.now(),
        proposerName: "",
        policyPeriod: "",
        policyPlan: "",
        sumInsured: "",
        tpaDiscount: false,
        copayment: "",
      },
    ]);
  };

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", p: 2 }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#f97316",
          color: "white",
          p: 2,
          borderRadius: 2,
          mb: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Sampoorna Swasthya Suraksha
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          THE ORIENTAL INSURANCE COMPANY LTD
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
          <Button color="inherit" size="small">
            📊 Calculator
          </Button>
          <Button color="inherit" size="small">
            📋 Benefits & Coverages
          </Button>
          <Button color="inherit" size="small">
            🔄 Switch Policy
          </Button>
        </Box>
      </Box>

      {/* Zone Tabs */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}>
        <CardContent sx={{ pb: 1 }}>
          <Tabs
            value={zone}
            onChange={handleZoneChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Zone 1" />
            <Tab label="Zone 2" />
          </Tabs>
        </CardContent>
      </Card>

      {/* Family Member Cards in rows */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {members.map((member, index) => (
          <Card
            key={member.id}
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              mb: 2,
              flex: "1 1 calc(33.333% - 16px)", // 3 cards per row
              minWidth: 250, // ensures cards shrink nicely on small screens
              position: "relative",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {index === 0 ? "Proposer Details" : `Family Member ${index}`}
                </Typography>
                {index > 0 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    _
                  </IconButton>
                )}
              </Box>

              <Divider sx={{ mb: 2 }} />

              <TextField
                fullWidth
                size="small"
                label="Policy Period"
                variant="outlined"
                margin="dense"
              />
              <TextField
                fullWidth
                size="small"
                label="Policy Plan"
                variant="outlined"
                margin="dense"
              />
              <TextField
                fullWidth
                size="small"
                label="Sum Insured"
                variant="outlined"
                margin="dense"
              />
              <TextField
                fullWidth
                size="small"
                label="Proposer / Member Name"
                variant="outlined"
                margin="dense"
              />

              <FormControlLabel
                control={<Checkbox size="small" />}
                label="TPA Discount"
                sx={{ mt: 1 }}
              />

              <TextField
                fullWidth
                size="small"
                label="Co-payment"
                variant="outlined"
                margin="dense"
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Family Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddMember}
          sx={{ borderRadius: 2, px: 3 }}
        >
          ➕ Add Family Member
        </Button>
      </Box>
    </Box>
  );
};

export default Calculator;
