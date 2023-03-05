import React, { useEffect, useRef } from "react";
import Friend from "../social/friend.component";
import Block from "../social/block.component";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatmsgs" style={{ height: "100%", overflowY: "scroll", maxHeight: 'calc(50vh - 150px)' }}>
      {messages &&
        messages.map((data, index) => (
          <div key={index}>
            {data?.uid ? (
              <p
                key={"message" + index}
                className={`borderRight-${data.ucc}`}
                style={{
                  textAlign: "right",
                  paddingRight: "3px"
                }}
              >
                {data?.msg}
              </p>
            ) : data?.cid.toLowerCase().includes("anonymous") ||
              data?.cid.toLowerCase().includes("system") ? (
              <div
                key={data?.key}
                className={`borderLeft-${data.ucc}`}
                style={{
                  textAlign: "left",
                  paddingLeft: "3px",
                  paddingBottom: 0,
                  marginBottom: "1rem"
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridGap: "6px"
                  }}
                >
                  <b style={{ margin: "0" }}>{data?.cid}:</b>
                  <p style={{ margin: "0" }}>{data?.msg}</p>
                </div>
              </div>
            ) : (
              <details
                key={data?.key}
                className={`borderLeft-${data.ucc}`}
                style={{
                  textAlign: "left",
                  paddingLeft: "3px",
                  paddingBottom: 0,
                  marginBottom: "1rem"
                }}
              >
                <summary
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridGap: "6px"
                  }}
                >
                  <b style={{ margin: "0" }}>{data?.cid}:</b>
                  <p style={{ margin: "0" }}>{data?.msg}</p>
                </summary>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginTop: ".5rem"
                  }}
                >
                  <Friend playerID={data?.uid} />
                  <Block playerID={data?.uid} />
                </div>
              </details>
            )}
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
