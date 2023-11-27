import React from "react";

export default function TimeStamp({ timestamp }) {
  return (
    <>
      <label className="timestamp">
        Currencies updated on:{" "}
        {timestamp
          ? new Date(timestamp * 1000).toLocaleString()
          : "Waiting for data..."}
      </label>
    </>
  );
}
