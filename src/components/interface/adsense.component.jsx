import AdSense from "react-adsense";

const Adsense = () => {
  return (
    <AdSense.Google
      client="ca-pub-7292810486004926"
      slot="7806394673"
      style={{
        display: "block",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "263px",
        maxHeight: "6px",
        overflow: "hidden",
        background: "white",
        zIndex: "1000"
      }}
      format="in-feed"
    />
  );
};

export default Adsense;
