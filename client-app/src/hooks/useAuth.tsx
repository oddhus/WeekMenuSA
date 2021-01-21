import { useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState<string | null>("123")

    return {
        token
    }
}