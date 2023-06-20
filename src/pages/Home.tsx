import React, { useEffect, useState } from 'react';
import { API } from '../graphql/pokemons';
import pokemons from '../types/pokemons.type';
import LoadingScreen from '../components/loadingScreen';
import { Link } from 'react-router-dom'
function App() {
  const [offset, setOffset] = useState<number>(20)
  const [data, setData] = useState<pokemons[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [type, setType] = useState<string>('')
  const [typelist, setTypelist] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    API.fetchAll()
      .then(res => {
        setData(res.data.data.getAllPokemon)
        let lists: any[] = []
        res.data.data.getAllPokemon.forEach((x: pokemons) => {
          x.types.forEach(t => {
            lists.push(t.name)
          })
          let z = [...new Set(lists)]
          console.log(z)
          setTypelist(z)
        })
        
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const fetchPoke = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setType(e.target.value)
    setLoading(true)
    if(e.target.value !== '') {
      API.fetchAll()
        .then(res => {
          let datas = res.data.data.getAllPokemon
          let newData: any[] = []
          datas.forEach((poke: pokemons) => {
            poke.types.forEach((x) => {
              if (x.name === e.target.value) {
                console.log(x)
                newData.push(poke)
              }
            })
          })
          console.log(newData)
          setData(newData)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    } else {
      API.fetchAll()
      .then(res => {
        setData(res.data.data.getAllPokemon)        
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
    }
  }

  return (
      <div className="App">
        <div className='col-lg-12 bg-dark text-light p-5 text-center'><h1>Pokédex</h1></div>
        <div className='container my-5'>
          <div className='text-center'><h5>SORT BY TYPE</h5></div>
          <div className='row justify-content-center'>
            <div className='col-lg-3 mb-5'>
              <select className='w-100 custom-select' name="type select" id="selectType" onChange={e => fetchPoke(e)}>
                <option value={''} selected={ type === '' }>All</option>
                {
                  typelist?.map(list => {
                    return <option value={list} selected={ type === list }>{list}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <div className='containter'>
                <div className='row justify-content-center align-items-center' style={{ minHeight: '700px' }}>
                  {
                    loading && <LoadingScreen />
                  }
                  {
                    !loading && data?.map((pokemon, i) => {
                      return (
                        i < offset && <Link to={'/pokemon/' + pokemon.species.split(' ').join('').toLowerCase()} className='col-lg-2 p-2 m-1 rounded text-center cards page-title' style={{ height: '260px', width: '180px' }} key={pokemon.species}>
                        <div className='bg-image' style={{ height: '170px', width: '100%', borderRadius: '15px' }}>
                          <img style={{ height: '100%', width: '100%' }} src={pokemon.sprite} alt={pokemon.species} />
                        </div>
                        <div className='py-1'><h6 className='text-dark fw-bold' style={{ fontSize: '.65rem' }}>{pokemon.species}</h6></div>
                        <div className='container'>
                          <div className='row justify-content-center align-items-end'>
                            {
                              pokemon.types.map(type => {
                                return <div className={`rounded col-lg-5 px-1 m-1 fw-bold text-light text-center bg-${type.name.toLowerCase()}`} style={{ fontSize: '.6rem' }} key={type.name}>{type.name}</div>
                              })
                            }
                          </div>
                        </div>
                      </Link>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          {
            !loading &&
            <div className='container my-3'>
              <div className='row justify-content-center'>
                <div className='col-lg-3 text-center'>
                  <button className='btn btn-dark p-1 text-center' onClick={e => setOffset(offset + 15)} style={{ fontSize: '0.75rem' }}>Load More</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
  );
}

export default App;
