import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import logo from "../../assets/img/logo2.png";

interface LoginTypes {
   email: string;
   password: string;
}

function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginTypes>();
   const onSubmit: SubmitHandler<LoginTypes> = (data) => console.log(data);

   return (
      <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
         <img className="logo" src={logo} alt="logo" />
         <div className="input-box">
            <input
               placeholder="이메일"
               className="email-input"
               {...register("email", {
                  required: true,
               })}
            />
            {errors.email && (
               <span className="error-message">
                  이메일 형식으로 입력해주세요
               </span>
            )}
         </div>
         <div className="input-box">
            <input
               placeholder="비밀번호"
               type="password"
               className="password-input"
               {...register("password", {
                  required: true,
               })}
            />
            {errors.password && (
               <span className="error-message">8자 이상 입력해주세요</span>
            )}
         </div>
         <button type="submit" className="submit">
            LOGIN
         </button>
      </LoginFormContainer>
   );
}

export default LoginForm;

const LoginFormContainer = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 35%;
   margin-bottom: 1%;
   .logo {
      position: absolute;
      width: 200px;
      height: 200px;
      top: -100px;
      left: 50%;
      transform: translate(-50%, 0);
   }
   .input-box {
      width: 70%;
      height: 70px;
      .email-input,
      .password-input {
         width: 100%;
         height: 40px;
         font-size: var(--font-base);
         padding-left: 2%;
         margin-bottom: 5px;
         border: 0.5px solid var(--second-color3);
         border-radius: 5px;
      }
      .error-message {
         font-size: var(--font-small);
         color: red;
      }
   }
   .submit {
      width: 70%;
      height: 40px;
      font-size: var(--font-base);
      color: white;
      cursor: pointer;
      background-color: var(--second-color3);
      border: 2px outset var(--second-color3);
      border-radius: 5px;
      transition-duration: 0.2s;
      &:hover {
         background-color: var(--third-color3);
         border-color: var(--third-color3);
         transition-duration: 0.2s;
      }
   }
`;
