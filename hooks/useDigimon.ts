import { useState, useEffect } from "react";

import { GET_DIGIMON_LIST } from "../config/API";
// import { PokemonDetail, PokemonList, PokemonType } from "../types/Pokemon";

export const useDigimonList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [digimon, setDigimon] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const getDigimonList = (search?: string) => {
    setIsLoading(true);

    let url = GET_DIGIMON_LIST;
    const page = nextPage ? nextPage.split("?")[1] : "";

    if (search) {
      if (isSearch && page) {
        url = `${url}&name=${search}&page=${page}`;
      } else {
        url = `${url}&name=${search}`;
      }
    } else {
      setIsSearch(false);
      if(page) {
        url = `${url}&${page}`;
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        if(data.content) {
          setNextPage(data.pageable.nextPage);

          if(search && !isSearch) {
            setIsSearch(true);
            setDigimon(data.content);
          } else {
            setDigimon(nextPage ? [...digimon, ...data.content] : data.content);
          }
        } else {
          setNextPage("");
          setDigimon([]);
        }
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDigimonList();
  }, []);

  return {
    isLoading,
    digimon,
    getDigimonList,
    nextPage,
  };
};
