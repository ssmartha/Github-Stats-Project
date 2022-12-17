import styled from "@emotion/styled";
import { BsFillStarFill } from "react-icons/bs"

const StyledUserCard = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 12px;
  width: 300px;
  height: 56px;
  background-color: #FFFFFF;
  box-shadow: 2px 2px 0px rgba(0 0 0 0.25);
  border-radius: 4px;
`;

const StyledAvatar = styled("img")`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;


function UserCard({
  id,
  img,
  user,
  name="undefined",
  icon = "undefined",
}) {
  console.log(id, img, user,name,icon)

  return (
    <div>
      <StyledUserCard key={id}>
        <StyledAvatar src={img}/>
          <div>
            <p key={id}>{user}</p>
            {name !== "undefined" && <p>{name}</p>}
          </div>
          {icon !== "undefined" && <p style={{marginLeft: "auto"}} > <BsFillStarFill/></p>}
      </StyledUserCard>
    </div>
  );
}

export default UserCard;

// export default function UserCard({ message }) {
//   return (
//   <div>
//     <FaGithub style={{width: "120px", height: "120px"}}/>
//     <p>{message}</p>
//   </div>
//   )
// }
