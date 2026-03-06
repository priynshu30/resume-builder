import React, { useState, useEffect } from "react";
import Navbar from "../Components/Common/Navbar";
import "../Styles/MyResumes.css";
import { templates } from "../data/templates";
import { Button, Stack, Card, CardContent, Typography } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTemplate, selectResume, addPersonalInfo, addAllExperience, addEducation, editSkill } from "../Redux/actions";

const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
  setSelectedResumeId: (id) => dispatch(selectResume(id)),
  setPersonalInfo: (info) => dispatch(addPersonalInfo(info)),
  setExperiences: (experiences) => dispatch(addAllExperience(experiences)),
  setEducation: (education) => dispatch(addEducation(education)),
  setSkills: (skills) => dispatch(editSkill(skills)),
});

const MyResumes = (props) => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    setResumes(savedResumes);
  }, []);

  const handleEdit = (resume) => {
    props.setSelectedTemplateId(resume.template_id);
    props.setSelectedResumeId(resume.id);
    props.setPersonalInfo(resume.personalInfo);
    props.setExperiences(resume.experiences);
    props.setEducation(resume.educationInfo);
    props.setSkills(resume.skills);
    navigate("/template/fill-details");
  };

  const handleDownload = (resume) => {
    // Implement download logic if needed
    alert("Download functionality not implemented yet");
  };

  return (
    <>
      <Navbar active={"My Resumes"} />
      <div className="my-resumes">
        <h2 className="my-resumes-title">My Resumes</h2>
        {resumes.length === 0 ? (
          <p className="no-resumes">No resumes saved yet. Create one from the templates.</p>
        ) : (
          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                sm: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gridGap: "20px",
            }}
          >
            {resumes.map((resume) => (
              <Card key={resume.id} className="resume-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resume.personalInfo.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resume.personalInfo.mobile}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(resume)}
                    sx={{ marginTop: 2, marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDownload(resume)}
                    sx={{ marginTop: 2 }}
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyResumes);
