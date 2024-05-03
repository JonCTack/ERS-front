import { useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register: React.FC = () => {

        const[user, setUser] = useState<UserInterface>({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        role:"EMPLOYEE"
    });

    const navigate = useNavigate();


        const storeValues = (input:any) => {

        //if the input that has changed is the username input, change the value of username in the user state obj
            if(input.target.name === "username"){
                setUser((user) => ({...user, username:input.target.value}))
            } else if(input.target.name === "password") {
                setUser((user) => ({...user, password:input.target.value}))
            } else if(input.target.name === "firstName") {
                setUser((user) => ({...user, firstName:input.target.value}))
            } else {
                setUser((user) => ({...user, lastName:input.target.value}))
            }
    }

        const register = async () => {

        const response = await axios.post("http://localhost:8080/users/register", user);
        alert(response.data) //{user} was created
        navigate("/")

    }

    return (
    <div className="login">
      <div className="text-container">
        <h3>Begin tracking your reimbursements</h3>

        <div className="input-container">
          <input
            type="text"
            placeholder="first name"
            name="firstName"
            onChange={storeValues}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="last name"
            name="lastName"
            onChange={storeValues}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={storeValues}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="password"
            name="password"
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