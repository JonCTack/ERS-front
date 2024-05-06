import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import axios from "axios"
import { ReimbursementItem } from "../ReimbursementItem/ReimbursementItem"
import "./Reimbursements.css"
import { useNavigate } from "react-router-dom"
import {state} from "../../contexts/store"

export const Reimbursements: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    const [statusView, setStatusView] = useState<string>("PENDING")


    useEffect(() => {
        getAllReimbursements()
    })
    const navigate = useNavigate();

    const storeStatus = (input:any) => {
        setStatusView(input.target.value)
    }

    const getAllReimbursements = async () => {
        const response = await axios.get("http://localhost:8080/reimbursements", {withCredentials:true})
        .then((response) => {
            console.log(response.data)
            setReimbursements(response.data === ""? [] : response.data)
        } )
        .catch(() => {
            navigate("/")
        })
        

    }

    const logOut = async () => {
        const response = await axios.post("http://localhost:8080/users/logout", null , {withCredentials:true})
        .then(() => {
            state.userSessionData = {
        userId: 0,
        firstName: "",
        lastName: "",
        role: ""
            }
        })
        .then( () => {navigate("/")})
       
        
    }

    console.log(state.userSessionData.userId)

    return(
        state.userSessionData.userId !== 0 ?  
        reimbursements[0] === null ?
        <div>
            <button onClick={() => navigate("/")}>back to login</button>
            <button onClick={logOut}>logout</button>
            <button onClick={() => navigate("/reimbursements/new")}>make a new reimbursement</button>
            
        </div>
        :
        state.userSessionData.role === "MANAGER" ?
        <div>
            <button onClick={() => navigate("/")}>back to login</button>
            <button onClick={logOut}>logout</button>
            <button onClick={() => navigate("/users")}>view users</button>
            <label htmlFor="status-filter">Status: </label>
            <select name="Status Filter" id="status-filter" onChange={storeStatus}>
                 <option value="PENDING">Pending</option>
                 <option value="APPROVED">Approved</option>
                 <option value="DENIED">Denied</option>
            </select>
            {reimbursements.map((item, index) => {
                return(
                    item.status === statusView ?
                    <div key={index} className="reimburseContainer">
                        <ReimbursementItem {...item} ></ReimbursementItem>
                    </div>
                    :
                    ""
                )
            })}
        </div>
        :
        <div>
            <button onClick={() => navigate("/")}> back to login </button>
            <button onClick={logOut}>logout</button>
            <button onClick={() => navigate("/reimbursements/new")}>make a new reimbursement</button>
            <label htmlFor="status-filter">Status: </label>
            <select name="Status Filter" id="status-filter" onChange={storeStatus}>
                 <option value="PENDING">Pending</option>
                 <option value="APPROVED">Approved</option>
                 <option value="DENIED">Denied</option>
            </select>
            {reimbursements.map((item, index) => {
                return(
                    item.status === statusView ?
                    <div key={index} className="reimburseContainer">
                        <ReimbursementItem {...item} ></ReimbursementItem>
                    </div>
                    :
                    ""
                )
            })}
        </div>
        :
        <div>
        <button onClick={() => navigate("/")}>back to login</button>
        </div>
    )
}