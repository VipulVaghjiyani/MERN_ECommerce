import CommonForm from "@/components/common/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControl } from "@/config";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/store/auth-slice";


const initialState = {
    email: '',
    password : ''
}
function AuthLogin(){

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event){
        event.preventDefault();
        dispatch(login(formData)).then((data) => {
            if (data?.payload?.success) {
              toast({
                title: data?.payload?.message,
              });
            } else {
              toast({
                title: data?.payload?.message,
                variant: "destructive",
              });
            }
          });

    }
        return <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground ">Sign in to your account</h1>
            <p>Don't have an account
                <Link className="font-medium ml-2 text-primary hover:underline" to={"/auth/register"}>Register</Link></p>

        </div>
    <CommonForm 
        formControls={loginFormControl}
        buttonText={"Sign In"}    
        formData={formData}   
        setFormData={setFormData}
        onSubmit={onSubmit}
        />

    </div> 

    
}

export default AuthLogin;