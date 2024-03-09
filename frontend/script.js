async function cargarClientes() {
  try {
      const response = await fetch('http://localhost:3000/clients');
      const data = await response.json();
      const tbody = document.getElementById('tbodyClientes');

      tbody.innerHTML = '';

      data.forEach(cliente => {
          const row = crearFilaCliente(cliente);
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error('Error al obtener clientes:', error);
      mostrarError('Error al obtener clientes. Por favor, inténtalo de nuevo más tarde.');
  }
}

function crearFilaCliente(cliente) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${cliente.ID}</td>
      <td>${cliente.Nombre}</td>
      <td>${cliente.Apellido}</td>
      <td>${cliente.Direccion}</td>
      <td>${cliente.Telefono}</td>
      <td>
          <button onclick="editarCliente(${cliente.ID})">Editar</button>
          <button onclick="eliminarCliente(${cliente.ID})">Eliminar</button>
      </td>
  `;
  return row;
}

async function agregarOActualizarCliente(event) {
    event.preventDefault();
  
    const clienteId = document.getElementById('clienteId').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
  
    const url = clienteId ? `http://localhost:3000/clients/${clienteId}` : 'http://localhost:3000/clients';
  
    try {
        const response = await fetch(url, {
            method: clienteId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, direccion, telefono })
        });
  
        if (response.ok) {
            cargarClientes();
            limpiarFormulario();
        } else {
            console.error('Error al guardar el cliente:', response.statusText);
            mostrarError('Error al guardar el cliente. Por favor, inténtalo de nuevo más tarde.');
        }
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
        mostrarError('Error al guardar el cliente. Por favor, inténtalo de nuevo más tarde.');
    }
  }
  

  async function editarCliente(clienteId) {
    try {
        const response = await fetch(`http://localhost:3000/clients/${clienteId}`);
        const cliente = await response.json();
  
        document.getElementById('clienteId').value = cliente.ID;
        document.getElementById('nombre').value = cliente.Nombre;
        document.getElementById('apellido').value = cliente.Apellido;
        document.getElementById('direccion').value = cliente.Direccion;
        document.getElementById('telefono').value = cliente.Telefono;
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        mostrarError('Error al obtener el cliente. Por favor, inténtalo de nuevo más tarde.');
    }
  }
  
  
  
async function eliminarCliente(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        return;
    }
  
    try {
        const response = await fetch(`http://localhost:3000/clients/${id}`, {
            method: 'DELETE'
        });
  
        if (response.ok) {
            cargarClientes();
        } else {
            console.error('Error al eliminar el cliente:', response.statusText);
            mostrarError('Error al eliminar el cliente. Por favor, inténtalo de nuevo más tarde.');
        }
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        mostrarError('Error al eliminar el cliente. Por favor, inténtalo de nuevo más tarde.');
    }
  }
  


function limpiarFormulario() {
  document.getElementById('clienteId').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('telefono').value = '';
}

function mostrarError(message) {
  // Aquí puedes implementar cómo deseas mostrar el mensaje de error en tu aplicación
  alert(message);
}

// Cargar clientes al cargar la página
window.onload = cargarClientes;
