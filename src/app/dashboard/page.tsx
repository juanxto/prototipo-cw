'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, MapPin, TrendingUp, Bell, Users, Activity } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEventos: 0,
    eventosAtivos: 0,
    severidadeAlta: 0,
    novasOcorrencias: 0
  });

  const chartData = [
    { name: 'Enchentes', value: 45, color: '#3b82f6' },
    { name: 'Incêndios', value: 32, color: '#ef4444' },
    { name: 'Terremotos', value: 18, color: '#f59e0b' },
    { name: 'Deslizamentos', value: 25, color: '#10b981' }
  ];

  const recentEvents = [
    { id: 1, tipo: 'Enchente', local: 'São Paulo, SP', severidade: 'alta', tempo: '2h atrás' },
    { id: 2, tipo: 'Incêndio', local: 'Brasília, DF', severidade: 'média', tempo: '4h atrás' },
    { id: 3, tipo: 'Deslizamento', local: 'Rio de Janeiro, RJ', severidade: 'alta', tempo: '6h atrás' }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setStats({
        totalEventos: 248,
        eventosAtivos: 23,
        severidadeAlta: 8,
        novasOcorrencias: 5
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, trend }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <p className="text-green-600 text-sm flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/favicon.png" 
                alt="CoreWave Logo" 
                className="w-8 h-8 font mr-3"
              />
              <h1 className="text-2xl font-bold text-gray-800">CoreWave</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard de Monitoramento</h2>
          <p className="text-gray-600">Visão geral dos eventos extremos em tempo real</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Activity}
            title="Total de Eventos"
            value={stats.totalEventos}
            color="bg-blue-500"
            trend="+12% este mês"
          />
          <StatCard
            icon={AlertTriangle}
            title="Eventos Ativos"
            value={stats.eventosAtivos}
            color="bg-red-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Severidade Alta"
            value={stats.severidadeAlta}
            color="bg-orange-500"
          />
          <StatCard
            icon={Bell}
            title="Novas Ocorrências"
            value={stats.novasOcorrencias}
            color="bg-green-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Barras */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Eventos por Tipo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição por Severidade</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Eventos Recentes</h3>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{event.tipo}</p>
                    <p className="text-sm text-gray-600">{event.local}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.severidade === 'alta' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.severidade}
                  </span>
                  <span className="text-sm text-gray-500">{event.tempo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}