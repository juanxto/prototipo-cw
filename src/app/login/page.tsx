'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Users, Info } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Verificar credenciais fixas
    if (formData.email === 'admin' && formData.password === 'password') {
      setTimeout(() => {
        setLoading(false);
        router.push('/dashboard');
      }, 1000);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError('Credenciais inválidas. Use admin/password');
      }, 1000);
    }
  };

  const handleIntegrantesClick = () => {
    router.push('/integrantes');
  };

  const preencherCredenciais = () => {
    setFormData({
      email: 'admin',
      password: 'password'
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-red-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full space-y-4">
        {/* Logo e Título - Compacto */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-red-400 p-2 rounded-full shadow-lg">
              <img 
                src="/favicon.png" 
                alt="CoreWave Logo" 
                className="w-6 h-6"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">CoreWave</h1>
          <p className="text-gray-600 text-sm">Sistema de Monitoramento de Eventos Extremos</p>
        </div>

        {/* Card de Boas-vindas - Compacto */}
        <div className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Bem-vindo ao CoreWave
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">
            Sistema avançado de detecção e análise de eventos extremos da natureza.
          </p>
        </div>

        {/* Informações de Login para Protótipo - Compacto */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-blue-800 mb-1">
                Acesso ao Protótipo
              </h3>
              <div className="bg-white rounded-lg p-2 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Usuário:</span>
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">admin</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Senha:</span>
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">password</code>
                </div>
              </div>
              <button
                onClick={preencherCredenciais}
                className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Preencher automaticamente
              </button>
            </div>
          </div>
        </div>

        {/* Formulário de Login - Compacto */}
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Usuário"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-600 text-sm"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-600 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white py-2.5 rounded-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-200 disabled:opacity-50 text-sm"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Botão Integrantes - Compacto */}
        <div className="text-center">
          <button
            onClick={handleIntegrantesClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
          >
            <Users className="w-4 h-4" />
            Ver Integrantes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;