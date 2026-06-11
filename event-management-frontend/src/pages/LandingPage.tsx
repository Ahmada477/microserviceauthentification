import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCalendar, 
  FiUsers, 
  FiTruck, 
  FiUserCheck, 
  FiArrowRight, 
  FiCheckCircle,
  FiBarChart2,
  FiShield,
  FiStar,
  FiMenu,
  FiX,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
              <FiCalendar className="text-white text-xl" />
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              EventPro
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={`${scrolled ? 'text-gray-600' : 'text-white'} hover:text-blue-500 transition-colors`}>Accueil</a>
            <a href="#features" className={`${scrolled ? 'text-gray-600' : 'text-white'} hover:text-blue-500 transition-colors`}>Fonctionnalités</a>
            <a href="#about" className={`${scrolled ? 'text-gray-600' : 'text-white'} hover:text-blue-500 transition-colors`}>À propos</a>
            <a href="#contact" className={`${scrolled ? 'text-gray-600' : 'text-white'} hover:text-blue-500 transition-colors`}>Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className={`px-4 py-2 rounded-lg transition-all ${scrolled ? 'text-blue-600 border border-blue-600 hover:bg-blue-50' : 'text-white border border-white hover:bg-white/20'}`}
            >
              Connexion
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Inscription gratuite
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4">
            <div className="flex flex-col space-y-3 px-6">
              <a href="#home" className="text-gray-600 hover:text-blue-600 py-2">Accueil</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 py-2">Fonctionnalités</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 py-2">À propos</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 py-2">Contact</a>
              <hr className="my-2" />
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-center"
              >
                Connexion
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Inscription gratuite
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <FiStar className="text-yellow-400" />
                <span className="text-white text-sm">La solution N°1 pour vos événements</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Gérez vos événements
                <span className="text-yellow-400"> simplement</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                La plateforme tout-en-un pour créer, organiser et promouvoir vos événements. 
                Inscriptions, invités, logistique : tout est sous contrôle.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center space-x-2 shadow-lg"
                >
                  <span>Commencer gratuitement</span>
                  <FiArrowRight />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Se connecter
                </button>
              </div>
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-400" />
                  <span className="text-white text-sm">Sans engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-400" />
                  <span className="text-white text-sm">Support 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-400" />
                  <span className="text-white text-sm">Sécurisé</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white">
                    <div className="bg-green-500 rounded-full p-2">
                      <FiCheckCircle />
                    </div>
                    <span>+1000 événements organisés</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <div className="bg-green-500 rounded-full p-2">
                      <FiCheckCircle />
                    </div>
                    <span>+5000 utilisateurs satisfaits</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <div className="bg-green-500 rounded-full p-2">
                      <FiCheckCircle />
                    </div>
                    <span>98% de taux de satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Fonctionnalités complètes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour réussir vos événements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <FiCalendar className="text-blue-600 text-2xl group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gestion d'événements</h3>
              <p className="text-gray-500">Créez et gérez tous vos événements en quelques clics</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                <FiUsers className="text-green-600 text-2xl group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gestion des invités</h3>
              <p className="text-gray-500">Importez et gérez facilement vos listes d'invités</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                <FiUserCheck className="text-purple-600 text-2xl group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Inscriptions</h3>
              <p className="text-gray-500">Suivez les inscriptions en temps réel</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                <FiBarChart2 className="text-orange-600 text-2xl group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Statistiques</h3>
              <p className="text-gray-500">Analysez la performance de vos événements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Événements créés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Pourquoi choisir EventPro ?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                EventPro est la solution de gestion d'événements la plus complète du marché. 
                Conçue pour les professionnels, notre plateforme vous permet de gagner du temps 
                et d'optimiser l'organisation de vos événements.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiShield className="text-green-500" />
                  <span className="text-gray-700">Sécurité des données garantie</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Support technique réactif</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Mises à jour régulières</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Prêt à commencer ?</h3>
                <p className="text-gray-600 mb-4">Rejoignez des milliers d'organisateurs</p>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Créer un compte gratuit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contactez-nous</h2>
            <p className="text-gray-600">Une question ? Notre équipe est là pour vous aider</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <FiMail className="text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-gray-500 text-sm">contact@eventpro.com</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <FiPhone className="text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">Téléphone</h4>
              <p className="text-gray-500 text-sm">+221 33 123 45 67</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <FiMapPin className="text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">Adresse</h4>
              <p className="text-gray-500 text-sm">Dakar, Sénégal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FiCalendar className="text-blue-400" />
                <span className="text-white font-bold text-lg">EventPro</span>
              </div>
              <p className="text-gray-400 text-sm">
                La solution complète pour la gestion de vos événements.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#home" className="hover:text-white">Accueil</a></li>
                <li><a href="#features" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#about" className="hover:text-white">À propos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Mentions légales</a></li>
                <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white">CGU</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-3 py-2 rounded-l-lg w-full text-gray-800"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg text-white hover:bg-blue-700">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 EventPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;