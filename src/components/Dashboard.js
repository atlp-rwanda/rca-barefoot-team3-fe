import React from 'react';
import HotelCard from './HotelCard';
import Accomodations from './Accomodations';
import { logout } from '../utils/api';


export default function Dashboard() {
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
                <div className="space-y-2 pt-2">
                  <a href="/" target="_blank" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2" rel="noreferrer">
                      <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                      <span className="ml-3">Dashboard</span>
                    </a>
                </div>
                <div className="space-y-2 pt-2">
                  <a href="/" target="_blank" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2" rel="noreferrer">
                      <svg className="w-6 h-6  transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                      <span className="ml-3">Accomodations</span>
                    </a>
                </div>
                <div className="space-y-2 pt-2">
                  <a href="/" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3a2 2 0 012 2v1M6 3a2 2 0 00-2 2v1M8 21a2 2 0 002-2v-1M16 21a2 2 0 01-2-2v-1M4 11h16" />
                        </svg>

                      <span className="ml-3">Booking</span>
                    </a>
                </div>
                <div className="space-y-2 pt-2 pb-4">
                  <a href="/" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path d="M21,20H3a1,1,0,0,1-1-1V5A1,1,0,0,1,3,4H21a1,1,0,0,1,1,1V19A1,1,0,0,1,21,20ZM4,18H20V6H4Z" />
                          <path d="M12,14H8a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" />
                          <path d="M16,14H14a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z" />
                          <path d="M12,18H8a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" />
                          <path d="M16,18H14a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z" />
                        </svg>

                      <span className="ml-3">Analytics</span>
                    </a>
                </div>
                <div>
                  <hr className="space-y-2 pt-4" />
                  <a href="/" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2">
                      <svg className="w-6 h-6 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M11 18v-1a1 1 0 00-1-1H6a3 3 0 01-3-3V7a3 3 0 013-3h4a1 1 0 001-1V3a1 1 0 00-1-1H6A5 5 0 001 7v7a5 5 0 005 5h4a1 1 0 001-1zM19 10a1 1 0 00-1 1v5a3 3 0 01-3 3H6a1 1 0 000 2h9a5 5 0 005-5V11a1 1 0 00-1-1z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M13 8a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zM7 8a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      <span className="ml-3">Settings</span>
                    </a>
                </div>
                <div className="space-y-2 pt-2">
                  <a href="/" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M11.25 3.75c-3.6 0-6.581 2.559-7.229 6h-2.521l1.75 10.5 1.938-.344-.594-3.563h2.572c.384 0 .75-.136.979-.385.231-.251.345-.581.299-.911l-.874-5.245c-.044-.266-.248-.46-.511-.46-.262 0-.467.194-.51.46l-.745 4.469h-2.32c-.267 0-.517.107-.703.298-.186.191-.29.447-.29.717v.5c0 .414.336.75.75.75h5.25c.414 0 .75-.336.75-.75v-.5c0-.414-.336-.75-.75-.75h-1.5l1.5-9c.086-.514-.27-1.006-.787-1.089-.514-.085-1.007.271-1.09.787l-1.5 9h-3c-.414 0-.75.336-.75.75s.336.75.75.75h3.75c.414 0 .75-.336.75-.75l.375-2.25c.074-.413.425-.703.836-.703h1.125c.413 0 .762.29.836.703l.375 2.25c0 .414.336.75.75.75h3.75c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.007l1.5-9c.085-.514-.271-1.007-.787-1.09-.516-.086-1.008.27-1.09.787l-1.5 9h-1.498z" />
                        </svg>

                      <span className="ml-3">Help</span>
                    </a>
                </div>
                <div className="mt-40">
                  <div className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2">
                      <svg className="w-6 h-6 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M11 18v-1a1 1 0 00-1-1H6a3 3 0 01-3-3V7a3 3 0 013-3h4a1 1 0 001-1V3a1 1 0 00-1-1H6A5 5 0 001 7v7a5 5 0 005 5h4a1 1 0 001-1zM19 10a1 1 0 00-1 1v5a3 3 0 01-3 3H6a1 1 0 000 2h9a5 5 0 005-5V11a1 1 0 00-1-1z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M13 8a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1zM7 8a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      <button onClick={()=>logout()}><span className="ml-3">Logout</span></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>
            <div className="px-20 pt-12 bg-[#FFEADF] h-screen">
              <Accomodations />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
