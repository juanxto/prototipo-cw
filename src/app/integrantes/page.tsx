'use client';

import React from 'react';
import { Users, Github, Linkedin, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function IntegrantesPage() {
  const router = useRouter();
  
  const handleVoltar = () => {
    router.push('/login');
  };
  const integrantes = [
    {
      nome: "João Alves",
      rm: "RM12345",
      turma: "1TDSPB - Agosto",
      github: "https://github.com/ehojonv",
      linkedin: "https://www.linkedin.com/in/joao-v-alves/",
      foto: "/joao.jpeg"
    },
    {
      nome: "Juan Coelho",
      rm: "RM560445",
      turma: "1TDSPB - Agosto",
      github: "https://github.com/juanxto",
      linkedin: "https://www.linkedin.com/in/juan-pablo-rebelo-7ba5b930a/",
      foto: "/juan.jpeg"
    },
    {
      nome: "Matheus Mariotto",
      rm: "RM12347", 
      turma: "1TDSPB - Agosto",
      github: "https://github.com/matheusmariotto1206",
      linkedin: "https://www.linkedin.com/in/matheus-mariotto-0a68a5204/",
      foto: "/matheus.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Botão Voltar */}
        <div className="mb-8">
          <button
            onClick={handleVoltar}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Login
          </button>
        </div>

        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipe de Desenvolvimento</h1>
          <p className="text-gray-600">Global Solution 2025 - Eventos Extremos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {integrantes.map((integrante, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-red-500 shadow-lg">
                  <img 
                    src={integrante.foto}
                    alt={`Foto de ${integrante.nome}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{integrante.nome}</h3>
                <p className="text-red-600 font-medium mb-1">{integrante.rm}</p>
                <p className="text-gray-600 text-sm mb-4">{integrante.turma}</p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-600" />
                  </a>
                  <a 
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}