import React from "react";
import { connect } from "react-redux";
import { getOptionsData } from "../../redux/options/options.selectors";
import { GlobalStyles } from "./theme.styles";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../../assets/theme/theme.definitions";

const ThemeContext = (props) => {
  return (
    <ThemeProvider
      mode={props.optionsData.mod === "dark" ? dark : light}
      theme={props.optionsData.col}
      fontSize={props.optionsData.tpx}
    >
      <GlobalStyles
        mode={props.optionsData.mod === "dark" ? dark : light}
        theme={props.optionsData.col}
        fontSize={props.optionsData.tpx}
      />
      {props.children}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

export default connect(mapStateToProps)(ThemeContext);
