class servicioEventos{

    async  function obtenerEventos() {
       try {
           const response = await fetch("/api/opiniones", {
               method: "GET",
               headers: {
                   "Content-Type": "application/json",
               },
           });

           if (!response.ok) {
               throw new Error("Error al obtener Eventos");
           }

           return await response.json();
       } catch (error) {
           console.error("Error en la solicitud:", error);
           return [];
       }
   }
   async  function obtenerEvento($id) {
    //HAY QUE MIRAR COMO FILTRAR
    try {
        const response = await fetch("/api/eventos/$(id)", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener Evento");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
}
    async function agregarEvento(nuevoEvento) {
        try {
            const response = await fetch("/api/eventos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoEvento),
            });

            if (!response.ok) {
                throw new Error("Error al agregar el nuevo evento");
            }

            return await response.json();
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return null; 
        }
    }
    async function eliminarEvento($id) {
        //no se como hacer para que solo borre los suyos
        try {
            const response = await fetch("/api/eventos/$(id)", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
               
            });

            if (!response.ok) {
                throw new Error("Error al eliminar evento");
            }

            return await response.json();
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return null; 
        }
    }

        
   }