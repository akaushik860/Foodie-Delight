import React from "react";

const ResturantBox = ({ Item, removeRest,editRest }) => {
  return (
    <div className="cardbox">
      <div className="cardbox-name">
        {Item?.name}
        <span>
          <img src="/mapicon.png" width="20px" height="20px"></img>{" "}
          {Item?.place}
        </span>
      </div>
      <div className="cardbox-pic">
        <img src="/place1.jpg"></img>
      </div>
      <div className="cardbox-other">
        <div className="cardbox-left">
          <div className="cardbox-desc">{Item?.description}</div>
        </div>
        <div className="cardbox-right">
          {Item?.type === "veg" ? <img src={"/veg.png"} width="30px" height="30px"></img> : <img src={"/non-veg.png"} width="30px" height="30px"></img>}
         {Item?.parking && <div className="parking-box">P</div>}
          <div className="rating-box">{Item?.rating}</div>
        </div>
      </div>
      <div className="cardbox-other" style={{ marginTop: "10px" }}>
        <div className="cardbox-left">
          <div className="cardbox-desc-2">
            <img src="/heart.png" width="20px"></img> <b>{Item?.famousDish}</b>
          </div>
        </div>
        <div className="cardbox-right">
          <img src={"/armchair.png"} width="30px" height="25px"></img>
          <div className="" style={{ fontWeight: "700" }}>
            {Item?.totalSeats}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img src="/phone.png" width="20px"></img>
          {Item?.contact}
        </div>
        <div style={
          {display:"flex",gap:"10px"}
        }>
          <div
            onClick={() => editRest(Item?._id)}
            style={{ cursor: "pointer" }}
          >
            <img src="/pen.png" width="30px" height="30px"></img>
          </div>
          <div
            onClick={() => removeRest(Item?._id)}
            style={{ cursor: "pointer" }}
          >
            <img src="/bin.png" width="30px" height="30px"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResturantBox;
