import * as React from "react";
import Table from "../Table/Table";
import "./landingPage.scss";

const LandingPage: React.FC = () => {
  return (
    <div className={"landingPage"}>
      <div className={"content"}>
        <Table />
      </div>
    </div>
  );
};

export default LandingPage;
