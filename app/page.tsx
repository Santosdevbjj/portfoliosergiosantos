import { redirect } from "next/navigation";
import { i18n } from "@/lib/i18n";

/**
 * Ponto de entrada da raiz (/).
 * Redireciona para o idioma padrão definido nas configurações de i18n.
 * Isso garante que o SEO não indexe uma página vazia na raiz.
 */
export default function RootPage() {
  // Em vez de "hardcoded" /pt, usamos a configuração oficial do seu projeto
  redirect(`/${i18n.defaultLocale}`);
}
