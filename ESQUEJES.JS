class ServicioComunidad{

    async  obtenerOpiniones() {
       try {
           const response = await fetch('/api/opiniones', {
               method: "GET",
               headers: {
                   "Content-Type": "application/json",
               },
           });

           if (!response.ok) {
               throw new Error("Error al obtener opiniones");
           }

           return await response.json();
       } catch (error) {
           console.error("Error en la solicitud:", error);
           return [];
       }
   }

      
   }