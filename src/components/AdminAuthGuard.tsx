"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("admin_logged_in");
        if (!isLoggedIn) {
            router.push("/admin/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return null; // or a spinner
    }

    return <>{children}</>;
}
