import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  const [inputs, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
    const [showPassword, setshowPassword] = useState(false);
    const {loading,error,signup} =useSignUpWithEmailAndPassword()
  return (
    <>
      <Input
        placeholder="fullName"
        fontSize={14}
        type="text"
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => setInput({ ...inputs, fullName: e.target.value })}
      />
      <Input
        placeholder="username"
        fontSize={14}
        type="text"
        value={inputs.username}
        size={"sm"}
        onChange={(e) => setInput({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        size={"sm"}
        onChange={(e) => setInput({ ...inputs, email: e.target.value })}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          type= {showPassword ? "text":"password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInput({ ...inputs, password: e.target.value })}
        />
              <InputRightElement h="full">
              <Button variant={"ghost"} size={"sm"} onClick={() => setshowPassword(!showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      
              </Button>
              </InputRightElement>
          </InputGroup>
          
          {error && (
              <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                  <AlertIcon fontSize={12} />
                  {error.message}
              </Alert>
          )}
          <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}
              
           isLoading={loading}
              onClick={() => signup(inputs)}>
        Signup
      </Button>
    </>
  );
};

export default Signup;
