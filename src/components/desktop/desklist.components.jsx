import React from "react";
import { connect } from "react-redux";
import { getOptionsData } from "../../redux/options/options.selectors";

const Desklist = (props) => {
  const [dst, setDST] = React.useState(props.optionsData.dst);
  const [shc, setSHC] = React.useState(props.optionsData.shc);
  const [dgc, setDGC] = React.useState(props.optionsData.dgc);
  const [doc, setDOC] = React.useState(props.optionsData.doc);
  const [dsc, setDSC] = React.useState(props.optionsData.dsc);
  const [dcc, setDCC] = React.useState(props.optionsData.dcc);
  const [ddc, setDDC] = React.useState(props.optionsData.ddc);

  React.useEffect(() => {
    setDST(props.optionsData.dst);
    setSHC(props.optionsData.shc);
    setDGC(props.optionsData.dgc);
    setDOC(props.optionsData.doc);
    setDSC(props.optionsData.dsc);
    setDCC(props.optionsData.dcc);
    setDDC(props.optionsData.ddc);
  }, [props.optionsData]);

  return (
    <>
      <span className="closeChat">{dcc}</span>
      <span className="delayChat">{ddc}</span>
      <span className="gameChat">{dgc}</span>
      <span className="openChat">{doc}</span>
      <span className="sendChat">{dsc}</span>
      <span className="shortcutMode">{shc}</span>
      <span className="shortcutToggle">{dst}</span>
    </>
  );
};

const mapStateToProps = (state) => ({
  optionsData: getOptionsData(state)
});

export default connect(mapStateToProps, null)(Desklist);
