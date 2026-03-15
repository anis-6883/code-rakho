"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Code2, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("github");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='border-slate-700/50 bg-linear-to-b from-slate-900/95 to-slate-900/90 backdrop-blur-xl sm:max-w-md'>
        <DialogHeader className='space-y-4'>
          <div className='space-y-2 text-center'>
            <div className='flex justify-center mb-4'>
              <Link href='/' className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center'>
                  <Code2 className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold text-white'>Root</span>
              </Link>
            </div>
            <DialogTitle className='text-2xl font-bold text-white'>Welcome Back</DialogTitle>
            <p className='text-slate-400 text-sm'>Sign in to your account to continue</p>
          </div>
        </DialogHeader>

        <div className='space-y-4 py-6'>
          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className='w-full cursor-pointer h-11 bg-white hover:bg-slate-100 text-slate-900 font-semibold transition-all duration-300 flex items-center justify-center gap-3 group'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* GitHub Login Button */}
          <Button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className='w-full cursor-pointer h-11 bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-slate-700/50 group'
          >
            <Github className='w-5 h-5' />
            <span>Continue with GitHub</span>
          </Button>
        </div>

        {/* Divider */}
        {/* <div className='flex items-center gap-3 py-2'>
          <div className='flex-1 h-px bg-slate-700/50'></div>
          <span className='text-xs text-slate-500'>Or continue with email</span>
          <div className='flex-1 h-px bg-slate-700/50'></div>
        </div> */}

        {/* Email Login Button */}
        {/* <Button
          variant='outline'
          className='w-full h-11 border-slate-700/50 text-slate-300 hover:bg-slate-800/50 font-semibold transition-all duration-300 flex items-center justify-center gap-3 bg-transparent'
        >
          <Mail className='w-5 h-5' />
          <span>Sign in with Email</span>
        </Button> */}

        {/* Footer */}
        {/* <div className='text-center pt-4'>
          <p className='text-slate-400 text-sm'>
            Don{"'"}t have an account?{" "}
            <button className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>Sign up</button>
          </p>
        </div> */}

        {/* Terms */}
        <p className='text-xs text-slate-500 text-center'>
          By continuing, you agree to our{" "}
          <a href='#' className='text-slate-400 hover:text-slate-300 underline'>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href='#' className='text-slate-400 hover:text-slate-300 underline'>
            Privacy Policy
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
