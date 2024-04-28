import { styled } from "@mui/material";
// styled FlexBox component
export const FlexBox = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 10px",
  height: "100px",
  alignItems: "center",
  backgroundColor: "transparent",
}));
// styled CompanyBrand component to show logo or app name
const CompanyBrand = styled("div")(() => ({
  color: "rgb(56, 182, 255)",
  fontSize: "2rem",
  fontWeight: "bolder",
  color: "red",
}));

function Header() {
  return (
    <>
      <FlexBox>
        <CompanyBrand>Movie App</CompanyBrand>
      </FlexBox>
    </>
  );
}
export default Header;
