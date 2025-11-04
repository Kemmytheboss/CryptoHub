"use client";
import { createContext, useContext, useState} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = (email, username) => {
        setUser({email,username});
        localStorage.setItem("user", JSON.stringify({email, username}));
        router.push("/");
    };
    const logout = ()=> {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };
}