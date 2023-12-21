import * as translations from './translations';

class I18nService {

    listeners = new Set();

    /**
     * @param services {Services} Менеджер сервисов
     * @param config {Object}
     */
    constructor(services, config = {}) {
      this.services = services;
      this.config = config
      this.lang = 'ru'
      this.setLang = this.setLang.bind(this);
        this.translate = this.translate.bind(this);
        this.notify = this.notify.bind(this);
    }
  
    translate(lang=this.lang, text, plural) {
        let result = translations[lang] && (text in translations[lang])
          ? translations[lang][text]
          : text;
      
        if (typeof plural !== 'undefined') {
          const key = new Intl.PluralRules(lang).select(plural);
          if (key in result) {
            result = result[key];
          }
        }
        
        return result;
    }
      
    setLang(lang) {
      this.lang = lang
      this.services.api.setHeader('X-Lang', lang)
      this.notify()
    }

    getLang = () => {
        return this.lang;
    };
    
    subscribe = (listener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    notify = () => {
        this.listeners.forEach(listener => listener());
    };

  }
  
  export default I18nService;
  