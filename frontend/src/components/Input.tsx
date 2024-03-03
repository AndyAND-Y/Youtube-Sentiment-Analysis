"use client";

import { useCallback, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { extractYouTubeVideoId } from '@/util/extractYtbId';

const SearchInput = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const inputRef = useRef<HTMLInputElement | null>(null);

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
                router.replace(pathname)
                return
            }

            const value = extractYouTubeVideoId(searchTerm);

            if (!value) {
                router.replace(pathname)
                return
            }

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


    return (
        <>
            <div className='relative flex items-center w-full'>
                <input
                    type="search"
                    placeholder="Search..."
                    ref={inputRef}
                    className="w-full px-4 py-4 border-none rounded-md appearance-none outline-none text-slate-950"
                    required
                    onKeyDown={handleKeyPress}
                />
                <button
                    className='absolute bg-neutral-900 rounded-2xl p-2 end-2'
                    onClick={() => changeSeachParams()}
                >
                    Check!
                </button>
            </div >
        </>
    );
};

export default SearchInput;