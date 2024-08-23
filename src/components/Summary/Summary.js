import React, { useEffect, useState } from "react";
import SummaryPayBox from "./SummaryPayBox";
import { totalSummary } from "../../api/apiFunc";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import "./Summary.css";

const Summary = () => {
  const [sumData, setSumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userData = useSelector((state) => state.userData);
  const sumExpApiToggle = useSelector((state) => state.sumExpApiToggle);

  useEffect(() => {
    const fetchTotalSummary = async () => {
      try {
        setLoading(true);
        const result = await totalSummary({ userId: userData.data._id });
        if(result && result.status === 200) {
          setSumData(result.summary);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.data?._id) {
      fetchTotalSummary();
    }
  }, [userData, sumExpApiToggle]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="summary-message">
          <CircularProgress color="inherit" />
        </div>
      ) : error ? (
        <div className="summary-message">Something went wrong !</div>
      ) : sumData.length === 0 ? (
        <div className="summary-message">No due transactions</div>
      ) : (
        <div className="summary-content">
          <SummaryPayBox data={sumData} user={userData.data} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Summary;
