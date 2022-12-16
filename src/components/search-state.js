import { FaGithub } from "react-icons/fa"

export default function SearchState({ message }){
  return (
  <div>
    <FaGithub style={{width: "120px", height: "120px"}}/>
    <p>{message}</p>
  </div>  
  )
}