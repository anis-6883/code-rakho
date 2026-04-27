
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import { Files, LockKeyhole, LogOut, SquareUser } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "./confirm-modal";

export function ProfileDropdownMenu({ setCurrentUser, currentUser }: { setCurrentUser: (item: any) => void; currentUser: User }) {
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const { data: session }: any = useSession();

    const [open, setOpen] = useState(false);

    const supabase = getSupabaseBrowserClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setCurrentUser(null);
        toast.success('Logout successfully!');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex items-center justify-center">
                    <SquareUser className="w-6 h-6 text-[#B3B3B3]" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[286px] z-[1005] p-0" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="focus:bg-white">
                        <div className="w-full bg-[#FAFAFA]">

                            <div className="flex items-center justify-center gap-3 p-[10px]">
                                <div className="">
                                    <img className="w-[65px] h-[65px] rounded-full border-2 border-blue-600 object-cover" src={currentUser?.user_metadata?.avatar_url || "/images/profile.jpg"} alt="Profile" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="font-bricolage font-medium text-lg text-[#1C1C1C]">{currentUser?.user_metadata?.full_name && currentUser?.user_metadata?.full_name?.length > 17 ? `${currentUser?.user_metadata?.full_name?.slice(0, 17)}..` : currentUser?.user_metadata?.full_name}</span>
                                    <span className="font-bricolage font-normal text-sm text-[#666666]">{currentUser?.email}</span>
                                    {
                                        currentUser?.phone && (<span className="font-bricolage font-normal text-sm text-[#666666]">{currentUser?.phone}</span>)
                                    }
                                </div>
                            </div>

                            <div className="w-full flex justify-center items-center p-[10px]">
                                <Button onClick={() => setEditProfileOpen(true)} variant={'outline'} type="button" className="w-full font-bricolage border-primary text-primary font-semibold text-sm hover:text-white" size="default">
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setChangePasswordOpen(true)} className="px-3 py-2.5 cursor-pointer">
                        <LockKeyhole />
                        <span>Change Password</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={'#'}>
                        <DropdownMenuItem className="px-3 py-2.5 cursor-pointer">
                            <Files />
                            <span>My Code Snippets</span>

                        </DropdownMenuItem>
                    </Link>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpen(true)} className="px-3 py-2.5 text-[#F22727] cursor-pointer focus:text-[#F22727]">
                        <LogOut className="rotate-180" />
                        <span>Logout</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>


            </DropdownMenuContent>

            <ConfirmModal
                title="Logout Confirm!"
                description="Do You Want to Logout ?"
                open={open}
                onOpenChange={setOpen}
                onConfirm={handleLogout}
            />

        </DropdownMenu>
    )
}
