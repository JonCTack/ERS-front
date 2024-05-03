import { useState } from "react"
import { UserInterface } from "../../interfaces/UserInterface"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { state } from "../../contexts/store";

export const Login: React.FC = () => {

    const[user, setUser] = useState<UserInterface>({
        username:"",
        password:""
    })

    const navigate = useNavigate();

    const login = async () => {
        //yo look at this login code holy shit
        const response = await axios.post("http://localhost:8080/users/login", 
        user,
        {withCredentials:true})
        .then((response) => {
                state.userSessionData = response.data;
                alert("welcome, " + response.data.firstName);
                navigate("/reimbursements");
        })
        .catch((error) => {
            alert(error.data);
        })
    }

         //function to store input box values
    const storeValues = (input:any) => {
 
        //if the input that has changed is the "username" input, change the value of username in the user state object
 
        if(input.target.name === "username"){
            setUser((user) => ({...user, username:input.target.value}))
        } else {
            setUser((user) => ({...user, password:input.target.value}))
        }
        

    }

    return(
        <div className="login">
            <div className="text-container">
                <h1>Employee Reimbursement System</h1>
                <h3>Sign in to review reimbursements</h3>

                <div className="input-container">
                    <input type="text" placeholder="username" name="username" onChange={storeValues}/>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="password" name="password" onChange={storeValues}/>
                </div>
                <button className="login-button" onClick={login}>Login</button>
                <button className="login-button" onClick={() => navigate("/register")}>Register New Account</button>
            </div>
        </div>
    )
}