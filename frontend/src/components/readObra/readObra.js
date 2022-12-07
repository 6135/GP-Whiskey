import {GetAPI} from '../../hooks/serviceapi';
import React from 'react';


function ReadObra() {

    //const obra = Request("http://127.0.0.1:8000/api/obra")
    const obra = GetAPI("http://127.0.0.1:8000/api/obra");
    //console.log(obra);

    return (
        <div className="ReadObra">
          <div className='list-container'>
            {Object.entries(obra)
            .map(([key, value]) => (
            <p>{value}</p>
            ))}
          </div>
        </div>
      );
    }

export default ReadObra;