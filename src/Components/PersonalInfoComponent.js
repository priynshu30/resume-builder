import { Avatar, Button, Divider, Paper, Snackbar } from "@mui/material";
import React, { useState } from "react";
import "../Styles/PersonalInfoComponent.css";
import BackNextBtnComponent from "./BackNextBtnComponent";
import InputComponent from "./InputComponent";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { addPersonalInfo } from "../Redux/actions";
import { useForm } from "react-hook-form";

const mapStateToProps = (state) => ({
  personalInfo: state.personalInfoReducer.personalInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onAddPersonalInfo: (details) => dispatch(addPersonalInfo(details)),
});

const PersonalInfoComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [imgSnackbar, setImgSnackbar] = useState(false);
  const [vertical] = useState("top");
  const [horizontal] = useState("center");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState(
    props.personalInfo.profileImg.length ? props.personalInfo.profileImg : ""
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = (data) => {
    // console.log(img.length);
    if (img.length) {
      setLoading(true);
      props.onAddPersonalInfo({ profileImg: img, ...data });

      setTimeout(() => {
        setLoading(false);
        props.setTab(props.tab + 1);
      }, 1000);
    } else {
      setImgSnackbar(true);
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveImage = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setImgSnackbar(false);
  };

  // getting windows width
  // const profileImg = sotreImage.map((ele) => ele.img);
  // console.log(props.personalInfo, errors);

  return (
    <Paper className="personal-info-paper" elevation={3}>
      <Avatar
        sx={{ width: 120, height: 120, marginBottom: 1 }}
        alt="profile img"
        src={
          img.length ? img : `https://img.icons8.com/color/344/test-account.png`
        }
      />
      <div>
        <Button
          className="change-profile-photo-btn"
          variant="outlined"
          onClick={handleClickOpen}>
          Change Profile Photo
        </Button>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>
          <DialogTitle
            id="customized-dialog-title">
            Update Image
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <input type="file" accept="image/*" onChange={onSelectFile} />
          </DialogContent>
          <DialogActions>
            <Button onClick={saveImage}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <form onSubmit={handleSubmit(handleNext)}>
        <div className="personal-info-form-fields">
          <InputComponent
            title={"First Name"}
            type={"text"}
            name={"firstName"}
            register={register}
            multiline={false}
            value={props.personalInfo.firstName}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                firstName: value,
              })
            }
            error={errors.firstName ? true : false}
            errorMessage={errors.firstName ? errors.firstName.message : null}
          />
          <InputComponent
            title={"Last Name"}
            type={"text"}
            name={"lastName"}
            register={register}
            multiline={false}
            value={props.personalInfo.lastName}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                lastName: value,
              })
            }
            error={errors.lastName ? true : false}
            errorMessage={errors.lastName ? errors.lastName.message : null}
          />
          <InputComponent
            title={"Email"}
            type={"email"}
            name={"email"}
            register={register}
            multiline={false}
            value={props.personalInfo.email}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                email: value,
              })
            }
            error={errors.email ? true : false}
            errorMessage={errors.email ? errors.email.message : null}
          />
          <InputComponent
            title={"Mobile"}
            type={"number"}
            name={"mobile"}
            register={register}
            multiline={false}
            value={props.personalInfo.mobile}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                mobile: value,
              })
            }
            error={errors.mobile ? true : false}
            errorMessage={errors.mobile ? errors.mobile.message : null}
          />
        </div>
        <InputComponent
          title={"Address"}
          type={"text"}
          name={"address"}
          register={register}
          multiline={false}
          value={props.personalInfo.address}
          setValue={(value) =>
            props.onAddPersonalInfo({
              ...props.personalInfo,
              address: value,
            })
          }
          error={errors.address ? true : false}
          errorMessage={errors.address ? errors.address.message : null}
        />
        <div style={{ marginTop: 20 }} className="personal-info-form-fields">
          <InputComponent
            title={"City"}
            type={"text"}
            name={"city"}
            register={register}
            multiline={false}
            value={props.personalInfo.city}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                city: value,
              })
            }
            error={errors.city ? true : false}
            errorMessage={errors.city ? errors.city.message : null}
          />
          <InputComponent
            title={"State"}
            type={"text"}
            name={"state"}
            register={register}
            multiline={false}
            value={props.personalInfo.state}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                state: value,
              })
            }
            error={errors.state ? true : false}
            errorMessage={errors.state ? errors.state.message : null}
          />
          <InputComponent
            title={"Postal Code"}
            type={"number"}
            name={"postalCode"}
            register={register}
            multiline={false}
            value={props.personalInfo.postalCode}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                postalCode: value,
              })
            }
            error={errors.postalCode ? true : false}
            errorMessage={errors.postalCode ? errors.postalCode.message : null}
          />
        </div>
        <InputComponent
          title={"Objective"}
          type={"text"}
          name={"objective"}
          register={register}
          // multiline={true}
          value={props.personalInfo.objective}
          setValue={(value) =>
            props.onAddPersonalInfo({
              ...props.personalInfo,
              objective: value,
            })
          }
          error={errors.objective ? true : false}
          errorMessage={errors.objective ? errors.objective.message : null}
        />
        <Divider className="personal-details-divider" />
        <BackNextBtnComponent
          // onNext={() => handleSubmit(handleNext)}
          loading={loading}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
        />
      </form>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={imgSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Please select a profile image"
        key={vertical + horizontal}
      />
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfoComponent);
