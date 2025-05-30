'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, MapPin, TrendingUp, Bell, Users, Activity, Plus, FileX } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEventos: 0,
    eventosAtivos: 0,
    severidadeAlta: 0,
    novasOcorrencias: 0
  });

  const [showModal, setShowModal] = useState(false);
  const [eventos, setEventos] = useState([]);

  // Dados vazios para os gráficos
  const chartData: any[] | undefined = [];

  const handleAddEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitEvent = (eventData: { tipo?: string; local?: string; severidade: any; descricao?: string; }) => {
    // Aqui você integrará com o backend Quarkus
    console.log('Evento a ser enviado para o backend:', eventData);
    
    const novoEvento = {
      id: Date.now(),
      ...eventData,
      tempo: 'Agora'
    };
    
    setEventos([...eventos, novoEvento]);
    setStats(prev => ({
      totalEventos: prev.totalEventos + 1,
      eventosAtivos: prev.eventosAtivos + 1,
      severidadeAlta: eventData.severidade === 'alta' ? prev.severidadeAlta + 1 : prev.severidadeAlta,
      novasOcorrencias: prev.novasOcorrencias + 1
    }));
    
    setShowModal(false);
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
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

  const EventModal = () => {
    const [formData, setFormData] = useState({
      tipo: '',
      local: '',
      severidade: 'baixa',
      descricao: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
      if (formData.tipo && formData.local) {
        handleSubmitEvent(formData);
      }
    };

    if (!showModal) return null;

    return (
      <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Novo Evento</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Enchente">Enchente</option>
                <option value="Incêndio">Incêndio</option>
                <option value="Terremoto">Terremoto</option>
                <option value="Deslizamento">Deslizamento</option>
                <option value="Vendaval">Vendaval</option>
                <option value="Granizo">Granizo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                placeholder="Ex: São Paulo, SP"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
              <select
                name="severidade"
                value={formData.severidade}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (opcional)</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                placeholder="Descreva os detalhes do evento..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Adicionar Evento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = ({ title, description, icon: Icon }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm">{description}</p>
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
              <button
                onClick={handleAddEvent}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Evento
              </button>
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
            {chartData.length === 0 ? (
              <EmptyState 
                title="Nenhum evento registrado"
                description="Os gráficos aparecerão aqui quando você adicionar eventos"
                icon={FileX}
              />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Gráfico de Pizza */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição por Severidade</h3>
            {chartData.length === 0 ? (
              <EmptyState 
                title="Nenhum evento registrado"
                description="A distribuição por severidade será exibida aqui"
                icon={FileX}
              />
            ) : (
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
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Eventos Recentes</h3>
            {eventos.length > 0 && (
              <button
                onClick={handleAddEvent}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Adicionar mais
              </button>
            )}
          </div>
          
          {eventos.length === 0 ? (
            <EmptyState 
              title="Nenhum evento encontrado"
              description="Clique em 'Adicionar Evento' para começar a monitorar eventos extremos"
              icon={FileX}
            />
          ) : (
            <div className="space-y-4">
              {eventos.map((event) => (
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
                        : event.severidade === 'média'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.severidade}
                    </span>
                    <span className="text-sm text-gray-500">{event.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <EventModal />
    </div>
  );
}