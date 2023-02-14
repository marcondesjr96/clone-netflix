import React, {useEffect, useState} from 'react';
import "./App.css"
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/index';
import FeaturedMovie from './components/FeaturedMovie/index';
import Header from './components/Header/index';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, SetFeaturedData] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // get all list

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //get a Featured
     let originals = list.filter(i=>i.slug === 'originals');
     let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     let chosen = originals[0].items.results[randomChosen];
     let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
     SetFeaturedData(chosenInfo);
     

    }
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      
      if(window.scrollY > 10) {
        setBlackHeader(true);
    }else{
      setBlackHeader(false);
    }
  }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  } ,[]);


  return (
    <div className='page'>
      <Header black={blackHeader}></Header>

      {featuredData &&
      <FeaturedMovie item={featuredData}/>}

      <section className='lists'>
        {movieList.map((item, key) => (
         
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>

        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coracao'>♥</span> por Marcondes Junior<br/>
        Direito de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org

      </footer>
      {movieList.length <= 0 && 
      <div className='loading'>
          <img src='https://blog.motionisland.com/wp-content/uploads/2022/03/Loading_1.gif' alt='Carregando...'></img>
      </div>
      }
    </div>
  );
}