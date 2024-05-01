import { useState, createContext, useContext } from "react";
import { IntlProvider } from "react-intl";
import English from "./locales/en.json"; // Assuming you want to include English translations
import Greek from "./locales/el.json"; // Greek translations

const defaultLocale = "en";
const messages = {
  en: English, // English messages
  el: Greek, // Greek messages
};

export const LocaleContext = createContext();

export const useLocale = () => useContext(LocaleContext);

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
