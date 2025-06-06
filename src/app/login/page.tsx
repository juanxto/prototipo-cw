'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Users, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simular delay de login
    setTimeout(() => {
      const success = login(formData.email, formData.password);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Credenciais inválidas. Use admin/password');
      }
      setLoading(false);
    }, 1000);
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
    <div className="h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-50"></div>
      
      <div className="relative max-w-md w-full space-y-4">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <img 
                src="/favicon.png" 
                alt="CoreWave Logo" 
                className="w-8 h-8"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">CoreWave</h1>
          <p className="text-white text-sm mt-1">Sistema de Monitoramento de Eventos Extremos</p>
        </div>

        {/* Card de Boas-vindas */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bem-vindo ao CoreWave
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sistema avançado de detecção e análise de eventos extremos da natureza.
          </p>
        </div>

        {/* Informações de Login para Protótipo */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Acesso ao Protótipo
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Usuário:</span>
                  <code className="bg-white px-2 py-1 rounded text-gray-800 font-mono">admin</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Senha:</span>
                  <code className="bg-white px-2 py-1 rounded text-gray-800 font-mono">password</code>
                </div>
              </div>
              <button
                onClick={preencherCredenciais}
                className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Preencher automaticamente
              </button>
            </div>
          </div>
        </div>

        {/* Formulário de Login */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Usuário"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Botão Integrantes */}
        <div className="text-center">
          <button
            onClick={handleIntegrantesClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg border border-gray-100"
          >
            <Users className="w-5 h-5" />
            Ver Integrantes
          </button>
        </div>
      </div>
    </div>
  );
};