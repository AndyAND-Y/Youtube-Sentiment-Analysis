"use client";

import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { extractYouTubeVideoId } from '@/util/extractYtbId';

const SearchInput = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState('');


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )

    const changeSeachParams = useCallback(
        () => {

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

        }, [createQueryString, pathname, router, searchTerm]
    )

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            changeSeachParams();
        }, 500)

        return () => clearTimeout(delayDebounceFn);

    }, [changeSeachParams, searchTerm])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            className="px-4 py-2 w-2/3 border-none rounded-md appearance-none outline-none"
        />
    );
};

export default SearchInput;