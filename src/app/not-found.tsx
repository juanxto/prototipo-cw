// app/not-found.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, AlertTriangle, Search } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-50"></div>
      
      <div className="relative max-w-md w-full space-y-6 text-center">
        {/* Logo e Título */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <img 
                src="/favicon.png" 
                alt="CoreWave Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">CoreWave</h1>
          <p className="text-white text-sm sm:text-base opacity-90 px-4">
            Sistema de Monitoramento de Eventos Extremos
          </p>
        </div>

        {/* Ícone de Erro 404 */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-6xl sm:text-7xl font-bold text-gray-800 mb-2">404</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Página não encontrada
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              A página que você está procurando não existe ou foi movida para outro local.
            </p>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100">
          <div className="flex items-start gap-3">
            <Search className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1 text-left">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                O que você pode fazer:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Verificar se o endereço está correto</li>
                <li>• Voltar à página anterior</li>
                <li>• Ir para a página inicial</li>
                <li>• Acessar o sistema de login</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm sm:text-base inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Ir para Início
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoBack}
              className="bg-white text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg border border-gray-100 text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            
            <button
              onClick={handleGoLogin}
              className="bg-white text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg border border-gray-100 text-sm sm:text-base"
            >
              Login
            </button>
          </div>
        </div>

        {/* Rodapé com informação adicional */}
        <div className="text-center pt-4">
          <p className="text-white text-xs sm:text-sm opacity-75">
            Se o problema persistir, entre em contato com o suporte técnico
          </p>
        </div>
      </div>
    </div>
  );
}