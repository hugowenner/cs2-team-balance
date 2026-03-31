import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, MessageSquare, AlertCircle, Linkedin, Github, Shield, FileText, Dice1, HelpCircle, Home, History } from 'lucide-react';

const FooterAccordion = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'produto',
      title: 'Produto',
      icon: <Home className="w-4 h-4" />,
      items: [
        { label: 'Site Oficial', href: 'https://nofear.netlify.app/', external: true },
        { label: 'Como Funciona', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Histórico de Partidas', action: () => document.querySelector('#history')?.scrollIntoView({ behavior: 'smooth' }) }
      ]
    },
    {
      id: 'suporte',
      title: 'Suporte',
      icon: <MessageSquare className="w-4 h-4" />,
      items: [
        { label: 'Suporte via WhatsApp', href: 'https://wa.me/5531971836063?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20balanceador%20de%20times%20CS2.', external: true, color: 'hover:text-green-400' },
        { label: 'Enviar Sugestão', href: 'https://wa.me/5531971836063?text=Gostaria%20de%20fazer%20uma%20sugestão%20para%20o%20CS2%20No%20Fear.', external: true, color: 'hover:text-cyan-400' },
        { label: 'Reportar Bug', href: 'https://wa.me/5531971836063?text=Quero%20reportar%20um%20problema%20no%20balanceador.', external: true, color: 'hover:text-red-400' }
      ]
    },
    {
      id: 'desenvolvedor',
      title: 'Desenvolvedor',
      icon: <Github className="w-4 h-4" />,
      items: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hugowenner-ti/', external: true, color: 'hover:text-blue-400' },
        { label: 'GitHub', href: 'https://github.com/hugowenner', external: true, color: 'hover:text-white' },
        { label: 'Hugo Wenner', isText: true, color: 'text-white/40' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      icon: <Shield className="w-4 h-4" />,
      items: [
        { label: 'Termos de Uso', action: () => alert('Termos de uso em desenvolvimento. Contate via WhatsApp para mais informações.') },
        { label: 'Privacidade', action: () => alert('Política de privacidade em desenvolvimento. Contate via WhatsApp para mais informações.') },
        { label: 'RNG Determinístico', isText: true, color: 'text-white/40' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-16 border-t border-white/10 pt-10"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* ACCORDION SECTIONS */}
        <div className="space-y-3 mb-10">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * sections.indexOf(section) }}
              className="rounded-xl border border-white/10 overflow-hidden bg-gradient-to-r from-white/5 to-transparent"
            >
              {/* HEADER */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-cyan-400">
                    {section.icon}
                  </div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/40"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              {/* CONTENT */}
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-2">
                      <ul className="space-y-2">
                        {section.items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {item.href ? (
                              <a
                                href={item.href}
                                target={item.external ? '_blank' : '_self'}
                                rel={item.external ? 'noopener noreferrer' : ''}
                                className={`flex items-center gap-2 text-sm ${item.color || 'text-white/70'} hover:text-white font-medium transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5`}
                              >
                                {item.external && <ExternalLink className="w-3.5 h-3.5" />}
                                {item.label}
                              </a>
                            ) : item.action ? (
                              <button
                                onClick={item.action}
                                className="flex items-center gap-2 text-sm text-white/70 hover:text-white font-medium transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 w-full text-left"
                              >
                                {item.label}
                              </button>
                            ) : (
                              <div className={`flex items-center gap-2 text-sm ${item.color || 'text-white/70'} font-medium py-2 px-3`}>
                                {item.label === 'RNG Determinístico' && <Dice1 className="w-3.5 h-3.5" />}
                                {item.label === 'Termos de Uso' && <FileText className="w-3.5 h-3.5" />}
                                {item.label === 'Privacidade' && <Shield className="w-3.5 h-3.5" />}
                                {item.label}
                              </div>
                            )}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* SOCIAL SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4 mb-10 p-5 rounded-xl 
            bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
        >
          <p className="text-sm text-white/80 font-medium flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Conecte-se com o desenvolvedor
          </p>

          <div className="flex gap-3">
            <motion.a
              href="https://www.linkedin.com/in/hugowenner-ti/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold 
                text-white/80 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 
                border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </motion.a>

            <motion.a
              href="https://github.com/hugowenner"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold 
                text-white/80 hover:text-white bg-white/10 hover:bg-white/20 
                border border-white/30 hover:border-white/50 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10"
        >
          <div className="text-sm font-semibold text-white/50 tracking-wide flex items-center gap-2">
            <Dice1 className="w-4 h-4 text-cyan-400" />
            CS2 NO FEAR · RNG Determinístico · Sistema Auditável
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/40 font-medium">
            <span>© 2024 No Fear CS2</span>
            <span className="text-white/20">•</span>
            <span className="text-white/60 font-semibold">Hugo Wenner</span>
            <span className="text-white/20">•</span>
            <span>v1.0.0</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterAccordion;