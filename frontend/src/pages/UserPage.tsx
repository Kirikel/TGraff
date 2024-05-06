import { useEffect } from "react";
import { ImagesSlider } from "../components/ImagesSlider";
import { UserChat } from "../components/UserChat";
import { v4 as uuidv4 } from 'uuid';

interface IUserPage {
    id: string,
    setId: React.Dispatch<React.SetStateAction<string>>
}

export function UserPage({id, setId}:IUserPage){
    useEffect(()=>{
        setId(uuidv4())
    },[])

    return <div className="flex">
        <ImagesSlider />
        <UserChat id={id} />
    </div>
}