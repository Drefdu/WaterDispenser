document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const email = this.email.value; 
    const responseCorreo = await axios.post('https://waterdispenser.onrender.com/db/obtenerAdmin',{
        correo:email
    });
    if(responseCorreo.status == 200){
        try {
            const response = await axios.post('https://login-with.link/api/send-link', {
                email: email,
                key: '1277b4d5-3eef-4614-99a8-af959a3e2a9f',
                state: null
            });
            
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se ha enviado un correo a ' + email,
                confirmButtonText: 'Aceptar'
            });
            const responseTel = await axios.post(`https://waterdispenser.onrender.com/db/enviar_sms/${email}`,{
                telefono:responseCorreo.data.telefono
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'No se pudo enviar el correo. Por favor, intenta de nuevo.',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ocurrio un problema. Por favor, intenta de nuevo.',
            confirmButtonText: 'Aceptar'
        });
    }
});