import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Choose Your View</h1>
      <div className="d-flex flex-column gap-3 align-items-center">
        <Link to="/pagination" className="w-100" style={{ maxWidth: '400px' }}>
          <button className="btn btn-primary w-100">{t("paginatedCharacters")}</button>
        </Link>
        <Link to="/scrolled" className="w-100" style={{ maxWidth: '400px' }}>
          <button className="btn btn-success w-100">{t("scrolledCharacters")}</button>
        </Link>
      </div>
    </div>
  );
}
