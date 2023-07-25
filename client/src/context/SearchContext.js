import { createContext, useReducer } from "react"

const InitialState={
    city:undefined,
    dates:[],
    options:{
        adult:undefined,
        childred:undefined,
         room:undefined
    }
}


export const SearchContext = createContext(InitialState)


const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return InitialState
        default:
            return state
        
    }
}

export const SearchProvider= ({children})=>{
    const [state,dispatch]= useReducer(SearchReducer,InitialState);

    return (
             <SearchContext.Provider value={{city:state.city, dates:state.dates, options:state.options, dispatch}}>
                {children}
             </SearchContext.Provider>
            
    )
}