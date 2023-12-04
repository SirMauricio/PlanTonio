import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import './Plants.css';
import { Link } from 'react-router-dom'; // Importa el componente Link

function Plants() {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://perenual.com/api/species-list?key=sk-ZR6u656d55515c5802596&lang=es"
        );

        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
      }
    }
    
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlants = data.filter(plant =>
    plant.common_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">PlanTonio</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/registrar">Registrar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/buscar">Buscar</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido de la página */}
      <div className="container">
        <h1>{t('Buscador')}</h1>
        <input
          type="text"
          placeholder={t('Busca la planta por su nombre')}
          value={searchTerm}
          onChange={handleSearch}
        />
        {loading ? (
          <p>{t('loading')}</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredPlants.map((plant) => (
              <div className="col" key={plant.id}>
                <div className="card shadow-sm">
                  {plant.default_image ? (
                    <img
                      src={plant.default_image.medium_url}
                      className="bd-placeholder-img card-img-top"
                      alt={plant.common_name}
                    />
                  ) : (
                    <div className="placeholder-image">{t('image_not_available')}</div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{t('Nombre común')}: {plant.common_name}</h5>
                    <p className="card-text">
                      <strong>{t('Nombre científico')}: {plant.scientific_name[0]}</strong>
                      <br />
                      <strong>{t('Especie')}: {plant.cycle}</strong>
                      <br />
                      <strong>{t('Frecuencia de regado')}: {plant.watering}</strong>
                      <br />
                      <strong>{t('Exposición al sol')}: {plant.sunlight[0]}</strong>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link to={`/nueva-pagina/${plant.id}`}>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            {t('Ver')}
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          {t('Agregar')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Plants;

