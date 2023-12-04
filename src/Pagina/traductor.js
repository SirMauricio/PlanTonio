import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import './Plants.css';
import { Link } from 'react-router-dom';

function Plants() {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://perenual.com/api/species-list?key=sk-ZR6u656d55515c5802596&lang=es"
        );
        
        // Traducción de la respuesta recibida
        const translatedData = response.data.data.map(plant => ({
          ...plant,
          common_name: t(plant.common_name), // Traducir campos específicos si es necesario
          // ...traduce otros campos aquí si es necesario
        }));

        setData(translatedData);
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
      }
    }

    fetchData();
  }, [t]); // Asegúrate de incluir la dependencia t para que se ejecute cuando cambie el idioma

  return (
    <div className="container">
      {/* ... Resto del código igual ... */}
    </div>
  );
}

export default Plants;
