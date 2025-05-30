'use client';

import React from 'react';
import { Plus, Bell, Users } from 'lucide-react';

const Header = ({ onAddEvent }) => {
  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src="/favicon.png" 
              alt="CoreWave Logo" 
              className="w-8 h-8 mr-3"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-white">CoreWave</h1>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Add Event Button - Hidden on mobile, shown on larger screens */}
            <button
              onClick={onAddEvent}
              className="hidden sm:flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Adicionar Evento</span>
              <span className="md:hidden">Adicionar</span>
            </button>
            
            {/* Mobile Add Button */}
            <button
              onClick={onAddEvent}
              className="sm:hidden p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Adicionar Evento"
            >
              <Plus className="w-5 h-5" />
            </button>
            
            {/* Notifications */}
            <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            {/* User Avatar */}
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;