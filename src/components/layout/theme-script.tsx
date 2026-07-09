import { THEME_STORAGE_KEY } from "@/lib/theme";

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=document.documentElement;var m=window.matchMedia('(prefers-color-scheme: dark)');if(t==='light'){d.classList.remove('dark');d.classList.add('light')}else if(t==='system'){d.classList.toggle('dark',m.matches);d.classList.toggle('light',!m.matches)}else{d.classList.add('dark');d.classList.remove('light')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
