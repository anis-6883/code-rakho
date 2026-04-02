import { getUserLocale } from "@/config/locale";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Footer from "./Footer";
import { Navbar } from "./Navbar";


const ClientLayout = async ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const locale = await getUserLocale();
    const supabase = await createSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className='min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950'>
            <Navbar locale={locale} user={user} />
            {children}
            <Footer />
        </div>
    )
}

export default ClientLayout
