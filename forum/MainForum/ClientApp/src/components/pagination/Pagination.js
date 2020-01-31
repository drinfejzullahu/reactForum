import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";

const Pagination = props => {
  const pageNumbers = [];

  const [filterFrom, setfilterFrom] = useState(0);
  const [filterTo, setfilterTo] = useState(3);

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNext = () => {
    setfilterFrom(filterFrom + 1);
    setfilterTo(filterTo + 1);
  };
  const handlePrev = () => {
    setfilterFrom(filterFrom - 1);
    setfilterTo(filterTo - 1);
  };
  return (
    <div>
      <Box display="flex" flexDirection="row" border="0 auto">
        <Button color="primary" fullWidth onClick={handlePrev}>
          Prev
        </Button>
        {pageNumbers.slice(filterFrom, filterTo).map(number => (
          <Button
            fullWidth
            style={{ marginLeft: "1%" }}
            color="primary"
            onClick={() => props.paginate(number)}
            key={number}
          >
            {number}
          </Button>
        ))}
        <Button color="primary" fullWidth onClick={handleNext}>
          Next
        </Button>
      </Box>
    </div>
  );
};
export default Pagination;
