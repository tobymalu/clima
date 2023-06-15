function consultarClima(){
    const ciudad= document.getElementById('ciudad').value;
    const API_KEY='7988e38cdeafad1d912e3c3ab218ad65'; 
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es`;
  


    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Error en la respuesta de la Api');
        }
    })
    .then(data=>{
        const tabla= document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        const icono=data.weather[0].icon
        const fila= tabla.insertRow();
        fila.insertCell().innerHTML=data.name;
        fila.insertCell().innerHTML=`${(data.main.temp- 273.15).toFixed(1)}°C`;
        fila.insertCell().innerHTML= data.weather[0].description;    
        
       //let timer= (data.timezone*1000); //zonahoraria esta en segundos
      // let hora= new Date(data.dt*1000 );// esta en milisegundos se multiplica por mil para pasar a segundos
       //let lugar= ((data.dt-(hora.getTimezoneOffset()*60000))+timer);//multiplicar por 60 para obtener el resultado en segundos y de ahi por mil para optener milisegundos y ahora se puede restar de data.dt
       //let hore= hora.toLocaleString( {        
        //timeStyle:'short'             
      // console.log(timer);//hacer que timer siempre sea un numero positivo para poderlo restar
       //console.log(data.timezone);
       //console.log(data.dt);
       const elTimezone = data.timezone;
       const dateTime = new Date(data.dt * 1000);
        const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
        const currentLocalTime = toUtc + 1000 * elTimezone;
       const selectedDate = new Date(currentLocalTime).toLocaleString('es-MX',{dateStyle:"short", timeStyle:'short'});
          console.log(selectedDate);

       fila.insertCell().innerHTML= selectedDate ;
       fila.insertCell().innerHTML=`<img src=https://openweathermap.org/img/wn/${icono}.png  alt="">`;  

       
 


    })


    .catch(error=>{
        console.error('Error al consultar el clima', error);
    });
}
function consultarClimas(){
    const ciudades= document.getElementById('ciudades').value.split(',').map(ciudad=>ciudad.trim());
    const API_KEY='7988e38cdeafad1d912e3c3ab218ad65'; 
    Promise.all(ciudades.map(ciudad=>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es`;
        return fetch(url).then(response=>{
            if(response.ok){
                return response.json();
            } else{
                throw new Error('Error en la respuesta API');
            }
        });
    }))
    .then(data=>{
        const tabla= document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad=>{
            const iconos=ciudad.weather[0].icon
            const fila=tabla.insertRow();
            fila.insertCell().innerHTML=ciudad.name;
            fila.insertCell().innerHTML=`${(ciudad.main.temp-273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML=ciudad.weather[0].description;

           
            const elTimezoneS = ciudad.timezone;
            const dateTimes = new Date(ciudad.dt * 1000);
             const toUtcs = dateTimes.getTime() + dateTimes.getTimezoneOffset() * 60000;
             const currentLocalTimes = toUtcs + 1000 * elTimezoneS;
            const selectedDates = new Date(currentLocalTimes).toLocaleString('es-MX',{dateStyle:'short', timeStyle:'short'});
               console.log(selectedDates);
     
            fila.insertCell().innerHTML= selectedDates ;
            fila.insertCell().innerHTML=`<img src=https://openweathermap.org/img/wn/${iconos}.png  alt="">`;
        

        });
    })
    .catch(error=>{console.error('Error al consultar clima, error');});
}
function limpiarTabla(){
    const tabla= document.getElementById('tabla-clima').getElementsByTagName('tbody');
    for(let i=0; i<tabla.length;i++){
        tabla[i].innerHTML="";
    }
}