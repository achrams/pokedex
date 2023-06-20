import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { API } from '../graphql/pokemons';
import { Link } from 'react-router-dom'
import pokemon from '../types/pokemon.type';

const Detail = () => {
  const { name } = useParams()
  const [data, setData] = useState<pokemon>()

  useEffect(() => {
    if(name) {
      API.fetchPokemon(name)
      .then(res => setData(res.data.data.getPokemon))
    }
  }, [name])
  return(
    <div>
      <div className='col-lg-12 bg-dark text-light p-5 text-center'><Link to='/' className='page-title'><h1>Pokédex</h1></Link></div>
      {
        data &&
        <div className='my-5'>
          <div className='container py-5 radius-15'>
          <div className='text-center text-capitalize mb-5'><h2>{data.species}</h2></div>
            <div className='row justify-content-center'>
              <div className='col-lg-4 mb-4 mx-1 p-5 bg-image radius-15'>
                <img className='w-100' src={data.sprite} alt={data.species} />
              </div>
              <div className='col-lg-4 px-4 mb-4 mx-1'>
                {
                  data.flavorTexts.map(text => {
                    return <div className='col-lg-12 p-2 text-justify'>{text.flavor}</div>
                  })
                }
                <div className='col-lg-12 bg-info p-4 my-3 radius-15'>
                  <div className='container'>
                    <div className='row justify-content-between'>
                      <div className='col-lg-4'>
                        <h6 className='text-light'>Height</h6>
                        <p className='fw-bold'>{ data.height } Ft</p>
                      </div>
                      <div className='col-lg-4'>
                        <h6 className='text-light'>Abilities</h6>
                        <p className='fw-bold'>{ data.abilities.first.name }</p>                        
                      </div>
                    </div>
                    <div className='row justify-content-between'>
                      <div className='col-lg-4'>
                        <h6 className='text-light'>Weight</h6>
                        <p className='fw-bold'>{ data.weight } Ft</p>
                      </div>
                      <div className='col-lg-4'>
                        <h6 className='text-light'>Total Stats</h6>
                        <p className='fw-bold'>{ data.baseStatsTotal }</p>                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-12 p-2'>
                <h3 className='my-3'>Types</h3>
                <div className='container'>
                  <div className='row justify-content-start'>
                    {
                      data.types.map(type => {
                        return <div className={`rounded col-lg-3 px-1 m-1 fw-bold text-light text-center bg-${type.name.toLowerCase()}`} style={{ fontSize: '1rem' }} key={type.name}>{type.name}</div>
                      })
                    }
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
    </div>
  )
}

export default Detail