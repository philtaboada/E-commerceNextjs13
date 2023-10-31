import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Formwrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

const Login = async () => {

    const currentUser = await getCurrentUser()
    
    return (<Container>
        <Formwrap>
            <LoginForm currentUser={currentUser} />
        </Formwrap>
    </Container>);
}

export default Login;