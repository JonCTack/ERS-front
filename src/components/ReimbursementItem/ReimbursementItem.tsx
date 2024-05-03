import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import {state} from "../../contexts/store"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const ReimbursementItem: React.FC<ReimbursementInterface> = (item: ReimbursementInterface) => {
   
   const[showDescriptionEdit, setShowDescriptionEdit] = useState<string>("hidden")
   const[showStatusEdit, setShowStatusEdit] = useState<string>("hidden")
   const[descriptionEdit, setDescriptionEdit] = useState<ReimbursementInterface>({
    description:""
   })
   const[statusEdit, setStatusEdit] = useState<ReimbursementInterface>({
    status:"PENDING"
   })

   const toggleDescriptionEdit = () => {
        showDescriptionEdit === "hidden"?  setShowDescriptionEdit("") : setShowDescriptionEdit("hidden");
   }

    const toggleStatusEdit = () => {
        showStatusEdit === "hidden"?  setShowStatusEdit("") : setShowStatusEdit("hidden");
   }
   
   const storeDesc = (input:any) => {
    setDescriptionEdit({...descriptionEdit, description:input.target.value})
   }

   const storeStatus = (input:any) => {
    setStatusEdit({...statusEdit,status:input.target.value})
    console.log(statusEdit)
   }

   const patchDesc = async () => {
    const response = await axios.patch("http://localhost:8080/reimbursements/" + item.reimbId + "/description", descriptionEdit, {withCredentials:true})
    if(response.status === 200){
        alert("description updated")
    }
   }
   
   const patchStatus = async () => {
    const response = await axios.patch("http://localhost:8080/reimbursements/"+ item.reimbId + "/resolve", statusEdit, {withCredentials:true})
    if(response.status === 200){
        alert("status updated")
    }
   }
   
    return(
        state.userSessionData.role === "MANAGER"? 
        <div>
            <h4> Status: {item.status} </h4>
            <p>  {item.description} </p>
            <p> Amount: {item.amount} </p>
            <button onClick={toggleStatusEdit}>Edit Status</button>
                <div className={showStatusEdit}>
                    <label htmlFor="approve">Approved</label>
                    <input type="radio" name="approval" id="approve" value="APPROVED" onChange={storeStatus} />
                    <label htmlFor="denied">Denied</label>
                    <input type="radio" name="approval" id="denied" value="DENIED" onChange={storeStatus} />
                    <button onClick={patchStatus}>Confirm</button>
                </div>

        </div>
        :
        <div>
            <h4> Status: {item.status} </h4>
            <p>  {item.description} </p>
            <p> Amount: {item.amount} </p>
            <button onClick={toggleDescriptionEdit}>Edit Description</button>

                <div className={showDescriptionEdit}>
                    <input type="text" placeholder="put description here" name="description" onChange={storeDesc}/>
                    <button onClick={patchDesc}>Confirm</button>
                </div>

        </div>
    )
}