import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import axios from "axios";
import { state } from "../../contexts/store";

export const MakeReimbursement: React.FC = () => {

        const[reimburse, setReimburse] = useState<ReimbursementInterface>({
            description:"",
            amount:0,
            status:"PENDING",
    });

    const navigate = useNavigate();


        const storeValues = (input:any) => {

        //if the input that has changed is the username input, change the value of username in the user state obj
            if(input.target.name === "description"){
                setReimburse((reimburse) => ({...reimburse, description:input.target.value}))
            } else {
                setReimburse((reimburse) => ({...reimburse, amount:input.target.value}))
            }
    }

        const register = async () => {

        const response = await axios.post("http://localhost:8080/reimbursements/create", reimburse, {withCredentials:true});
        alert(response.data) //{user} was created
        navigate("/reimbursements")

    }

    return (
    <div className="login">
      <div className="text-container">
        <h2>new reimbursement</h2>

        <div className="input-container">
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={storeValues}
          />
        </div>
       <div className="input-container">
          <input
            type="number"
            placeholder="amount"
            name="amount"
            onChange={storeValues}
          />
        </div>

        <button className="login-button" onClick={register}>
          Submit
        </button>
        <button className="login-button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
    )
}