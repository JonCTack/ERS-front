import { useNavigate } from "react-router-dom";
import { state } from "../../contexts/store"
import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import axios from "axios";
import { UserItem } from "../UserItem/UserItem";
import "./Users.css"

export const Users: React.FC = () => {


    const [users, setUsers] = useState<UserInterface[]>([])


    useEffect(() => {
        getAllUsers()
    })

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:8080/users", {withCredentials:true})
            setUsers(response.data) 
    }


    const navigate = useNavigate();

    return(
        state.userSessionData.role === "MANAGER"?
        <div>
            <button onClick={() => navigate("/reimbursements")}>back to reimbursements</button>
            {users.map((item, index) =>{
                return(
                    <div key={index} className="userContainer">
                        <UserItem {...item}></UserItem>
                    </div>
                )
            })}
        </div>
        :
        <div>
            <button onClick={() => navigate("/")}>back to login</button>
        </div>
    )
}