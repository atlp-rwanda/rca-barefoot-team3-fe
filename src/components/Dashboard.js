import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Accomodations from './Accomodations';
import Bookings from './Bookings';
import { logout } from '../utils/api';

export default function Dashboard() {
  const { token } = useSelector((state) => state.auth);

  const [activeLink, setActiveLink] = useState('/');

  const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'Accommodations', path: '/accommodations' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'Analytics', path: 'analiytics' },
    { name: 'Settings', path: 'settings' },
    { name: 'Help', path: 'help' },
  ];
  const navigate = useNavigate();

  console.log('token:', token);

  if (!token) {
    navigate('/login');
  }

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="/" className="text-xl font-bold flex items-center lg:ml-2.5">
                <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                <span className="self-center whitespace-nowrap">Barefoot</span>
              </a>
            </div>
            <div className="flex items-center">
              <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                <span className="sr-only">Search</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden pt-8">

        <aside id="sidebar" className="fixed z-20 h-full top-0 left-0 pt-12 flex lg:flex flex-shrink-0 flex-col w-64" aria-label="Sidebar">
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 text-white bg-primary pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-primary">
                {links.map(({ name, path }) => (
                  <div className="space-y-2 pt-2">
                    <p onClick={() => setActiveLink(path)} className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2" rel="noreferrer">
                      <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">{name}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-40">
                <div className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2">
                  <svg className="w-6 h-6 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11 18v-1a1 1 0 00-1-1H6a3 3 0 01-3-3V7a3 3 0 013-3h4a1 1 0 001-1V3a1 1 0 00-1-1H6A5 5 0 001 7v7a5 5 0 005 5h4a1 1 0 001-1zM19 10a1 1 0 00-1 1v5a3 3 0 01-3 3H6a1 1 0 000 2h9a5 5 0 005-5V11a1 1 0 00-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M13 8a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zM7 8a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <button onClick={() => logout()}><span className="ml-3">Logout</span></button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>
            <div className="px-20 pt-12 bg-[#FFEADF] h-screen">
              {activeLink === '/accommodations' && <Accomodations />}
              {activeLink === '/bookings' && <Bookings />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
