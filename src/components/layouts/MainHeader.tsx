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
            <div className='flex justify-between items-center py-10'>
                <div className="font-bold text-xl tracking-tight">Abibat</div>
                <nav className='md:flex gap-5 xl:gap-8 hidden items-center'>
                    {
                        headerLink.map((href, index) => (
                            <div key={index}>
                                <Link
                                    href={href?.link}
                                    className={cn("text-sm font-medium transition-colors hover:text-llaventa-600 dark:hover:text-llaventa-400",
                                        pathname == href?.link ? "text-llaventa-600 dark:text-llaventa-400 font-semibold" : "text-gray-500 dark:text-gray-400"
                                    )}
                                >{href?.name}
                                </Link>
                            </div>
                        ))
                    }
                </nav>
                <div className='flex md:hidden'>
                    <Button onClick={() => setMobileMenuModal(true)} className="bg-transparent text-foreground">
                        <Menubar />
                    </Button>
                </div>
                <Button
                    onClick={() => {
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className='hidden md:flex border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-transparent text-foreground px-5 py-2 text-sm font-medium rounded-lg transition-all'
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