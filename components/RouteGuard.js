// A6 Step 6

import { getFavourites, getHistory } from "@/lib/userData";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

const PUBLIC_PATHS = ['/register']   // ['/login', '/', '/_error'];

export default function RouteGuard(props) {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
        }

    useEffect(()=>{
        updateAtoms()
    },[])

    return <>{props.children}</>
  }

