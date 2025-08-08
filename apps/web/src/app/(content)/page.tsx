'use client';

import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div className='flex items-center gap-4'>
          <Image src='/favicon.svg' alt='Project logo' width={40} height={40} priority />
          <h1 className='text-2xl font-bold'>Orca System</h1>
        </div>

        {user ? (
          <div className='bg-white rounded-lg shadow p-6 w-full max-w-2xl'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>欢迎回来，{user.username}！</h2>
            <p className='text-gray-600 mb-4'>这是一个基于 Monorepo 结构的现代 Web 应用模板。</p>
            <ol className='list-inside list-decimal text-sm/6 text-gray-600 font-[family-name:var(--font-geist-mono)]'>
              <li className='mb-2 tracking-[-.01em]'>
                使用{' '}
                <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold'>
                  monorepo
                </code>
                结构进行项目管理
              </li>
              <li className='mb-2 tracking-[-.01em]'>集成完整的用户认证和授权系统</li>
              <li className='tracking-[-.01em]'>采用 Turborepo 实现高效构建和依赖管理</li>
            </ol>
          </div>
        ) : (
          <div className='text-center sm:text-left'>
            <p className='text-gray-600 mb-6'>这是一个基于 Monorepo 结构的现代 Web 应用模板，提供完整的用户系统。</p>
            <ol className='list-inside list-decimal text-sm/6 font-[family-name:var(--font-geist-mono)] mb-8'>
              <li className='mb-2 tracking-[-.01em]'>
                使用{' '}
                <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold'>
                  monorepo
                </code>
                结构进行项目管理
              </li>
              <li className='mb-2 tracking-[-.01em]'>包含多个应用和共享包</li>
              <li className='tracking-[-.01em]'>采用 Turborepo 实现高效构建和依赖管理</li>
            </ol>
            <div className='flex gap-4 justify-center sm:justify-start'>
              <a
                href='/login'
                className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8'
              >
                登录
              </a>
              <a
                href='/register'
                className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8'
              >
                注册
              </a>
            </div>
          </div>
        )}

        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <a
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto'
            href='https://turbo.build/repo'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M12 8V12L15 15'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Turborepo文档
          </a>
          <a
            className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]'
            href='https://nextjs.org/docs'
            target='_blank'
            rel='noopener noreferrer'
          >
            Next.js文档
          </a>
        </div>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/file.svg' alt='File icon' width={16} height={16} />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
