import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function changePass() {
    const router = useRouter();

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_ANON
    );
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword,
                })
                if (data) {
                    alert("Password updated successfully!")
                    return router.push("/");
                }
                if (error) {
                    return alert("There was an error updating your password.")
                }
            }
            if (event == 'SIGNED_IN') {
                return router.push("/");
            }
        })
    })
    return (
        <div style={{ width: "100wh", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        </div>
    );
}