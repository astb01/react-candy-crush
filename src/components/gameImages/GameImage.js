import React from "react";

const GameImage = ({
  colour,
  idx,
  dragDropHandler,
  dragStartHandler,
  dragEndHandler,
}) => {
  return (
    <img
      src={colour}
      data-id={idx}
      alt={colour}
      key={`img-${idx}`}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={dragDropHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    />
  );
};

export default GameImage;
