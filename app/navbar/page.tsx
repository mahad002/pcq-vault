"use client";

import { Fragment, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, User, Bell, Settings, LogOut, Shield } from 'lucide-react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [unreadAlerts, setUnreadAlerts] = useState(0)

  const fetchUnreadAlerts = async (email: string, token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/alerts?email=${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const unreadCount = data.alerts?.filter((alert: any) => !alert.read)?.length || 0;
        setUnreadAlerts(unreadCount);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    const isUserLoggedIn = !!email && !!token
    
    setIsLoggedIn(isUserLoggedIn)
    setIsAdmin(userRole === 'admin')
    
    if (isUserLoggedIn) {
      fetchUnreadAlerts(email, token)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    setIsLoggedIn(false)
    setIsAdmin(false)
    setIsProfileOpen(false)
    router.push('/')
  }

  const handleLogin = () => {
    router.push('/profile')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileMenu = document.getElementById('profile-menu')
      if (profileMenu && !profileMenu.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigation = [
    { name: 'Dashboard', href: '/', current: pathname === '/' },
    { name: 'Url Analysis', href: '/url', current: pathname === '/url' },
    { name: 'Code Analysis', href: '/code', current: pathname === '/code' },
    { name: 'About Us', href: '/about', current: pathname === '/about' },
  ]

  return (
    <nav className="bg-gray-800 relative z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                className="h-8 w-auto"
                src="/logo_white.png"
                alt="QryptShield"
                width={120}
                height={32}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn && (
              <Link
                href="/alerts"
                className="relative p-2 text-gray-400 hover:text-white mr-2"
              >
                <Bell className="h-6 w-6" />
                {unreadAlerts > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadAlerts}
                  </span>
                )}
              </Link>
            )}

            {isLoggedIn ? (
              <div className="relative ml-3" id="profile-menu">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="/pngegg.png"
                    alt=""
                    width={32}
                    height={32}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Your Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profileManagement"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}