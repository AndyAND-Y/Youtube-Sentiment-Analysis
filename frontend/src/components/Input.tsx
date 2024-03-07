"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { extractYouTubeVideoId } from '@/util/extractYtbId';

function SearchIcon() {

    return <div className='h-6 w-6 sm:h-8 sm:w-8 bg-white p-[6px] rounded-full'>
        <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
    </div>
}

const SearchInput = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )

    const changeSeachParams = useCallback(
        () => {
            const searchTerm = inputRef.current?.value;

            if (!searchTerm) {
                setErrorMessage("No input! Inset a valid youtube link!");
                // router.replace(pathname)
                return
            }

            const value = extractYouTubeVideoId(searchTerm);

            if (!value) {
                setErrorMessage("Not a valid youtube video link!")
                // router.replace(pathname)
                return
            }

            setErrorMessage(null);
            router.replace(pathname + '?' + createQueryString('v', value))

        }, [createQueryString, pathname, router]
    )

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                changeSeachParams();
            }
        }, []
    );

    useEffect(() => {

        const input = inputRef.current;
        if (!input) {
            return
        }

        let cnt = 0;
        const interval = setInterval(() => {
            if (cnt == 4) {
                cnt = 0;
            }

            input.placeholder = "Input a youtube video link " + '.'.repeat(cnt);
            cnt += 1

        }, 500);

        return () => clearInterval(interval);

    }, [])


    return (
        <div className='w-full flex flex-col'>
            <div className='relative flex items-center w-full'>
                <input
                    type="search"
                    placeholder="Input a youtube video link ..."
                    ref={inputRef}
                    className="w-full px-4 py-4 placeholder:font-bold placeholder:text-gray-950 border-none rounded-md appearance-none outline-none text-slate-950"
                    required
                    onKeyDown={handleKeyPress}
                />
                <button
                    className='absolute flex items-center gap-2 bg-neutral-900 rounded-2xl p-2 end-2 hover:scale-110 font-bold transition-all duration-300'
                    onClick={() => changeSeachParams()}
                >
                    <SearchIcon /> Check!
                </button>
            </div >
            {errorMessage && (
                <div className='text-red-500 p-1' >{errorMessage}</div>
            )}
        </div>
    );
};

export default SearchInput;