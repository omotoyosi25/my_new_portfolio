'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/classNames'
import MenuModal from './MobileHeader'
import { Button } from '../core/Button'
import { Menubar } from '../icons'

const MainHeader = () => {

    const [isMobileMenuModal, setMobileMenuModal] = useState(false)

    const pathname = usePathname()

    const headerLink = [
        {
            link: '/',
            name: 'Home',
        },
        {
            link: '#about',
            name: 'About',
        },
        {
            link: '#projects',
            name: 'Projects',
        },
        {
            link: '#contact-us',
            name: 'Contact Us',
        },
    ]

    return (
        <header>
            <div className='flex justify-between items-center px-4 xl:px-16 py-10'>
                Abibat
                <nav className='md:flex gap-5 xl:gap-7 hidden'>
                    {
                        headerLink.map((href, index) => (
                            <div key={index}>
                                <Link
                                    href={href?.link}
                                    className={cn("hover:text-[#9C9C9C] text-sm",
                                        pathname == href?.link ? "text-[#32667d] font-semibold" : "text-[#9C9C9C]"
                                    )}
                                >{href?.name}
                                </Link>
                            </div>
                        ))
                    }
                </nav>
                <div className='flex md:hidden'>
                    <Button>
                        <Menubar />
                    </Button>
                </div>
                <Button
                    className='hidden md:flex border border-[#32667d] px-4 py-1.5 text-xs xl:text-sm font-medium'
                    type='button'
                >
                    Contact Me
                </Button>
            </div>

            {
                isMobileMenuModal &&
                <MenuModal
                    isMenuModal={isMobileMenuModal}
                    setMenuModal={setMobileMenuModal}
                    heading={''}
                />
            }

        </header>
    )
}

export default MainHeader