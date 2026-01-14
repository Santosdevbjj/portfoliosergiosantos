"use client";

import { DEFAULT_LOCALE, getDictionary, Locale } from "@/lib/i18n";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useState } from "react";

interface Props {
  locale?: Locale;
}

export default function ContactSection({ locale = DEFAULT_LOCALE }: Props) {
  const dict = getDictionary(locale);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const htmlLang = locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR";

  // Rótulos traduzidos internamente para manter o componente autossuficiente
  const labels = {
    name: locale === "en" ? "Name" : locale === "es" ? "Nombre" : "Nome",
    message: locale === "en" ? "Message" : locale === "es" ? "Mensaje" : "Mensagem",
    button: locale === "en" ? "Send Message" : locale === "es" ? "Enviar Mensaje" : "Enviar Mensagem",
    sending: locale === "en" ? "Sending..." : locale === "es" ? "Enviando..." : "Enviando...",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio ou integração com serviço de e-mail (ex: Formspree, Resend)
    setTimeout(() => {
      alert(locale === "en" ? "Message sent successfully!" : "Mensagem enviada com sucesso!");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section
      id="contact"
      role="region"
      aria-labelledby="contact-title"
      lang={htmlLang}
      className="container mx-auto max-w-4xl px-6 lg:px-8 py-20 sm:py-32 space-y-12"
    >
      <div className="text-center space-y-4">
        <h2
          id="contact-title"
          className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {dict.sections.contactTitle}
        </h2>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Campo Nome */}
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <User size={14} />
              {labels.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Sérgio Santos"
              className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <Mail size={14} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="exemplo@email.com"
              className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Campo Mensagem */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <MessageSquare size={14} />
              {labels.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Botão de Ação */}
          <div className="md:col-span-2 text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex items-center gap-3 px-10 py-4 
                rounded-full bg-blue-600 text-white font-black 
                hover:bg-blue-700 transition-all hover:scale-105 
                disabled:opacity-50 disabled:hover:scale-100
                shadow-xl shadow-blue-500/20
              "
            >
              {isSubmitting ? labels.sending : labels.button}
              <Send size={20} className={isSubmitting ? "animate-pulse" : ""} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
