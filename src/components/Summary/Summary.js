import React, { useEffect, useState } from "react";
import SummaryPayBox from "./SummaryPayBox";
import { totalSummary, paymentComplete } from "../../api/apiFunc";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { setSumExpApiToggle } from "../../redux/actions/actionTypes";
import "./Summary.css";
import PaymentCompleteModal from "../PaymentCompleteModal/PaymentCompleteModal";

const Summary = () => {
  const dispatch = useDispatch();
  const [sumData, setSumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userData = useSelector((state) => state.userData);
  const sumExpApiToggle = useSelector((state) => state.sumExpApiToggle);
  const [paymentModal, setPaymentModal] = useState(null);

  const handlePayment = async () =>{
    const paymentApi = await paymentComplete(paymentModal);
    if(paymentApi && paymentApi.status === 200) {
      dispatch(setSumExpApiToggle(!sumExpApiToggle));
      toast.success(paymentApi.message);
    } else {
      toast.error(paymentApi.message);
    }
    setPaymentModal(null);
  };

  const handlePaymentModal = (value) => {
    setPaymentModal(value);
  }

  useEffect(() => {
    const fetchTotalSummary = async () => {
      try {
        setLoading(true);
        const result = await totalSummary({ userId: userData.data._id });
        if(result && result.status === 200) {
          setSumData(result.summary);
        }
      } catch (error) {
        console.error(error)
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
          <SummaryPayBox data={sumData} user={userData.data} handlePaymentModal={handlePaymentModal}/>
        </div>
      )}
      <PaymentCompleteModal open={paymentModal ? true : false} handleClose={()=>setPaymentModal(null)} handlePayment={handlePayment}/>
    </React.Fragment>
  );
};

export default Summary;
