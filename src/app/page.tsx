'use client'

import { useState, useEffect } from 'react'
import { 
  Home, 
  Truck, 
  Package, 
  Building2, 
  Phone, 
  MapPin, 
  Star,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Users,
  Shield,
  Clock,
  Wrench
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  details: string
  moveType: string
}

export default function MovingCompanyWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    details: '',
    moveType: 'Residencial'
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('movingQuoteForm')
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error)
      }
    }
  }, [])

  // Salvar dados no localStorage
  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem('movingQuoteForm', JSON.stringify(data))
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    saveToLocalStorage(newData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.details) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Criar o corpo do email
    const emailBody = `
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Tipo de Mudança: ${formData.moveType}
Detalhes da Mudança: ${formData.details}
    `.trim()

    // Criar o link mailto
    const mailtoLink = `mailto:decim.465@gmail.com?subject=Solicitação de Orçamento - ${formData.name}&body=${encodeURIComponent(emailBody)}`
    
    // Abrir o cliente de email
    window.location.href = mailtoLink
    
    alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.')
    
    // Limpar formulário após envio
    const emptyData = { name: '', email: '', phone: '', details: '', moveType: 'Residencial' }
    setFormData(emptyData)
    localStorage.removeItem('movingQuoteForm')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-1 md:py-2">
          <div className="flex items-center justify-between">
            {/* Logo no canto superior esquerdo */}
            <div className="flex items-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/424e2326-097a-47c9-a1fc-54292d3c32e9.png" 
                alt="OneWay Mudanças" 
                className="h-12 w-auto md:h-20"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-yellow-500 transition-all duration-300 hover:scale-110 transform">
                HOME
              </button>
              <button onClick={() => scrollToSection('services')} className="hover:text-yellow-500 transition-all duration-300 hover:scale-110 transform">
                SERVIÇOS
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-yellow-500 transition-all duration-300 hover:scale-110 transform">
                QUEM SOMOS
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-yellow-500 transition-all duration-300 hover:scale-110 transform">
                CONTATOS
              </button>
              <button 
                onClick={() => scrollToSection('quote')} 
                className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-black hover:scale-105 transform"
              >
                SOLICITAR ORÇAMENTO GRATUITO
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3 mt-4">
                <button onClick={() => scrollToSection('home')} className="text-left hover:text-yellow-500 transition-all duration-300 hover:scale-105 transform">
                  HOME
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left hover:text-yellow-500 transition-all duration-300 hover:scale-105 transform">
                  SERVIÇOS
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left hover:text-yellow-500 transition-all duration-300 hover:scale-105 transform">
                  QUEM SOMOS
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left hover:text-yellow-500 transition-all duration-300 hover:scale-105 transform">
                  CONTATOS
                </button>
                <button 
                  onClick={() => scrollToSection('quote')} 
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-center text-black hover:scale-105 transform"
                >
                  SOLICITAR ORÇAMENTO GRATUITO
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section com Banner - VISÍVEL EM MOBILE E DESKTOP */}
      <section id="home" className="pt-16 md:pt-16">
        {/* Banner - VISÍVEL EM MOBILE E DESKTOP */}
        <img 
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cbbc679a-82ff-46cd-8596-487c79ed87b3.png" 
          alt="Banner Principal - OneWay Mudanças"
          className="w-full h-auto object-cover"
        />

        {/* Botões abaixo do banner */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => scrollToSection('quote')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all hover:scale-105 flex items-center justify-center"
              >
                Solicitar Orçamento Gratuito
                <ArrowRight className="ml-2" size={18} />
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all"
              >
                Nossos Serviços
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-6 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Nossos Serviços</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas para todas as suas necessidades de mudança
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Mudanças Residenciais */}
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-gray-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Home className="text-gray-900" size={24} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Mudanças Residenciais</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Mudanças completas para casas e apartamentos com cuidado especial para seus pertences.
              </p>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Embalagem profissional
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Transporte seguro
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Montagem e desmontagem
                </li>
              </ul>
            </div>

            {/* Mudanças Comerciais */}
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-yellow-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Building2 className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Mudanças Comerciais</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Relocação de escritórios e empresas com mínima interrupção das atividades.
              </p>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Planejamento estratégico
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Horários flexíveis
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Equipamentos especializados
                </li>
              </ul>
            </div>

            {/* Self Storage */}
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Package className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Self Storage</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Armazenamento seguro de móveis e objetos em espaços climatizados.
              </p>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Ambiente climatizado
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Segurança 24h
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Acesso facilitado
                </li>
              </ul>
            </div>

            {/* Embalagem */}
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-purple-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Package className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Embalagem e Desembalagem</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Serviço completo de embalagem com materiais de alta qualidade.
              </p>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Materiais premium
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Técnicas especializadas
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Proteção garantida
                </li>
              </ul>
            </div>

            {/* Elevador Exterior */}
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-red-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Truck className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Elevador Exterior</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Solução para mudanças em prédios altos e locais de difícil acesso.
              </p>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Equipamento moderno
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Operadores certificados
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Máxima segurança
                </li>
              </ul>
            </div>

            {/* Montagem e Desmontagem */}
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Wrench className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Montagem e Desmontagem</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Serviço especializado de montagem e desmontagem de móveis e equipamentos.
              </p>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Técnicos especializados
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Ferramentas profissionais
                </li>
                <li className="flex items-center text-gray-700 text-sm md:text-base">
                  <CheckCircle className="text-green-500 mr-2" size={14} />
                  Cuidado com os móveis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-8 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">Quem Somos</h2>
              <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-6">
                Com mais de 5 anos de experiência no mercado de mudanças, somos uma empresa 
                especializada em oferecer soluções completas e personalizadas para mudanças 
                residenciais e comerciais.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-8">
                Nossa equipe é formada por profissionais qualificados e treinados para 
                garantir que sua mudança seja realizada com máxima segurança e eficiência.
              </p>
              
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                <div className="text-center">
                  <div className="bg-gray-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Users className="text-gray-900" size={20} />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600 text-xs md:text-sm">Clientes Satisfeitos</div>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Clock className="text-yellow-600" size={20} />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-gray-600 text-xs md:text-sm">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Shield className="text-green-600" size={20} />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-gray-600 text-xs md:text-sm">Seguro Garantido</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-2xl p-4 md:p-8">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-6">Nossos Diferenciais</h3>
              <div className="space-y-2 md:space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">Equipe Especializada</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Profissionais treinados e experientes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">Equipamentos Modernos</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Frota própria e equipamentos de última geração</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">Atendimento 24h</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Suporte completo durante todo o processo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">Preços Competitivos</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Melhor custo-benefício do mercado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-base md:text-xl text-gray-600">Depoimentos reais de quem confia em nossos serviços</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                &quot;Excelente serviço! A equipe foi muito profissional e cuidadosa com nossos móveis. 
                Recomendo para qualquer pessoa que precise de uma mudança sem estresse.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-gray-900 font-semibold text-sm">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Maria Rosa</h4>
                  <p className="text-gray-500 text-xs md:text-sm">Cliente Residencial</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                &quot;Mudança comercial perfeita! Conseguiram relocar todo nosso escritório em um final 
                de semana sem atrapalhar nossas atividades. Muito eficientes!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-yellow-600 font-semibold text-sm">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">João Silva</h4>
                  <p className="text-gray-500 text-xs md:text-sm">Empresário</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                &quot;O serviço de self storage foi fundamental durante nossa reforma. 
                Espaço seguro, limpo e com acesso fácil. Voltaria a usar com certeza!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-green-600 font-semibold text-sm">AC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Ana Costa</h4>
                  <p className="text-gray-500 text-xs md:text-sm">Cliente Self Storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-8 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Solicite Seu Orçamento Gratuito</h2>
              <p className="text-base md:text-xl text-gray-100">
                Preencha o formulário e receba uma proposta personalizada em até 24 horas
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 text-gray-900">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="moveType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Mudança
                  </label>
                  <select 
                    id="moveType"
                    name="moveType"
                    value={formData.moveType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Self Storage">Self Storage</option>
                    <option value="Montagem e Desmontagem">Montagem e Desmontagem</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">
                    Detalhes da Mudança *
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Descreva sua mudança: origem, destino, tipo de imóvel, quantidade de cômodos, itens especiais, data desejada..."
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm md:text-base"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors"
                  >
                    Solicitar Orçamento Gratuito
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Entre em Contato</h2>
            <p className="text-base md:text-xl text-gray-600">Estamos prontos para atender você</p>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-2xl">
              <div className="text-center">
                <div className="bg-gray-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Phone className="text-gray-900" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Telefone</h3>
                <p className="text-gray-600 text-sm md:text-base">+351 935 456 886</p>
                <p className="text-gray-600 text-sm md:text-base">212 131 169</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <MapPin className="text-green-600" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Endereço</h3>
                <p className="text-gray-600 text-sm md:text-base">Setúbal Quinta do Anjo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4 md:gap-8">
            <div>
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/424e2326-097a-47c9-a1fc-54292d3c32e9.png" 
                alt="OneWay Mudanças" 
                className="h-12 md:h-16 w-auto mb-3 md:mb-4"
              />
              <p className="text-gray-400 text-sm md:text-base">
                Sua mudança em boas mãos. Profissionalismo, segurança e confiança.
              </p>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Serviços</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>Mudanças Residenciais</li>
                <li>Mudanças Comerciais</li>
                <li>Self Storage</li>
                <li>Embalagem</li>
                <li>Elevador Exterior</li>
                <li>Montagem e Desmontagem</li>
              </ul>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contato</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>+351 935 456 886</li>
                <li>212 131 169</li>
                <li>Setúbal Quinta do Anjo</li>
              </ul>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Horário de Atendimento</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>Segunda a Sexta: 8h às 18h</li>
                <li>Sábado: 8h às 12h</li>
                <li>Emergências: 24h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-4 md:mt-8 pt-4 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 OneWay Mudanças. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}