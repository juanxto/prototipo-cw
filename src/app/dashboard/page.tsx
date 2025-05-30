'use client';

import React, { useState } from 'react';
import { AlertTriangle, MapPin, TrendingUp, Bell, Activity, FileX } from 'lucide-react';
import Header from '../../components/Header';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEventos: 0,
    eventosAtivos: 0,
    severidadeAlta: 0,
    novasOcorrencias: 0
  });

  const [showModal, setShowModal] = useState(false);
  const [eventos, setEventos] = useState([]);

  const handleAddEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitEvent = (eventData) => {
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
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
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
      <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Novo Evento</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
              <select
                name="severidade"
                value={formData.severidade}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                rows={3}
                placeholder="Descreva os detalhes do evento..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
      <Icon className="w-12 h-12 text-gray-300 mb-3" />
      <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddEvent={handleAddEvent} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Dashboard de Monitoramento</h2>
          <p className="text-sm text-gray-600">Visão geral dos eventos extremos em tempo real</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Activity} title="Total de Eventos" value={stats.totalEventos} color="bg-blue-500" />
          <StatCard icon={AlertTriangle} title="Eventos Ativos" value={stats.eventosAtivos} color="bg-red-500" />
          <StatCard icon={TrendingUp} title="Severidade Alta" value={stats.severidadeAlta} color="bg-orange-500" />
          <StatCard icon={Bell} title="Novas Ocorrências" value={stats.novasOcorrencias} color="bg-green-500" />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-gray-800">Eventos Recentes</h3>
            {eventos.length > 0 && (
              <button
                onClick={handleAddEvent}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
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
            <div className="space-y-3">
              {eventos.map((event) => (
                <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 gap-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{event.tipo}</p>
                      <p className="text-xs text-gray-600">{event.local}</p>
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
                    <span className="text-xs text-gray-500">{event.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <EventModal />
    </div>
  );
}
