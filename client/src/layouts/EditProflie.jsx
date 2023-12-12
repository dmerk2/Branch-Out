import EditProfileForm from "../common/components/EditProfileForm.jsx";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  return (
    <>
      <EditProfileForm userId={id} />
    </>
  );
}
