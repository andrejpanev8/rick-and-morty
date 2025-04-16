import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Choose Your View</h1>
      <div className="d-flex flex-column gap-3 align-items-center">
        <Link to="/pagination" className="w-100" style={{ maxWidth: '400px' }}>
          <button className="btn btn-primary w-100">Paginated Characters</button>
        </Link>
        <Link to="/client-filter" className="w-100" style={{ maxWidth: '400px' }}>
          <button className="btn btn-success w-100">Infinite Scroll (Client Filter)</button>
        </Link>
        <Link to="/api-filter" className="w-100" style={{ maxWidth: '400px' }}>
          <button className="btn btn-warning w-100">Infinite Scroll (API Filter)</button>
        </Link>
      </div>
    </div>
  );
}
