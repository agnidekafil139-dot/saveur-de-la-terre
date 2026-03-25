import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Restaurant */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-4">
              Saveur de la Terre
            </h3>

            <p className="text-sm text-gray-200 mb-4">
              {t('footer.description')}
            </p>

            <div className="flex space-x-4 text-2xl">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-4">
              {t('footer.navigation')}
            </h3>

            <ul className="space-y-2 text-sm">

              <li>
                <Link to="/" className="hover:text-accent transition">
                  {t('nav.home')}
                </Link>
              </li>

              <li>
                <Link to="/notre-histoire" className="hover:text-accent transition">
                  {t('nav.ourStory')}
                </Link>
              </li>

              <li>
                <Link to="/menu" className="hover:text-accent transition">
                  {t('nav.menu')}
                </Link>
              </li>

              <li>
                <Link to="/reserver" className="hover:text-accent transition">
                  {t('nav.reserve')}
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-accent transition">
                  {t('nav.contact')}
                </Link>
              </li>

            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-4">
              {t('footer.hours')}
            </h3>

            <ul className="space-y-2 text-sm">
              <li>{t('footer.monFri')}</li>
              <li>{t('footer.saturday')}</li>
              <li>{t('footer.sunday')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-4">
              {t('footer.contact')}
            </h3>

            <ul className="space-y-3 text-sm">

              <li className="flex items-center gap-2">
                <FaMapMarkerAlt />
                Cotonou, Bénin
              </li>

              <li className="flex items-center gap-2">
                <FaPhone />
                        +554499148762
              </li>

              <li className="flex items-center gap-2">
                <FaEnvelope />
                contact@saveurdelaterre.com
              </li>

            </ul>
          </div>

        </div>

        {/* Ligne séparation */}
        <div className="border-t border-gray-400 mt-10 pt-6 text-center text-sm">

          © {currentYear} Saveur de la Terre — {t('footer.copyright')}

        </div>

      </div>
    </footer>
  );
};

export default Footer;