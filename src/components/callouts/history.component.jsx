import React from "react";
import { connect } from "react-redux";
import { getSocialHist } from "../../redux/social/social.selectors";

const History = (props) => {
  return (
    <div style={{ height: "100%", overflowY: "scroll", width: '223px', overflowX: 'hidden' }}>
      {props.socialHist?.length > 0 ? props.socialHist.map((data, index) => (
        <details
          key={index}
          style={{
            textAlign: "left",
            borderLeft: `3px solid rgb(var(--theme${
              data.col.charAt(0).toUpperCase() + data.col.slice(1)
            }))`,
            paddingLeft: "3px",
            paddingBottom: 0,
            marginBottom: "1rem"
          }}
        >
          <summary
            style={{
              display: "grid",
              gridTemplateColumns: "1fr"
            }}
          >
            <b style={{ margin: "0", whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{data.cal}</b>
          </summary>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr"
            }}
          >
            <p style={{ margin: "0" }}>{data.udn}</p>
          </div>
        </details>
      )) : 'No previous callouts!'}
    </div>
  );
};

const mapStateToProps = (state) => ({
  socialHist: getSocialHist(state)
});

export default connect(mapStateToProps, null)(History);
