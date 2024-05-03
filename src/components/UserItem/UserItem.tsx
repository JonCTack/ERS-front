import axios from "axios"
import { UserInterface } from "../../interfaces/UserInterface"
import { useState } from "react"

export const UserItem: React.FC<UserInterface> = (item: UserInterface) => {

    const[updateUser, setUpdateUser] = useState<UserInterface>({
        role:"MANAGER"
    })

    const deleteUser = async () => {
        const response = await axios.delete("http://localhost:8080/users/" + item.userId, {withCredentials:true})
        alert(response.data)
    }

    const patchUserToManager = async () => {
        const response = await axios.patch("http://localhost:8080/users/" + item.userId, updateUser, {withCredentials:true})
        alert("user is now a manager")
    }

    return(
        <div>
            <h3>{item.firstName} {item.lastName}</h3>
            <button onClick={deleteUser}>delete user</button>
            <button onClick={patchUserToManager}>make manager</button>
        </div>
    )
}