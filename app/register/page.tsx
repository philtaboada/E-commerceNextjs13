import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Formwrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = async () => {

    const currentUser = await getCurrentUser()
    return ( <Container>
        <Formwrap>
            <RegisterForm currentUser={currentUser}/>
        </Formwrap>
    </Container> );
}
 
export default Register;