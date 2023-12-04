import React, { useEffect, useState } from "react";
import axios from "axios";

function Registro() {
  const [plantas, setPlantas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Obtener todas las plantas al cargar el componente
    axios.get('http://localhost:3000/plantas')
      .then(response => {
        setPlantas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las plantas:', error);
      });
  }, []);

  const agregarPlanta = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/plantas', { nombre, tipo, descripcion })
      .then(response => {
        console.log(response.data.message);
        // Actualizar la lista de plantas después de agregar una nueva
        axios.get('http://localhost:3000/plantas')
          .then(response => {
            setPlantas(response.data);
            setNombre('');
            setTipo('');
            setDescripcion('');
          })
          .catch(error => {
            console.error('Error al obtener las plantas:', error);
          });
      })
      .catch(error => {
        console.error('Error al agregar la planta:', error);
      });
  };

  const editarPlanta = (id) => {
    setEditingId(id);
    const planta = plantas.find(planta => planta.id === id);
    if (planta) {
      setNombre(planta.nombre);
      setTipo(planta.tipo);
      setDescripcion(planta.descripcion);
    }
  };

  const actualizarPlanta = () => {
    axios.put(`http://localhost:3000/plantas/${editingId}`, { nombre, tipo, descripcion })
      .then(response => {
        console.log(response.data.message);
        setEditingId(null);
        setNombre('');
        setTipo('');
        setDescripcion('');
        // Actualizar la lista de plantas después de editar
        axios.get('http://localhost:3000/plantas')
          .then(response => {
            setPlantas(response.data);
          })
          .catch(error => {
            console.error('Error al obtener las plantas:', error);
          });
      })
      .catch(error => {
        console.error('Error al actualizar la planta:', error);
      });
  };

  const eliminarPlanta = (id) => {
    axios.delete(`http://localhost:3000/plantas/${id}`)
      .then(response => {
        console.log(response.data.message);
        // Actualizar la lista de plantas después de eliminar
        const updatedPlantas = plantas.filter(planta => planta.id !== id);
        setPlantas(updatedPlantas);
      })
      .catch(error => {
        console.error('Error al eliminar la planta:', error);
      });
  };

  return (
    <div>
      {editing ? ( // Mostrar el formulario de edición si editing es true
        <form className="form-container" onSubmit={actualizarPlanta}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
          <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          <button type="submit">Actualizar Planta</button>
        </form>
      ) : (
        // Mostrar la lista de plantas si editing es false
        <ul className="plantas-list">
          {plantas.map(planta => (
            <li key={planta.id}>
              {planta.nombre} - {planta.tipo} - {planta.descripcion}
              <button onClick={() => editarPlanta(planta.id)}>Editar</button>
              <button onClick={() => eliminarPlanta(planta.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Registro;