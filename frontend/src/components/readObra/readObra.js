import ServiceAPI from '../../hooks/serviceapi';
import React, { useEffect, useState } from 'react';




function ReadObra() {
    const [item_list, setItem_list] = useState({});

    useEffect( () => {
        async function getData() {
          try{
            const obra = await ServiceAPI.getObra();
            setItem_list(obra);
          } catch(err){
            console.log(err);
          }
        }
        getData();
      }, {});

    return (
        <div className="ReadObra">
          <div className='list-container'>
            {Object.entries(item_list)
            .map(([key, value]) => (
            <p>{value}</p>
            ))}
          </div>
        </div>
      );
    }

export default ReadObra;